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
  followUs{
    eyebrow,
    heading,
    description,
    "backgroundImage": backgroundImage.asset->url,
    links[]{
      label,
      href
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

export async function fetchHomepageContentFromSanity() {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(HOMEPAGE_QUERY);
    } catch {
        return null;
    }
}
