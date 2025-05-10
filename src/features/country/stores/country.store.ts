import { defineStore } from "pinia"
import { getCountriesQueryFn, type Country } from "@/features/country"
import { queryClient } from "@/utls/tanstack-client"

type SortBy = "population" | "name" | "area"
type Paginate = {
    page: number,
    offset: number,
    limit: number
}

type CountryStatusFilter = "independent" | "unmember"

interface CountryStoreState {
    countries: Country[],
    sortBy: SortBy,
    region: string[],
    countryStatus: Record<keyof CountryStatusFilter, boolean>
    paginate: Paginate,
}
interface CountryStoreGetters extends Record<string, any> {

}
interface CountryStoreActions {

}
export const ContryStore = defineStore<"countries", CountryStoreState, CountryStoreGetters, CountryStoreActions>("countries", {
    state: () => ({
        countries: [],
        sortBy: "population",
        region: [],
        countryStatus: {},
        paginate: {
            page: 1,
            offset: 0,
            limit: 10
        },
    }),
    actions: {
        async fetchCountries() {
            const countries = await queryClient.fetchQuery({
                queryKey: ['countries', 'population'],
                queryFn: async () => await getCountriesQueryFn()
            })
            this.countries = countries
        }
    },
    getters: {

    }
})