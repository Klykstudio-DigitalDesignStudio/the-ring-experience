<template>
    <article class="group experience-card relative h-140 w-full overflow-hidden">
        <img :src="image" :alt="title" class="absolute inset-0 h-full w-full object-cover object-center">

        <div
            class="absolute inset-x-0 bottom-0 h-1/2 bg-[#C8B49C]/95 opacity-100 md:inset-0 md:h-full md:opacity-0 md:transition-opacity md:duration-500 md:ease-out md:group-hover:opacity-100">
        </div>

        <div
            class="absolute inset-x-0 bottom-0 z-10 flex h-1/2 flex-col items-center justify-center px-6 text-center text-[#2A1E17] opacity-100 md:inset-0 md:h-full md:translate-y-8 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <h3 class="font-display text-4xl font-medium md:text-5xl">{{ title }}</h3>
            <p class="mt-4">{{ lineOne }}</p>
            <p>{{ lineTwo }}</p>
        </div>
    </article>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    lineOne: {
        type: String,
        required: true
    },
    lineTwo: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/the-ring-experience-logo.svg'
    }
})
</script>
