
import { defineAsyncComponent } from "vue"
import { ContryStore } from "../stores/country.store"
const router = [
    {
        path: "",
        component: defineAsyncComponent({
            loader: async () => {
                try {
                    await ContryStore().fetchCountries()
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