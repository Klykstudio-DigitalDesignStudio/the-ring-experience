<template>
    <main ref="faqRoot" class="w-full">
        <PageTitleSection :content="heroContent" />

        <section data-reveal class="w-full pb-16 sm:pb-20 lg:pb-24">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="grid grid-cols-1 gap-4">
                    <details v-for="(item, index) in faqItems" :key="`${index}-${item.question}`"
                        class="group border bg-white/72 p-5 sm:p-6"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl leading-tight text-(--color-brown)">
                            <span>{{ item.question }}</span>
                            <span class="text-(--color-noisette) transition-transform duration-200 group-open:rotate-45">+</span>
                        </summary>
                        <p class="mt-4 max-w-4xl text-base leading-relaxed whitespace-pre-line text-(--color-brown) sm:text-lg"
                            style="opacity: 0.88;">
                            {{ item.answer }}
                        </p>
                    </details>
                </div>
            </div>
        </section>

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import PageTitleSection from '../components/PageTitleSection.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchFaqPageContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const cmsFaqContent = ref({});
const cmsSocialContent = ref({});
const faqRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(faqRoot);

const fallbackFaqItems = [
    {
        question: 'How long does the ring-making experience take?',
        answer: 'A standard session usually takes around two to three hours from introduction to final finishing.'
    },
    {
        question: 'Is the experience suitable for beginners?',
        answer: 'Yes. Guests do not need previous jewelry-making experience. The workshop is guided step by step.'
    },
    {
        question: 'Can we choose gemstones during the session?',
        answer: 'Yes. Available gemstones depend on the current selection, and the team can guide guests toward the best fit.'
    },
    {
        question: 'Do I need to book in advance?',
        answer: 'Advance booking is recommended, especially during busy travel periods, so the preferred day and time can be reserved.'
    },
    {
        question: 'Can couples or friends join together?',
        answer: 'Yes. The experience can be enjoyed solo or shared, depending on the package selected.'
    }
];

const heroContent = computed(() => ({
    eyebrow: cmsFaqContent.value?.hero?.eyebrow ?? 'FAQ',
    title: cmsFaqContent.value?.hero?.title ?? 'Frequently Asked Questions',
    description: cmsFaqContent.value?.hero?.description ?? 'Find quick answers to the questions guests ask most often before booking their ring-making experience.'
}));

const faqItems = computed(() => {
    const items = Array.isArray(cmsFaqContent.value?.items)
        ? cmsFaqContent.value.items.filter((item) => item?.question && item?.answer)
        : [];
    return items.length ? items : fallbackFaqItems;
});

onMounted(async () => {
    const [sanityFaq, sanitySocial] = await Promise.all([
        fetchFaqPageContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsFaqContent.value = sanityFaq ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    await nextTick();
    if (window.innerWidth >= 768) {
        setupRevealAnimations();
    }
});
</script>
