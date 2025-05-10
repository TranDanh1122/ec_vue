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
    search: string,
    sortBy: SortBy,
    regions: Set<string>,
    countryStatus: Set<CountryStatusFilter>
    paginate: Paginate,
}
interface CountryStoreGetters extends Record<string, any> {
    filteredCountries : () => Country[],
    paginatedCountries : () => Country[],
    total: () => number,
    totalPage : () => number
}
interface CountryStoreActions {
    fetchCountries: () => Promise<void>,
    changeSortBy: (sortBy: SortBy) => void,
    changeRegionFilter: (region: string) => void,
    changeStatusFilter: (status: CountryStatusFilter) => void,
    changePage: (page: number) => void
}
export const ContryStore = defineStore<"countries", CountryStoreState, CountryStoreGetters, CountryStoreActions>("countries", {
    state: () => ({
        countries: [],
        search: "",
        sortBy: "population",
        regions: new Set<string>(),
        countryStatus: new Set<CountryStatusFilter>(),
        paginate: {
            page: 1,
            offset: 0,
            limit: 10
        },
    }),
    actions: {
        async fetchCountries() {
            const countries = await queryClient.fetchQuery({
                queryKey: ['countries', this.sortBy],
                queryFn: async () => await getCountriesQueryFn(this.sortBy)
            })
            this.countries = countries
        },
        changeSortBy(sortBy: SortBy) {
            this.sortBy = sortBy
        },
        changeRegionFilter(region: string) {
            this.regions.add(region)
        },
        changeStatusFilter(statusFilter: CountryStatusFilter) {
            this.countryStatus.add(statusFilter)
        },
        changePage(page: number) {
            this.paginate.page = page
            this.paginate.offset = page * this.paginate.limit
        }
    },
    getters: {
        filteredCountries() {
            const result = [...this.countries]
            if (this.search || this.regions || this.countryStatus) {
                result.filter(country => {
                    let isPassFilter = true
                    const name = country.name.common.toLowerCase()
                    const region = country.region.toLowerCase()
                    const subregion = country.subregion.toLowerCase()
                    if (this.search) { //search by name, region, subregion
                        const search = this.search.toLowerCase().trim()
                        isPassFilter = isPassFilter && name.includes(search) || region.includes(search) || subregion.includes(search)
                    }

                    if (this.regions) isPassFilter = isPassFilter && this.regions.has(region)

                    if (this.countryStatus) { //if has filter => filter , if not, item pass
                        const isIndependent = this.countryStatus.has("independent") ? country.independent : true
                        const isUnMember = this.countryStatus.has("unmember") ? country.unMember : true
                        isPassFilter = isPassFilter && isIndependent && isUnMember
                        }
                    return isPassFilter
                })
            }
            return result
            //we can have sort function here, but we have API and reactive param, so let it do it work, naturally
        },
        paginatedCountries() {
            const countries = this.filteredCountries
            return countries.slice(this.paginate.offset , this.paginate.offset + this.paginate.limit)
        },
        total () {
            return this.filteredCountries.length
        },
        totalPage () {
            return Math.ceil(this.filteredCountries.length / this.paginate.limit)
        }
    }
})