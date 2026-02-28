<template>
    <main id="gemstones" class="w-full">
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

                <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <article v-for="stone in gemstones" :key="stone.key || stone.name"
                        class="gem-card w-full overflow-hidden border bg-(--color-lightbeige)"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                        <img :src="toWebImage(stone.image, { width: 900, quality: 78 })" :alt="stone.name"
                            class="gem-card-image h-64 w-full object-cover object-center">
                        <div class="p-6 sm:p-7">
                            <p class="text-xs tracking-[0.14em] text-(--color-mutedbrown) uppercase">{{ stone.origin }}</p>
                            <h3 class="mt-2 font-display text-3xl leading-tight text-(--color-brown)">{{ stone.name }}</h3>
                            <p class="mt-2 text-sm tracking-[0.08em] text-(--color-noisette) uppercase">{{ stone.cut }}</p>
                            <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.86;">
                                {{ stone.description }}
                            </p>
                            <p class="mt-4 text-sm text-(--color-mutedbrown)">
                                Tone: <span class="text-(--color-brown)">{{ stone.tone }}</span>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <PageCtaSection :content="gemstonesCtaContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import heroFallbackImage from '../assets/herocover.jpeg';
import PageCtaSection from '../components/PageCtaSection.vue';
import SecondaryHero from '../components/SecondaryHero.vue';
import SocialSection from '../components/SocialSection.vue';
import localCtaContent from '../../content/cta.json';
import localGemstonesContent from '../../content/gemstones.json';
import localSocialContent from '../../content/social.json';
import {
    fetchGemstonesPageContentFromSanity,
    fetchPageCtaContentFromSanity,
    fetchSocialContentFromSanity,
    toWebImage
} from '../utils/sanity';

const heroFallback = {
    eyebrow: 'Gemstones',
    title: 'The latest stones selected for this season',
    description: 'A curated list of natural gemstones currently available for your ring experience in Sri Lanka.',
    backgroundImage: heroFallbackImage
};

const introFallback = {
    eyebrow: 'New arrivals',
    heading: 'Fresh picks, ready for new stories',
    description: 'Each gemstone is selected for color, texture, and character. Inventory rotates often.'
};

const gemstonesFallback = [
    {
        key: 'moonstone',
        name: 'Rainbow Moonstone',
        isVisible: true,
        origin: 'Sri Lanka',
        tone: 'Milky white with blue flash',
        cut: 'Oval cabochon',
        description: 'Soft iridescence and a calm glow, ideal for minimal or vintage-inspired rings.',
        image: heroFallbackImage
    },
    {
        key: 'sapphire',
        name: 'Ceylon Sapphire',
        isVisible: true,
        origin: 'Sri Lanka',
        tone: 'Royal blue',
        cut: 'Round faceted',
        description: 'Classic and brilliant, with crisp reflections and a timeless premium look.',
        image: heroFallbackImage
    },
    {
        key: 'garnet',
        name: 'Rhodolite Garnet',
        isVisible: true,
        origin: 'Madagascar',
        tone: 'Berry red',
        cut: 'Pear faceted',
        description: 'Warm, deep color that works beautifully on polished sterling silver settings.',
        image: heroFallbackImage
    }
];

const cmsGemstonesContent = ref(localGemstonesContent);
const cmsCtaContent = ref(localCtaContent);
const cmsSocialContent = ref(localSocialContent);

const heroContent = computed(() => ({
    ...heroFallback,
    ...(cmsGemstonesContent.value?.hero ?? {})
}));

const introContent = computed(() => ({
    ...introFallback,
    ...(cmsGemstonesContent.value?.intro ?? {})
}));

const gemstones = computed(() => (
    (Array.isArray(cmsGemstonesContent.value?.gemstones) && cmsGemstonesContent.value.gemstones.length
        ? cmsGemstonesContent.value.gemstones
        : gemstonesFallback).filter((stone) => stone?.isVisible !== false)
));

const gemstonesCtaContent = computed(() => ({
    ...(cmsCtaContent.value?.gemstones ?? {})
}));

onMounted(async () => {
    const sanityGemstones = await fetchGemstonesPageContentFromSanity();
    const sanityCta = await fetchPageCtaContentFromSanity();
    const sanitySocial = await fetchSocialContentFromSanity();

    if (sanityGemstones) {
        cmsGemstonesContent.value = sanityGemstones;
    }
    if (sanityCta) {
        cmsCtaContent.value = sanityCta;
    }

    if (sanitySocial) {
        cmsSocialContent.value = sanitySocial;
    }
});
</script>

<style scoped>
.gem-card {
    position: relative;
    transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
}

.gem-card-image {
    transition: transform 0.48s ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    .gem-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 45px color-mix(in srgb, var(--color-darkbrown) 18%, transparent);
        border-color: color-mix(in srgb, var(--color-noisette) 45%, transparent) !important;
    }

    .gem-card:hover .gem-card-image {
        transform: scale(1.035);
    }
}
</style>
