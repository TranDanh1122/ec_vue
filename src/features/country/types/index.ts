interface Name {
    common: string,
    official: string
}
interface CountryName extends Name {
    nativeName: Record<string, Name>
}
interface CountryFlag {
    png: string,
    alt: string
}
/**
 * Country Data Interface
 */
export interface Country {
    flag: string,
    name: CountryName,
    population: number,
    area: number,
    region: string
    flags: CountryFlag,
    capital: string[],
    independent: boolean,
    unMember: boolean,
}