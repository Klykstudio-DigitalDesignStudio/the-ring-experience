import { createClient } from '@sanity/client';

export const sanity = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: true
});

const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  hero{
    headline,
    subheadline,
    buttonLabel,
    buttonLink,
    "image": image.asset->url
  },
  aMoment{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  theExperience{
    eyebrow,
    title
  },
  experienceCards[]{
    key,
    title,
    lineOne,
    lineTwo,
    "image": image.asset->url
  },
  values{
    heading,
    "backgroundImage": backgroundImage.asset->url,
    items[]{
      title,
      text
    }
  },
  reviews{
    eyebrow,
    heading,
    description,
    sourceLabel,
    sourceUrl,
    items[]{
      author,
      rating,
      text,
      dateLabel
    }
  }
}
`;

const SOCIAL_QUERY = `
*[_type == "social"][0]{
  eyebrow,
  heading,
  description,
  "backgroundImage": backgroundImage.asset->url,
  links[]{
    label,
    href
  }
}
`;

const ABOUT_US_QUERY = `
*[_type == "aboutUs"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  approach{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo
  },
  packagesSection{
    eyebrow,
    heading,
    description,
    ctaLabel
  },
  packages[]{
    tag,
    name,
    duration,
    description,
    price
  }
}
`;

const FOOTER_QUERY = `
*[_type == "footer"][0]{
  subtitle,
  title,
  text,
  phone,
  phoneLabel,
  email
}
`;

const NAVBAR_QUERY = `
*[_type == "navbar"][0]{
  "logoSvgUrl": logoSvg.asset->url
}
`;

export async function fetchHomepageContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(HOMEPAGE_QUERY);
    } catch {
        return null;
    }
}

export async function fetchFooterContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(FOOTER_QUERY);
    } catch {
        return null;
    }
}

export async function fetchSocialContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(SOCIAL_QUERY);
    } catch {
        return null;
    }
}

export async function fetchAboutUsContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(ABOUT_US_QUERY);
    } catch {
        return null;
    }
}

export async function fetchNavbarContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(NAVBAR_QUERY);
    } catch {
        return null;
    }
}
