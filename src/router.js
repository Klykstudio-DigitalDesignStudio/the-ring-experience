import { createRouter, createWebHistory } from 'vue-router'

import Homepage from './pages/Homepage.vue'
import AboutUs from './pages/AboutUs.vue'
import BookExperience from './pages/BookExperience.vue'

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
        path: '/about',
        component: AboutUs,
        meta: {
            seo: {
                title: 'Chi Siamo | The Ring Experience Sri Lanka',
                description: 'Scopri la storia di The Ring Experience e la nostra missione: offrire ai turisti un ricordo significativo, non il solito souvenir.'
            }
        }
    },
    {
        path: '/book',
        component: BookExperience,
        meta: {
            seo: {
                title: 'Prenota l\'Esperienza | The Ring Experience Sri Lanka',
                description: 'Prenota la tua esperienza di creazione anello in argento sterling in Sri Lanka e porta con te un simbolo personale del tuo viaggio.'
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