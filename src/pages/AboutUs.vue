<template>
    <main id="aboutUs" class="w-full">
        <section class="relative overflow-hidden bg-black pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
            <div class="pointer-events-none absolute inset-0">
                <div class="absolute inset-0 bg-cover bg-center" :style="heroBackgroundStyle"></div>
                <div class="absolute inset-0 bg-(--color-darkerbrown)" style="opacity: 0.6;"></div>
                <div class="absolute inset-0"
                    style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-darkbrown) 35%, transparent), color-mix(in srgb, var(--color-darkbrown) 80%, transparent));">
                </div>
            </div>

            <div class="relative mx-auto w-11/12 sm:w-10/12">
                <div class="max-w-4xl text-(--color-lightbeige)">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.74;">{{ heroContent.eyebrow }}</p>
                    <h1 class="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
                        {{ heroContent.title }}
                    </h1>
                    <p class="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style="opacity: 0.86;">
                        {{ heroContent.description }}
                    </p>
                    <div class="mt-8 h-px w-24 bg-(--color-noisette)"></div>
                </div>
            </div>
        </section>

        <section class="w-full py-16 sm:py-20 lg:py-24">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                    <div class="lg:col-span-4">
                        <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ approachContent.eyebrow }}</p>
                        <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                            {{ approachContent.title }}
                        </h2>
                    </div>
                    <div class="space-y-5 text-(--color-brown) lg:col-span-8">
                        <p class="max-w-3xl text-base leading-relaxed sm:text-lg" style="opacity: 0.9;">
                            {{ approachContent.paragraphOne }}
                        </p>
                        <p class="max-w-3xl text-base leading-relaxed font-semibold italic sm:text-lg">
                            "{{ approachContent.paragraphTwo }}"
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="packages" class="w-full bg-black py-16 text-(--color-lightbeige) sm:py-20 lg:py-24">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.74;">{{ packagesSectionContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {{ packagesSectionContent.heading }}
                    </h2>
                    <p class="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style="opacity: 0.85;">
                        {{ packagesSectionContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-10 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article v-for="pkg in packagesContent" :key="pkg.name" class="border p-7 sm:p-8"
                        style="border-color: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);">
                        <p class="text-xs tracking-[0.16em] uppercase text-(--color-noisette)">{{ pkg.tag }}</p>
                        <h3 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">{{ pkg.name }}</h3>
                        <p class="mt-2 text-sm tracking-[0.08em] uppercase" style="opacity: 0.76;">{{ pkg.duration }}</p>
                        <p class="mt-5 text-base leading-relaxed" style="opacity: 0.86;">{{ pkg.description }}</p>
                        <p v-if="pkg.price" class="mt-6 text-xl font-medium text-(--color-noisette)">{{ pkg.price }}</p>
                        <router-link to="/bookexperience"
                            class="mt-7 inline-block border border-(--color-noisette) px-5 py-2 text-sm tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-(--color-noisette) hover:text-(--color-darkbrown)">
                            {{ packagesSectionContent.ctaLabel }}
                        </router-link>
                    </article>
                </div>
            </div>
        </section>

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import heroFallbackImage from '../assets/herocover.jpeg';
import SocialSection from '../components/SocialSection.vue';
import localAboutContent from '../../content/about.json';
import localSocialContent from '../../content/social.json';
import { fetchAboutUsContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const heroFallback = {
    eyebrow: 'About Us',
    title: 'A small team, real hands, stories you can wear.',
    description: 'This is not a showroom. It is a guided craft session where your ring becomes part of your travel memory.',
    backgroundImage: heroFallbackImage
};

const approachFallback = {
    eyebrow: 'Our approach',
    title: 'Less performance, more substance',
    paragraphOne: 'The Ring Experience was built for people who want to remember a moment, not just purchase an object.',
    paragraphTwo: 'Our role is simple: to turn shared time into a meaningful piece made by your own hands.'
};

const packagesSectionFallback = {
    eyebrow: 'Packages',
    heading: 'Choose the pace of your experience',
    description: 'Same artisanal core, different formats based on time and level of personalization.',
    ctaLabel: 'Book this package'
};

const packagesFallback = [
    {
        tag: 'Starter',
        name: 'Essential',
        duration: '90 minutes',
        description: 'Guided session with material introduction, core techniques, and final ring finishing.',
        price: ''
    },
    {
        tag: 'For couples',
        name: 'Couple Ritual',
        duration: '2 hours',
        description: 'A complete couple format with shared design choices, engraving options, and dedicated assistance.',
        price: ''
    },
    {
        tag: 'Tailored',
        name: 'Signature',
        duration: '2.5 hours',
        description: 'Extended one-to-one direction with premium materials and deeper customization.',
        price: ''
    }
];

const cmsAboutContent = ref(localAboutContent);
const cmsSocialContent = ref(localSocialContent);

const heroContent = computed(() => ({
    ...heroFallback,
    ...(cmsAboutContent.value?.hero ?? {})
}));

const approachContent = computed(() => ({
    ...approachFallback,
    ...(cmsAboutContent.value?.approach ?? {})
}));

const packagesSectionContent = computed(() => ({
    ...packagesSectionFallback,
    ...(cmsAboutContent.value?.packagesSection ?? {})
}));

const packagesContent = computed(() => (
    Array.isArray(cmsAboutContent.value?.packages) && cmsAboutContent.value.packages.length
        ? cmsAboutContent.value.packages
        : packagesFallback
));

const heroBackgroundStyle = computed(() => ({
    backgroundImage: `url(${heroContent.value.backgroundImage})`
}));

onMounted(async () => {
    const sanityAbout = await fetchAboutUsContentFromSanity();
    const sanitySocial = await fetchSocialContentFromSanity();

    if (sanityAbout) {
        cmsAboutContent.value = sanityAbout;
    }

    if (sanitySocial) {
        cmsSocialContent.value = sanitySocial;
    }
});
</script>
