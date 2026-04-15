<template>
    <section v-if="sectionEnabled" data-reveal class="w-full py-16 sm:py-20 lg:py-24">
        <div class="mx-auto w-11/12 sm:w-10/12">
            <div class="mx-auto max-w-3xl text-center">
                <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ previewContent.eyebrow }}</p>
                <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">{{ previewContent.heading }}</h2>
                <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.86;">
                    {{ previewContent.description }}
                </p>
            </div>

            <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>

            <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
                <article v-for="item in homepageItems" :key="item.question" class="border bg-white/70 p-6 sm:p-7"
                    style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                    <p class="font-display text-2xl leading-tight text-(--color-brown)">{{ item.question }}</p>
                    <p class="mt-4 text-base leading-relaxed whitespace-pre-line text-(--color-brown)" style="opacity: 0.88;">
                        {{ item.answer }}
                    </p>
                </article>
            </div>

            <div class="mt-10 text-center">
                <router-link :to="previewContent.ctaLink" class="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm tracking-[0.12em] uppercase text-(--color-brown) transition hover:bg-[#2A1E17] hover:text-(--color-lightbeige)"
                    style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                    {{ previewContent.ctaLabel }}
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    items: {
        type: Array,
        default: () => []
    }
});

const fallbackItems = [
    {
        question: 'How long does the experience take?',
        answer: 'Most sessions take around two to three hours, depending on the ring design and any gemstone choices.'
    },
    {
        question: 'Do I need any jewelry-making experience?',
        answer: 'Not at all. The session is guided step by step, so beginners can enjoy the process comfortably.'
    },
    {
        question: 'Can I book in advance while planning my trip?',
        answer: 'Yes. Guests can reserve ahead of time to secure the date that fits best within their Sri Lanka itinerary.'
    }
];

const previewContent = computed(() => ({
    enabled: props.content?.enabled ?? true,
    eyebrow: props.content?.eyebrow ?? 'Most asked',
    heading: props.content?.heading ?? 'Quick answers before you book',
    description: props.content?.description ?? 'This preview section will automatically show the FAQs marked for the homepage in Sanity.',
    ctaLabel: props.content?.ctaLabel ?? 'See all FAQs',
    ctaLink: props.content?.ctaLink ?? '/faq'
}));

const homepageItems = computed(() => {
    const items = Array.isArray(props.items) ? props.items.filter((item) => item?.question && item?.answer) : [];
    return items.length ? items.slice(0, 3) : fallbackItems;
});

const sectionEnabled = computed(() => previewContent.value.enabled !== false);
</script>
