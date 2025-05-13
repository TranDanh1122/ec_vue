import { Layout } from "@/layouts";
import { createRouter, createWebHistory } from "vue-router";
import CountryRouter from "@/features/country/routes";
import NotFound from "@/features/notfound/NotFound.vue";
export const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            component: Layout,
            children: [
                ...CountryRouter
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: "NotFound",
            component: NotFound
        }

    ]
})