import { createRouter, createWebHistory } from 'vue-router'

import Homepage from './pages/Homepage.vue'
import AboutUs from './pages/AboutUs.vue'
import BookExperience from './pages/BookExperience.vue'
import PrivacyPolicy from './pages/PrivacyPolicy.vue'
import CookiePolicy from './pages/CookiePolicy.vue'

const routes = [
    {
        path: '/',
        component: Homepage,
        meta: {
            seo: {
                title: 'The Ring Experience | Crea il tuo anello in Sri Lanka',
                description: 'Vivi un\'esperienza unica in Sri Lanka: crea un anello in argento sterling con pietre naturali locali, guidato da artigiani esperti.'
            }
        }
    },
    {
        path: '/aboutus',
        component: AboutUs,
        meta: {
            seo: {
                title: 'Chi Siamo | The Ring Experience Sri Lanka',
                description: 'Scopri la storia di The Ring Experience e la nostra missione: offrire ai turisti un ricordo significativo, non il solito souvenir.'
            }
        }
    },
    {
        path: '/bookexperience',
        component: BookExperience,
        meta: {
            seo: {
                title: 'Prenota l\'Esperienza | The Ring Experience Sri Lanka',
                description: 'Prenota la tua esperienza di creazione anello in argento sterling in Sri Lanka e porta con te un simbolo personale del tuo viaggio.'
            }
        }
    },
    {
        path: '/privacy-policy',
        component: PrivacyPolicy,
        meta: {
            seo: {
                title: 'Privacy Policy | The Ring Experience Sri Lanka',
                description: 'Read how The Ring Experience collects and manages personal data for bookings and website use.'
            }
        }
    },
    {
        path: '/cookie-policy',
        component: CookiePolicy,
        meta: {
            seo: {
                title: 'Cookie Policy | The Ring Experience Sri Lanka',
                description: 'Learn how cookies are used on The Ring Experience website and how to manage your consent.'
            }
        }
    }
]   

const router = createRouter({
    history: createWebHistory(),
    routes, 
    scrollBehavior() {    
        return { top: 0 }
    }
})

export default router
