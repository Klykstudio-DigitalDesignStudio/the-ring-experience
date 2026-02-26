<template>
    <main ref="homepageRoot">
        <section id="hero"
            class="relative flex min-h-svh w-full items-end overflow-hidden bg-black pb-40 pt-28 sm:pt-32 lg:h-screen lg:min-h-0">
            <img :src="heroContent.image" alt="Hero Cover Image"
                class="absolute inset-0 h-full w-full object-cover object-center opacity-72">
            <div class="hero-orb hero-orb-left"></div>
            <div class="hero-orb hero-orb-right"></div>
            <div class="absolute inset-0"
                style="background: linear-gradient(to top, color-mix(in srgb, var(--color-darkbrown) 84%, transparent), color-mix(in srgb, var(--color-darkbrown) 45%, transparent), transparent);">
            </div>
            <div class="relative z-10 mx-auto w-11/12 sm:w-10/12">
                <div class="hero-copy flex max-w-5xl flex-col items-center text-center text-white lg:items-start lg:text-left">
                    <h1
                        class="max-w-5xl font-display text-5xl leading-[0.98] font-medium text-(--color-lightbeige) sm:text-6xl md:text-7xl lg:text-8xl">
                        {{ heroContent.headline }}
                    </h1>
                    <p class="mt-4 max-w-xl text-base font-light text-gray-200 sm:text-lg lg:text-2xl">
                        {{ heroContent.subheadline }}
                    </p>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette) sm:w-24"></div>
                    <router-link :to="heroContent.buttonLink" class="mt-7">
                        <Button>{{ heroContent.buttonLabel }}</Button>
                    </router-link>
                </div>
            </div>
        </section>
        <section id="aMoment" data-reveal class="authentic-vintage w-full py-20 sm:py-24 md:py-28 lg:py-36">
            <div
                class="mx-auto grid w-11/12 grid-cols-1 items-center gap-8 sm:w-10/12 sm:gap-10 lg:grid-cols-12 lg:gap-14">
                <figure class="flex items-center justify-center lg:col-span-7">
                    <img :src="aMomentContent.image" alt="A Moment Image"
                        class="h-auto max-h-92 w-full rounded-xs object-cover sm:max-h-112 lg:max-h-160">
                </figure>
                <div class="flex flex-col justify-center lg:col-span-5 lg:pl-2">
                    <p class="mb-4 text-xs tracking-[0.18em] text-(--color-mutedbrown) uppercase sm:text-sm sm:tracking-[0.2em]">
                        {{ aMomentContent.eyebrow }}
                    </p>
                    <h2 class="font-display text-3xl leading-[1.08] font-medium text-(--color-brown) sm:text-4xl md:text-5xl lg:text-6xl">
                        {{ aMomentContent.title }}
                    </h2>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette) sm:mt-8 sm:w-24"></div>
                    <div class="mt-6 space-y-3 sm:mt-7">
                        <p class="text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                            {{ aMomentContent.paragraphOne }}
                        </p>
                        <p class="text-base leading-relaxed text-(--color-brown) font-semibold italic sm:text-lg">
                            {{ aMomentContent.paragraphTwo }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id="theExperience" data-reveal class="w-full pb-20 sm:pb-24 lg:pb-36">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ theExperienceContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ theExperienceContent.title }}
                    </h2>
                </div>
                <div ref="experienceGrid" class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
                    <Card v-for="card in experienceCards" :key="card.key"
                        class="experience-card mx-auto w-full max-w-md md:max-w-none"
                        :title="card.title" :line-one="card.lineOne" :line-two="card.lineTwo" :image="card.image" />
                </div>
            </div>
        </section>
        <section id="values" data-reveal class="relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
            <div class="pointer-events-none absolute inset-0">
                <div class="parallax-bg absolute inset-0 bg-cover bg-center" :style="valuesBgStyle"></div>
                <div class="absolute inset-0 bg-(--color-darkerbrown) opacity-55"></div>
                <div class="absolute inset-0"
                    style="background: linear-gradient(to right, color-mix(in srgb, var(--color-darkbrown) 82%, transparent), color-mix(in srgb, var(--color-darkbrown) 42%, transparent), color-mix(in srgb, var(--color-darkbrown) 68%, transparent));">
                </div>
            </div>
            <div
                class="relative mx-auto grid w-11/12 grid-cols-1 border text-(--color-lightbeige) md:w-10/12 md:grid-cols-3 md:grid-rows-2"
                style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);">
                <div class="border-b p-7 sm:p-8 md:row-span-2 md:border-r md:border-b-0 md:p-10 lg:p-12"
                    style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);">
                    <h2 class="font-display text-4xl leading-tight md:text-5xl">{{ valuesContent.heading }}</h2>
                </div>
                <article v-for="(item, index) in valuesItems" :key="item.title"
                    class="border-b p-7 sm:p-8 md:border-b-0 md:p-10 lg:p-12"
                    style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);" :class="{
                        'md:border-r': index === 0 || index === 2,
                        'md:border-b': index === 0 || index === 1,
                        'border-b-0': index === valuesItems.length - 1
                    }">
                    <p class="text-xs tracking-[0.2em] text-(--color-lightbeige) uppercase" style="opacity: 0.75;">
                        {{ item.title }}
                    </p>
                    <p class="mt-4 max-w-sm text-base leading-relaxed text-(--color-lightbeige)" style="opacity: 0.88;">
                        {{ item.text }}
                    </p>
                </article>
            </div>
        </section>
        <section id="reviews" data-reveal class="w-full py-20 sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ reviewsContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ reviewsContent.heading }}
                    </h2>
                    <p v-if="reviewsContent.description" class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg"
                        style="opacity: 0.85;">
                        {{ reviewsContent.description }}
                    </p>
                    <a v-if="reviewsContent.sourceUrl" :href="reviewsContent.sourceUrl" target="_blank" rel="noopener noreferrer"
                        class="mt-4 inline-block text-sm tracking-[0.12em] text-(--color-noisette) uppercase">
                        {{ reviewsContent.sourceLabel }}
                    </a>
                </div>
                <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>
                <div v-if="reviewsItems.length" class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article v-for="review in reviewsItems" :key="`${review.author}-${review.text}`" class="border p-6 sm:p-7"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                        <div class="flex items-center justify-between gap-2">
                            <p class="font-medium text-(--color-brown)">{{ review.author }}</p>
                            <span v-if="review.dateLabel" class="text-xs tracking-[0.08em] text-(--color-mutedbrown) uppercase">
                                {{ review.dateLabel }}
                            </span>
                        </div>
                        <p class="mt-3 text-(--color-noisette)">
                            <span v-for="star in 5" :key="star" class="text-sm" :style="{ opacity: star <= review.rating ? 1 : 0.35 }">
                                &#9733;
                            </span>
                        </p>
                        <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.9;">
                            {{ review.text }}
                        </p>
                    </article>
                </div>
                <p v-else class="mt-10 text-center text-(--color-brown)" style="opacity: 0.75;">
                    Reviews will appear here as soon as they are published.
                </p>
            </div>
        </section>
        <section id="followus" data-reveal class="relative w-full overflow-hidden py-20 sm:py-24 lg:py-28">
            <div class="pointer-events-none absolute inset-0">
                <div class="parallax-bg absolute inset-0 bg-cover bg-center" :style="followUsBgStyle"></div>
                <div class="absolute inset-0 bg-(--color-darkbrown)" style="opacity: 0.64;"></div>
                <div class="absolute inset-0"
                    style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-darkbrown) 42%, transparent), color-mix(in srgb, var(--color-darkbrown) 78%, transparent));">
                </div>
            </div>
            <div class="relative mx-auto w-11/12 max-w-4xl text-center text-(--color-lightbeige) sm:w-10/12">
                <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.78;">{{ followUsContent.eyebrow }}</p>
                <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                    {{ followUsContent.heading }}
                </h2>
                <p class="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style="opacity: 0.88;">
                    {{ followUsContent.description }}
                </p>
                <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>
                <div class="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    <a v-for="social in followUsContent.links" :key="social.label" :href="social.href" target="_blank"
                        rel="noopener noreferrer" class="group text-base tracking-[0.08em] uppercase sm:text-lg">
                        <span class="transition-all duration-300 ease-out group-hover:italic">{{ social.label }}</span>
                        <span class="mt-1 block h-px w-0 bg-(--color-noisette) transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';
