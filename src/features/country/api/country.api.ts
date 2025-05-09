import { axiosClient } from "@/axios";
/**
 * Get All Contries API
 * @param (string) sort default = population
 * @returns
 */
export function getCountries(sort: string = "population") {
    return axiosClient.get(`all?sort=${sort}`)
}
/**
 * Get Contry API 
 * @param (string) countryCode 
 * @returns
 */
export function getCountry(countryCode: string) {
    return axiosClient.get(`alpha/${countryCode}`)
}