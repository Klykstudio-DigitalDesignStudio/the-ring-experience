<template>
  <transition name="cookie-fade">
    <section
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-50 border-t border-[#2A1E17]/15 bg-[#FAF5EF] p-4 shadow-[0_-6px_20px_rgba(42,30,23,0.12)]"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p class="text-sm leading-relaxed text-[#2A1E17]">
          We use cookies to improve your experience and measure site performance.
          <router-link class="underline" to="/privacy-policy">Privacy Policy</router-link>
          and
          <router-link class="underline" to="/cookie-policy">Cookie Policy</router-link>.
        </p>

        <div class="flex shrink-0 items-center gap-2">
          <button
            type="button"
            class="rounded-full border border-[#2A1E17] px-4 py-2 text-sm text-[#2A1E17] transition hover:bg-[#2A1E17]/5"
            @click="rejectCookies"
          >
            Reject
          </button>
          <button
            type="button"
            class="rounded-full bg-[#2A1E17] px-4 py-2 text-sm text-[#FAF5EF] transition hover:bg-[#3B2B21]"
            @click="acceptCookies"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCookieConsent, setCookieConsent } from '../utils/consentState'

const isVisible = ref(false)

const hideBanner = () => {
  isVisible.value = false
}

const acceptCookies = () => {
  setCookieConsent('accepted')
  hideBanner()
}

const rejectCookies = () => {
  setCookieConsent('rejected')
  hideBanner()
}

onMounted(() => {
  isVisible.value = !getCookieConsent()
})
</script>

<style scoped>
.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.2s ease;
}

.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
}
</style>
