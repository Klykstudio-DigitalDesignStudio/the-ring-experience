<template>
    <main id="gallery" ref="galleryRoot" class="w-full">
        <SecondaryHero :content="heroContent" />

        <section class="w-full py-20 sm:py-24 lg:py-32">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ introContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ introContent.heading }}
                    </h2>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ introContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div v-for="(columnItems, columnIndex) in galleryColumns" :key="`gallery-col-${columnIndex}`"
                        :ref="setColumnRef" class="gallery-column flex flex-col gap-6">
                        <article v-for="photo in columnItems" :key="`${photo.caption}-${photo.dateLabel}`"
                            class="gallery-card overflow-hidden border bg-white"
                            style="border-color: color-mix(in srgb, var(--color-darkbrown) 14%, transparent);">
                            <img :src="toWebImage(photo.image, { width: 1100, quality: 78 })" :alt="photo.caption"
                                class="gallery-image aspect-[4/5] w-full object-cover">
                            <div class="p-5">
                                <p class="text-sm tracking-[0.1em] text-(--color-mutedbrown) uppercase">{{ photo.dateLabel }}</p>
                                <h3 class="mt-2 font-display text-2xl leading-tight text-(--color-brown)">{{ photo.caption }}</h3>
                                <p class="mt-3 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.86;">
                                    {{ photo.story }}
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <PageCtaSection :content="galleryCtaContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroFallbackImage from '../assets/herocover.jpeg';
import PageCtaSection from '../components/PageCtaSection.vue';
import SecondaryHero from '../components/SecondaryHero.vue';
import SocialSection from '../components/SocialSection.vue';
import localCtaContent from '../../content/cta.json';
import localGalleryContent from '../../content/gallery.json';
import localSocialContent from '../../content/social.json';
import {
    fetchClientGalleryContentFromSanity,
    fetchPageCtaContentFromSanity,
    fetchSocialContentFromSanity,
    toWebImage
} from '../utils/sanity';

gsap.registerPlugin(ScrollTrigger);

const heroFallback = {
    eyebrow: 'Client Gallery',
    title: 'Moments created at the table',
    description: 'Real photos from our guests during and after the ring-making experience.',
    backgroundImage: heroFallbackImage
};

const introFallback = {
    eyebrow: 'From our guests',
    heading: 'Stories made by hand',
    description: 'A growing archive of rings, smiles, and shared memories.'
};

const photosFallback = [
    {
        image: heroFallbackImage,
        isVisible: true,
        caption: 'Silver shaping session',
        story: 'First-time makers learning heat, pressure, and form together.',
        dateLabel: 'February 2026'
    },
    {
        image: heroFallbackImage,
        isVisible: true,
        caption: 'Couple ritual',
        story: 'A pair of matching rings engraved with a private symbol.',
        dateLabel: 'February 2026'
    },
    {
        image: heroFallbackImage,
        isVisible: true,
        caption: 'Final polish',
        story: 'Last details before wearing the ring for the first time.',
        dateLabel: 'January 2026'
    },
    {
        image: heroFallbackImage,
        isVisible: true,
        caption: 'Bench details',
        story: 'Tools, textures, and tiny details before final finishing.',
        dateLabel: 'January 2026'
    },
    {
        image: heroFallbackImage,
        isVisible: true,
        caption: 'First ring reveal',
        story: 'The first look of a freshly polished handcrafted ring.',
        dateLabel: 'December 2025'
    }
];

const cmsGalleryContent = ref(localGalleryContent);
const cmsCtaContent = ref(localCtaContent);
const cmsSocialContent = ref(localSocialContent);

const heroContent = computed(() => ({
    ...heroFallback,
    ...(cmsGalleryContent.value?.hero ?? {})
}));

const introContent = computed(() => ({
    ...introFallback,
    ...(cmsGalleryContent.value?.intro ?? {})
}));

const photos = computed(() => (
    (Array.isArray(cmsGalleryContent.value?.photos) && cmsGalleryContent.value.photos.length
        ? cmsGalleryContent.value.photos
        : photosFallback).filter((photo) => photo?.isVisible !== false)
));

const galleryColumns = computed(() => {
    const columns = [[], [], []];

    photos.value.forEach((photo, index) => {
        columns[index % 3].push(photo);
    });

    return columns;
});

const galleryCtaContent = computed(() => ({
    ...(cmsCtaContent.value?.gallery ?? {})
}));

const galleryRoot = ref(null);
const columnRefs = ref([]);
let galleryAnimContext = null;
let mediaMatcher = null;

const setColumnRef = (el) => {
    if (!el) return;
    if (!columnRefs.value.includes(el)) {
        columnRefs.value.push(el);
    }
};

const setupGalleryAnimations = () => {
    if (!galleryRoot.value) return;
    columnRefs.value = columnRefs.value.filter(Boolean);

    galleryAnimContext = gsap.context(() => {
        mediaMatcher = gsap.matchMedia();

        mediaMatcher.add('(prefers-reduced-motion: reduce)', () => {
            gsap.set('.gallery-column', { clearProps: 'all' });
        });

        mediaMatcher.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
            const speedOffsets = [48, 86, 62];

            columnRefs.value.forEach((column, index) => {
                const offset = speedOffsets[index] ?? 54;
                gsap.fromTo(column, {
                    y: -offset
                }, {
                    y: offset,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: galleryRoot.value,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        });
    }, galleryRoot.value);
};

onMounted(async () => {
    const sanityGallery = await fetchClientGalleryContentFromSanity();
    const sanityCta = await fetchPageCtaContentFromSanity();
    const sanitySocial = await fetchSocialContentFromSanity();

    if (sanityGallery) {
        cmsGalleryContent.value = sanityGallery;
    }
    if (sanityCta) {
        cmsCtaContent.value = sanityCta;
    }
    if (sanitySocial) {
        cmsSocialContent.value = sanitySocial;
    }

    await nextTick();
    setupGalleryAnimations();
});

onBeforeUnmount(() => {
    mediaMatcher?.revert();
    galleryAnimContext?.revert();
});
</script>

<style scoped>
.gallery-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.gallery-image {
    transition: transform 0.45s ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    .gallery-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 40px color-mix(in srgb, var(--color-darkbrown) 15%, transparent);
        border-color: color-mix(in srgb, var(--color-noisette) 40%, transparent) !important;
    }

    .gallery-card:hover .gallery-image {
        transform: scale(1.025);
    }
}
</style>
