
import { defineAsyncComponent } from "vue"
import { queryClient } from "@/utls/tanstack-client"
import { getCountriesQueryFn, getCountryQueryFn } from "@/features/country"
import { pageStore } from "@/stores/page.store"
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
    },
    {
        path: "/country/:countryCode",
        component: defineAsyncComponent({
            loader: async () => {
                try {
                    const param = pageStore().currentParam
                    if(param) {
                        await queryClient.fetchQuery({
                            queryKey: ['country', param],
                            queryFn: () => getCountryQueryFn(param)
                        })
                    }
                    return import("../views/CountryDetail.vue")
                } catch (e) {
                 
                    return import("../views/CountryDetail.vue")
                }

            }
        })
    }


]
export default router