import heroFallbackImage from '../assets/herocover.jpeg';
import localHomepageContent from '../../content/homepage.json';
import { fetchHomepageContentFromSanity } from '../utils/sanity';

gsap.registerPlugin(ScrollTrigger);

const heroFallback = {
    headline: 'Every ring begins with a choice',
    subheadline: 'A meaningful travel memory beyond the usual',
    image: heroFallbackImage,
    buttonLabel: 'Book your experience',
    buttonLink: '/bookexperience'
};

const aMomentFallback = {
    eyebrow: 'A shared ritual',
    title: 'Not a store. A memory you create together.',
    paragraphOne: 'Two seats, one table, raw silver, open flame.',
    paragraphTwo: 'You do not buy a ring. You craft it, side by side, together.',
    image: heroFallbackImage
};

const fallbackCards = [
    {
        key: 'design',
        title: 'Design',
        lineOne: 'You sketch it',
        lineTwo: 'You shape the story',
        image: '/the-ring-experience-logo.svg'
    },
    {
        key: 'craft',
        title: 'Craft',
        lineOne: 'You forge it',
        lineTwo: 'You feel every spark',
        image: '/the-ring-experience-logo.svg'
    },
    {
        key: 'seal',
        title: 'Seal',
        lineOne: 'You wear it',
        lineTwo: 'You keep the memory',
        image: '/the-ring-experience-logo.svg'
    }
];

