import { useQuery } from "@tanstack/vue-query";
import { getCountries, getCountry, getNeighbouringCountries } from "../api/country.api";
import { type Ref } from "vue";
import type { Country } from "../types"

export const getCountriesQueryFn = async () => {
    const res = await getCountries();
    if (res.status != 200) throw new Error(res.statusText);
    return res.data as Country[];
};

export const getCountryQueryFn = async (countryCode: string) => {
    const res = await getCountry(countryCode);
    if (res.status != 200) throw new Error(res.statusText);
    const [country, ..._] = res.data
    return country as Country;
}

/**
 * Vue query get all countries
 * @param (string?) sort
 * @returns
 */

export const fetchAllCountries = (sort?: Ref<string>) => {
    const query = useQuery({
        queryKey: ["countries", sort],
        queryFn: async () => {
            try {
                return await getCountriesQueryFn();
            } catch (e) {
                console.error("Fetch Countries Error", e);
            }
        },
        refetchOnWindowFocus: false,
        staleTime: 3 * 60 * 1000, //sau 3 phút, fetch lại nếu cần sử dụng data này (after 3 min, re-fetch if still using/need this data)
        gcTime: 5 * 60 * 1000, // sau 5 phút không được sử dụng, xóa hắn data (after 5 min not using this data, delete it , fetch when need it again)
    });
    return query
};

/**
 * Vue Query get country detail by country code
 * @param (string) countryCode
 * @returns
 */
export const fetchCountryDetail = (countryCode: string) => {
    return useQuery({
        queryKey: ["country", countryCode],
        queryFn: async () => {
            try {
                return await getCountryQueryFn(countryCode);
            } catch (e) {
                console.error("Fetch Countries Error", e);
            }
        },
        staleTime: 3 * 60 * 1000, //sau 3 phút, fetch lại nếu cần sử dụng data này (after 3 min, re-fetch if still using/need this data)
        gcTime: 5 * 60 * 1000, // sau 5 phút không được sử dụng, xóa hắn data (after 5 min not using this data, delete it , fetch when need it again)
    });
};
export const fetchNeighBouringCountries = (codes: string[], countryCode: string) => {
    return useQuery({
        queryKey: ['neighbouring', countryCode],
        queryFn: async () => {
            try {
                const res = await getNeighbouringCountries(codes)
                if (res.status != 200) throw new Error(res.data.statusText)
                return res.data as Country[]
            } catch (error) {
                console.error("Fetch Neibouring Countries Error", error);
            }
        },
        staleTime: 3 * 60 * 1000, //sau 3 phút, fetch lại nếu cần sử dụng data này (after 3 min, re-fetch if still using/need this data)
        gcTime: 5 * 60 * 1000, // sau 5 phút không được sử dụng, xóa hắn data (after 5 min not using this data, delete it , fetch when need it again)
    })
}
