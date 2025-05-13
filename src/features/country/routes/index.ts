
import { defineAsyncComponent } from "vue"
import { queryClient } from "@/utls/tanstack-client"
import { getCountriesQueryFn, getCountryQueryFn } from "../services/country.svc"
import { pageStore } from "@/stores/page.store"
const router = [
    {
        path: "",
        component: defineAsyncComponent({
            loader: async () => {
                try {
                    await queryClient.fetchQuery({
                        queryKey: ['countries', 'population'],
                        queryFn: async () => await getCountriesQueryFn()
                    })
                    return import("../views/CountryRanking.vue")
                } catch (e) {
                    console.error("Pre fetch contries error", e)
                    throw new Error(`${e}`)
                }
            }
        }),
    },
    {
        path: "/country/:countryCode",
        component: defineAsyncComponent({
            loader: async () => {
                try {
                    const param = pageStore().currentParam
                    if (param) {
                        await queryClient.fetchQuery({
                            queryKey: ['country', param],
                            queryFn: () => getCountryQueryFn(param)
                        })
                    }
                } catch (e) {
                    throw new Error(`${e}`)
                }
                return import("../views/CountryDetail.vue")
            }
        })
    }


]
export default router