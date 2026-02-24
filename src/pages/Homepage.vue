<template>
    <main>
        <section id="hero" class="w-full h-screen bg-black relative">
            <img src="../assets/herocover.jpeg" alt="Hero Cover Image"
                class="w-full h-full object-cover object-center opacity-70">
            <div id="overlay" class="w-full h-full bg-linear-to-t from-[#2A1E17]/80 to-transparent absolute top-0">
            </div>
            <div class="absolute inset-0 flex flex-col items-end justify-end text-center py-60 px-40">
                <div class="flex flex-col justify-start items-start">
                    <h1 class="text-8xl font-display font-medium text-start text-white mb-4">Every ring begins <br> with
                        a
                        choice</h1>
                    <p class="text-lg md:text-2xl font-light text-start text-gray-300">A meaningful travel memory beyond
                        the usual
                    </p>
                    <div class="mt-6 mb-6 h-px w-24 bg-[#B08942]"></div>
                    <Button class="mt-4">Book your experience</Button>
                </div>

            </div>
        </section>
        <section id="aMoment" class="size-fit w-full flex flex-col items-center justify-center py-40">
            <div class="w-10/12 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
                <figure class="lg:col-span-7 flex items-center justify-center">
                    <img src="../assets/herocover.jpeg" alt="Hero Cover Image"
                        class="h-auto max-h-136 w-full object-contain">
                </figure>
                <div class="lg:col-span-5 flex flex-col justify-center lg:pl-2">
                    <p class="mb-4 text-sm tracking-[0.2em] uppercase text-[#6F5644]">A shared ritual</p>
                    <h2 class="font-display text-5xl lg:text-6xl leading-[1.08] font-medium text-(--color-brown)">
                        Not a store. A memory you create together.
                    </h2>
                    <div class="mt-8 h-px w-24 bg-[#B08942]"></div>
                    <div class="mt-7 space-y-3">
                        <p class="text-lg leading-relaxed text-[#4B2F1D]/85">
                            Two seats, one table, raw silver, open flame.
                        </p>
                        <p class="text-lg leading-relaxed text-[#4B2F1D] font-semibold italic">
                            You do not buy a ring. You craft it, side by side, together.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id="theExperience" class="size-fit w-full flex flex-col items-center justify-center pb-20">
            <div ref="experienceGrid" class="w-10/12 grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card v-for="card in experienceCards" :key="card.key" class="experience-card" :title="card.title"
                    :line-one="card.lineOne" :line-two="card.lineTwo" :image="card.image" />
            </div>


        </section>
    </main>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { gsap } from 'gsap';
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';
import homepageContent from '../../content/homepage.json';

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

const experienceCards = Array.isArray(homepageContent?.experienceCards) && homepageContent.experienceCards.length
    ? homepageContent.experienceCards
    : fallbackCards;

const experienceGrid = ref(null);

const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

const getExperienceCards = () => {
    if (!experienceGrid.value) return [];
    return Array.from(experienceGrid.value.querySelectorAll('.experience-card'));
};

const animateMobileCardsIn = () => {
    const cards = getExperienceCards();
    if (!isMobileViewport() || !cards.length) return;

    gsap.killTweensOf(cards);
    gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.08 }
    );
};

const animateMobileCardsOut = (done) => {
    const cards = getExperienceCards();
    if (!isMobileViewport() || !cards.length) {
        done();
        return;
    }

    gsap.killTweensOf(cards);
    gsap.to(cards, {
        autoAlpha: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
        stagger: 0.05,
        onComplete: done
    });
};

onMounted(async () => {
    await nextTick();
    animateMobileCardsIn();
});

onBeforeRouteLeave((_to, _from, next) => {
    animateMobileCardsOut(next);
});
</script>