const theExperienceFallback = {
    eyebrow: 'The Experience',
    title: 'Crafted by your hands, not picked from a shelf'
};

const cmsHomepageContent = ref(localHomepageContent);

const valuesFallback = {
    heading: 'Our Values',
    backgroundImage: heroFallbackImage,
    items: [
        {
            title: 'Authenticity',
            text: 'Every ring should carry meaning. We design each moment so memory and craft stay connected.'
        },
        {
            title: 'Craftsmanship',
            text: 'Authenticity first. Sterling silver, natural stones, and real artisanal techniques shape the experience.'
        },
        {
            title: 'Connection',
            text: 'Human connection matters. The table is small by design: attention, guidance, and shared focus.'
        },
        {
            title: 'Meaning',
            text: 'No mass tourism routine. You leave with something personal, made by hand and owned by your story.'
        }
    ]
};

const followUsFallback = {
    eyebrow: 'Follow Us',
    heading: 'Follow our journey',
    description: 'Behind the scenes, new stories, and handcrafted moments from Sri Lanka.',
    backgroundImage: heroFallbackImage,
    links: [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'TikTok', href: 'https://tiktok.com' },
        { label: 'Pinterest', href: 'https://pinterest.com' }
    ]
};

const reviewsFallback = {
    eyebrow: 'Guest Reviews',
    heading: 'What people say about the experience',
    description: '',
    sourceLabel: 'Google Business',
    sourceUrl: '',
    items: []
};

const experienceCards = computed(() => (
    Array.isArray(cmsHomepageContent.value?.experienceCards) && cmsHomepageContent.value.experienceCards.length
        ? cmsHomepageContent.value.experienceCards
        : fallbackCards
));

const heroContent = computed(() => ({
    ...heroFallback,
    ...(cmsHomepageContent.value?.hero ?? {})
}));

const aMomentContent = computed(() => ({
    ...aMomentFallback,
    ...(cmsHomepageContent.value?.aMoment ?? {})
}));

const theExperienceContent = computed(() => ({
    ...theExperienceFallback,
    ...(cmsHomepageContent.value?.theExperience ?? {})
}));

const valuesContent = computed(() => ({
    ...valuesFallback,
    ...(cmsHomepageContent.value?.values ?? {}),
    items: Array.isArray(cmsHomepageContent.value?.values?.items) && cmsHomepageContent.value.values.items.length
        ? cmsHomepageContent.value.values.items
        : valuesFallback.items
}));

