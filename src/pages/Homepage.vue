<template>
    <main>
        <section id="hero" class="w-full h-screen bg-black">
            <img src="../assets/herocover.jpeg" alt="Hero Cover Image"
                class="w-full h-full object-cover object-center opacity-70">
            <div id="overlay" class="w-full h-full bg-linear-to-t from-[#2A1E17]/80 to-transparent absolute top-0">
            </div>
            <div class="absolute inset-0 flex flex-col items-end justify-end text-center py-60 px-40">
                <div class="flex flex-col justify-start items-start">
                    <h1 class="text-8xl font-display font-medium text-start text-white mb-4">Every ring begins <br> with a
                        choice</h1>
                    <p class="text-lg md:text-2xl font-light text-start text-gray-300">A meaningful travel memory beyond the usual
                    </p>
                    <Button class="mt-4">Book your experience</Button>
                </div>
                
            </div>
        </section>
    </main>
</template>

<script setup>
import Button from '../components/Button.vue';
</script>