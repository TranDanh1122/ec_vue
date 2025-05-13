import type { Ref } from "vue"

interface Name {
    common: string,
    official: string
}
export interface CountryName extends Name {
    nativeName: Record<string, Name>
}
interface CountryFlag {
    png: string,
    alt: string
}
interface Currency {
    symbol : string,
    name : string
}
/**
 * Country Data Interface
 */
export interface Country {
    flag: string,
    name: CountryName,
    population: number,
    area: number,
    region: string,
    subregion?: string,
    flags: CountryFlag,
    capital: string[],
    independent: boolean,
    unMember: boolean,
    cca2 : string,
    languages: Record<string , string>,
    currencies : Record<string , Currency>,
    continents : string[],
    borders : string[]

}
export type Sort = "asc" | "desc"
export type SortBy = "population" | "name" | "area"
export type Paginate = {
    page: number,
    offset: number,
    limit: number
}

export type CountryStatusFilter = "independent" | "unmember"

export interface CountryStoreState {
    countries: Country[],
    search: string,
    sortBy: SortBy,
    regions: Ref<Set<string>>,
    countryStatus: Ref<Set<CountryStatusFilter>>
    paginate: Paginate,
    loading: boolean,
    sort: Sort,
}
export interface CountryStoreGetters extends Record<string, any> {
    filteredCountries: () => Country[],
    paginatedCountries: () => Country[],
    total: () => number,
    totalPage: () => number,

}
export interface CountryStoreActions {
    changeSortBy: (sortBy: SortBy) => void,
    changeRegionFilter: (region: string) => void,
    changeStatusFilter: (status: CountryStatusFilter) => void,
    changePage: (page: number) => void,
    searching: (search: string) => void,
    setCountries: (countries: Country[]) => void,
    loadingTable: (isLoading: boolean) => void,
    changeSort: (sort: Sort) => void
}