const followUsContent = computed(() => ({
    ...followUsFallback,
    ...(cmsHomepageContent.value?.followUs ?? {}),
    links: Array.isArray(cmsHomepageContent.value?.followUs?.links) && cmsHomepageContent.value.followUs.links.length
        ? cmsHomepageContent.value.followUs.links
        : followUsFallback.links
}));

const reviewsContent = computed(() => ({
    ...reviewsFallback,
    ...(cmsHomepageContent.value?.reviews ?? {}),
    items: Array.isArray(cmsHomepageContent.value?.reviews?.items)
        ? cmsHomepageContent.value.reviews.items
        : reviewsFallback.items
}));

const valuesItems = computed(() => valuesContent.value.items);
const reviewsItems = computed(() => reviewsContent.value.items);

const valuesBgStyle = computed(() => ({
    backgroundImage: `url(${valuesContent.value.backgroundImage})`
}));

const followUsBgStyle = computed(() => ({
    backgroundImage: `url(${followUsContent.value.backgroundImage})`
}));

const homepageRoot = ref(null);
const experienceGrid = ref(null);
let animationContext = null;
let mediaMatcher = null;

const getExperienceCards = () => {
    if (!experienceGrid.value) return [];
    return Array.from(experienceGrid.value.querySelectorAll('.experience-card'));
};

const setupHomepageAnimations = () => {
    if (!homepageRoot.value) return;

    animationContext = gsap.context(() => {
        mediaMatcher = gsap.matchMedia();

        mediaMatcher.add('(prefers-reduced-motion: reduce)', () => {
            gsap.set('[data-reveal], .experience-card, .hero-copy > *', { clearProps: 'all' });
        });

        mediaMatcher.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.hero-copy > *', {
                autoAlpha: 0,
                y: 24,
                duration: 0.85,
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top 78%',
                    end: 'bottom top',
                    toggleActions: 'play reverse play reverse'
                }
            });

            const sections = gsap.utils.toArray('[data-reveal]');
            sections.forEach((section, index) => {
                gsap.from(section, {
                    autoAlpha: 0,
                    y: 44,
                    duration: 0.85,
                    ease: 'power2.out',
                    delay: Math.min(index * 0.04, 0.14),
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 84%',
                        toggleActions: 'play reverse play reverse'
                    }
                });
            });

            const cards = getExperienceCards();
            if (cards.length) {
                gsap.from(cards, {
                    autoAlpha: 0,
                    y: 26,
                    duration: 0.65,
                    ease: 'power2.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: experienceGrid.value,
                        start: 'top 78%',
                        toggleActions: 'play reverse play reverse'
                    }
                });
            }

            const parallaxLayers = gsap.utils.toArray('.parallax-bg');
            parallaxLayers.forEach((layer) => {
                const section = layer.closest('section');
                if (!section) return;

                gsap.fromTo(layer, {
                    yPercent: -10,
                    scale: 1.08
                }, {
                    yPercent: 10,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        });
    }, homepageRoot.value);
};

onMounted(async () => {
    const sanityHomepage = await fetchHomepageContentFromSanity();
    if (sanityHomepage) {
        cmsHomepageContent.value = sanityHomepage;
    }

    await nextTick();
    setupHomepageAnimations();
});

onBeforeUnmount(() => {
    mediaMatcher?.revert();
    animationContext?.revert();
});
</script>

<style scoped>
.hero-orb {
    pointer-events: none;
    position: absolute;
    border-radius: 9999px;
    filter: blur(40px);
    opacity: 0.45;
}

.hero-orb-left {
    left: -8rem;
    bottom: 3rem;
    height: 14rem;
    width: 14rem;
    background: color-mix(in srgb, var(--color-noisette) 45%, transparent);
}

.hero-orb-right {
    right: -6rem;
    top: 4rem;
    height: 12rem;
    width: 12rem;
    background: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);
}

@media (min-width: 1024px) {
    .hero-orb-left {
        left: -4rem;
        bottom: 5rem;
        height: 20rem;
        width: 20rem;
    }

    .hero-orb-right {
        right: -2rem;
        top: 5rem;
        height: 17rem;
        width: 17rem;
    }
}
</style>
