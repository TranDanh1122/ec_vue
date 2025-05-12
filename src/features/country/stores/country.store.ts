import { defineStore } from "pinia"
import type {
    Country,
    SortBy,
    CountryStoreActions,
    CountryStoreGetters,
    CountryStatusFilter,
    CountryStoreState,
    CountryName,
    Sort
} from "@/features/country"
import { ref  } from "vue"


export const CountryStore = defineStore<"countries", CountryStoreState, CountryStoreGetters, CountryStoreActions>("countries", {
    state: () => ({
        loading: false,
        countries: [],
        search: "",
        sortBy: "population",
        sort: "asc",
        regions: ref(new Set<string>()),
        countryStatus: ref(new Set<CountryStatusFilter>()),
        paginate: {
            page: 1,
            offset: 0,
            limit: 10
        },
    }),
    actions: {
        changeSortBy(sortBy: SortBy) {
            if (this.sortBy != sortBy) this.sortBy = sortBy
        },
        changeSort(sort: Sort) {
            if (this.sort != sort) this.sort = sort
        },
        changeRegionFilter(region: string) {   
            const newRegions = new Set(this.regions.values())    
            if (newRegions.has(region)) {
                newRegions.delete(region)
            } else {
                newRegions.add(region)
            }
            this.regions =  newRegions
        },
        changeStatusFilter(statusFilter: CountryStatusFilter) {
            const newStatusFilter = new Set(this.countryStatus.values())
            if(newStatusFilter.has(statusFilter)) {
                newStatusFilter.delete(statusFilter)
            }else {
                newStatusFilter.add(statusFilter)
            }
            this.countryStatus  = newStatusFilter
        },
        changePage(page: number) {
            this.paginate.page = page
            this.paginate.offset = page * this.paginate.limit
        },
        searching(search: string) {
            this.search = search
        },
        setCountries(countries: Country[]) {
            this.countries = countries
        },
        loadingTable(isLoading: boolean) {
            this.loading = isLoading
        }
    },
    getters: {
        filteredCountries() {
            let result = [...this.countries]
            if (this.search || this.regions || this.countryStatus) {
                result = result.filter(country => {
                    let isPassFilter = true
                    const name = country.name.common.toLowerCase()
                    const region = country.region.toLowerCase()
                    const subregion = country.subregion?.toLowerCase() || ""
                    if (this.search) { //search by name, region, subregion
                        const search = this.search.toLowerCase().trim()
                        isPassFilter = isPassFilter && name.includes(search) || region.includes(search) || subregion.includes(search)
                    }
                    
                    if (this.regions && this.regions.size > 0) isPassFilter = isPassFilter && this.regions.has(region)

                    if (this.countryStatus) { //if has filter => filter , if not, item pass
                        const isIndependent = this.countryStatus.has("independent") ? country.independent : true
                        const isUnMember = this.countryStatus.has("unmember") ? country.unMember : true
                        isPassFilter = isPassFilter && isIndependent && isUnMember
                    }
                    return isPassFilter
                })
            }

            //we can have sort function here, but we have API and reactive param, so let it do it work, naturally
            //update: sort API is absolutely bullshit, we have reactive param here but it not working at all (checked with api and still get the same response)

            if (this.sortBy) {
                result = result.sort((a, b) => {
                    const key = this.sortBy as keyof Country
                    const aVal = a[key]
                    const bVal = b[key]
                    if (typeof aVal == "object" && typeof bVal == "object") {
                        const aCommonName = (aVal as CountryName).common
                        const bCommonName = (bVal as CountryName).common
                        return this.sort == "asc" ? aCommonName.localeCompare(bCommonName) : bCommonName.localeCompare(aCommonName)
                    }
                    if (typeof aVal == "number" && typeof bVal == "number") return this.sort == "asc" ? aVal - bVal : bVal - aVal // asc sort, if positive it will change position
                    return 0 // not change
                })
            }

            return result
        },
        paginatedCountries() {
            const countries = this.filteredCountries
            return countries.slice(this.paginate.offset, this.paginate.offset + this.paginate.limit)
        },
        total() {
            return this.filteredCountries.length
        },
        totalPage() {
            return Math.ceil(this.filteredCountries.length / this.paginate.limit) - 1
        }
    }
})