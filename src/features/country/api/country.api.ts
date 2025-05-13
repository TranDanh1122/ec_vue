import { axiosClient } from "@/axios";
/**
 * Get All Contries API
 * @param (string) sort default = population
 * @returns
 */
export function getCountries() {
    return axiosClient.get(`all?fields=flag,name,population,area,region,subregion,flags,capital,independent,unMember,cca2,languages,currencies,continents,borders`)
}
/**
 * Get Contry API 
 * @param (string) countryCode 
 * @returns
 */
export function getCountry(countryCode: string) {
    return axiosClient.get(`alpha/${countryCode}`)
}

export function getNeighbouringCountries(codes : string[]) {
    return axiosClient.get(`alpha?codes=${codes.join(',')}`)
}

