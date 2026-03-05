const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const textResponse = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  });

const toBase64Url = (input) =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const utf8ToBase64Url = (obj) => toBase64Url(JSON.stringify(obj));

const pemToArrayBuffer = (pem) => {
  const clean = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

async function createGoogleAccessToken(clientEmail, privateKeyRaw) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsignedToken = `${utf8ToBase64Url(header)}.${utf8ToBase64Url(payload)}`;
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );
  const signatureBinary = String.fromCharCode(...new Uint8Array(signatureBuffer));
  const signedJwt = `${unsignedToken}.${toBase64Url(signatureBinary)}`;

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const detail = await tokenResponse.text();
    throw new Error(`google_token_failed:${detail}`);
  }

  const tokenPayload = await tokenResponse.json();
  return tokenPayload.access_token;
}

async function appendLeadToSheet(env, leadData) {
  const clientEmail = env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:I';

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('missing_google_sheets_env');
  }

  const accessToken = await createGoogleAccessToken(clientEmail, privateKey);
  const emailValue = leadData.newsletterConsent ? leadData.email || '' : '';
  const phoneValue = leadData.newsletterConsent ? leadData.phone || '' : '';

  const row = [
    leadData.submittedAt || new Date().toISOString(),
    leadData.source || '',
    leadData.packageName || '',
    leadData.name || '',
    emailValue,
    phoneValue,
    leadData.preferredDate || '',
    leadData.message || '',
    String(Boolean(leadData.newsletterConsent)),
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId
  )}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!appendResponse.ok) {
    const detail = await appendResponse.text();
    throw new Error(`google_sheets_append_failed:${detail}`);
  }
}

export async function onRequestPost(context) {
  try {
    const leadData = await context.request.json();

    if (!leadData?.name || !leadData?.email) {
      return textResponse({ ok: false, error: 'missing_required_fields' }, 400);
    }

    await appendLeadToSheet(context.env, leadData);
    return textResponse({ ok: true });
  } catch (error) {
    return textResponse(
      { ok: false, error: error instanceof Error ? error.message : 'unknown_error' },
      500
    );
  }
}
