
import { defineAsyncComponent } from "vue"
import { queryClient } from "@/utls/tanstack-client"
import {  getCountriesQueryFn } from "@/features/country"

const router = [
    {
        path: "",
        component: defineAsyncComponent({
            loader: async () => {
                try {
                    await queryClient.fetchQuery({
                        queryKey: ['countries', 'population'],
                        queryFn: async () => await getCountriesQueryFn('population')
                    })
                    return import("../views/CountryRanking.vue")
                } catch (e) {
                    console.error("Pre fetch contries error", e)
                    return import("@/features/notfound/NotFound.vue")
                }
            },

        }),
    }
]
export default router