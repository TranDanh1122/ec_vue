import { useQuery } from "@tanstack/vue-query"
import { getCountries, getCountry, type Country } from "@/features/country"
/**
 * Vue query get all countries
 * @param (string?) sort
 * @returns 
 */
export const fetchAllCountries = (sort?: string) => {
    return useQuery({
        queryKey: ['countries', sort],
        queryFn: async () => {
            const res = await getCountries(sort)
            if (res.status != 200) throw new Error(res.statusText)
            return res.data as Country[]
        },
        refetchOnWindowFocus: false,
        staleTime: 3 * 1000, //sau 3 phút, fetch lại nếu cần sử dụng data này (after 3 min, re-fetch if still using/need this data)
        gcTime: 5 * 1000 // sau 5 phút không được sử dụng, xóa hắn data (after 5 min not using this data, delete it , fetch when need it again)
    })
}
/**
 * Vue Query get country detail by country code
 * @param (string) countryCode 
 * @returns 
 */
export const fetchCountryDetail = (countryCode: string) => {
    return useQuery({
        queryKey: ['country', countryCode],
        queryFn: async () => {
            const res = await getCountry(countryCode)
            if (res.status != 200) throw new Error(res.statusText)
            return res.data as Country
        },
        staleTime: 3 * 1000, //sau 3 phút, fetch lại nếu cần sử dụng data này (after 3 min, re-fetch if still using/need this data)
        gcTime: 5 * 1000 // sau 5 phút không được sử dụng, xóa hắn data (after 5 min not using this data, delete it , fetch when need it again)
    })
}