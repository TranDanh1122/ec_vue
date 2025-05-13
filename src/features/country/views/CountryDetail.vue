<script setup lang="ts">

import { fetchCountryDetail } from '../services/country.svc'
import { useRoute } from "vue-router"
import { defineAsyncComponent, watchEffect } from 'vue'
const router = useRoute()
const { countryCode } = router.params
const { data: country, isLoading } = fetchCountryDetail(countryCode as string)
const NeighbouringCountry = defineAsyncComponent(() => import('../components/NeighbouringCountry.vue'))
watchEffect(() => {
    document.title = `Country | ${country.value?.name.common ?? ''}`
})

</script>
<template>
    <div v-if="isLoading"
        class="fixed w-screen h-screen top-0 left-0 bg-very_dark flex items-center justify-center text-white h4 sm:px-0 px-2">
        Pls wait for my API, it's like you—just a few seconds, or maybe shorter...
    </div>
    <div v-if="!isLoading && country">
        <div class=" bg-very_dark text-very_grey
        gap-3.5 gap-y-10 container mx-auto border-grey -translate-y-10 sm:-translate-y-15
         md:w-3/5 lg:w-2/5 w-[95%] border rounded-xl shadow-md shadow-dark sm:p-6 p-2">

            <!-- <img v-once :src="country.flags.png" :alt="country.flags.alt"
                class="object-cover object-left-top h-50 w-auto aspect-[1.3] rounded-xl -mt-20 mx-auto"> -->
            <div
                class="aspect-[1.3] sm:h-50 h-25 w-auto rounded-xl overflow-hidden -mt-[10%] sm:-mt-[15%] mx-auto bg-transparent ">
                <img v-once :src="country.flags.png" :alt="country.flags.alt" class="w-full h-full object-cover" />
            </div>

            <h1 class="h2_bold sm:h1 text-center sm:mt-8">{{ country.name.common }}</h1>
            <h2 class="h4 sm:h2 text-center"> {{ country.name.official }}</h2>
            <div class="flex items-center justify-around sm:mt-12 mt-2 sm:gap-0 gap-2 flex-col sm:flex-row">
                <div class="p-2 bg-dark rounded-md flex items-center justify-center sm:w-2/5 lg:w-1/3 w-full h4 sm:h3">
                    <span
                        class="w-full text-center shrink border-r border-very_dark px-2 truncate max-w-[150px]">Populations</span>
                    <span class="text-center w-full px-2 line-clamp-1 truncate max-w-[150px]">{{
                        country.population.toLocaleString() }}</span>
                </div>
                <div class="p-2 bg-dark rounded-md flex items-center justify-center sm:w-2/5 lg:w-1/3 w-full h4 sm:h3">
                    <span class="w-full text-center shrink border-r border-very_dark px-2 truncate max-w-[150px]">Area
                        (km <sup>2</sup>)</span>
                    <span class="w-full text-center px-2 truncate max-w-[150px]">{{ country.area.toLocaleString()
                        }}</span>
                </div>
            </div>
            <div
                class="flex items-center w-full justify-between sm:p-4 p-2 h4 sm:h3  border-t-dark border-t sm:mt-12 mt-2">
                Capital <span>{{ Object.values(country.languages).join(',') }}</span>
            </div>
            <div class="flex items-center w-full justify-between sm:p-4 p-2 sm:h3 h4 border-t-dark border-t">
                Subregion <span>{{ country.subregion }}</span>
            </div>
            <div class="flex items-center w-full justify-between sm:p-4 p-2 sm:h3 h4 border-t-dark border-t">
                Language <span>{{ Object.values(country.languages).join(',') }}</span>
            </div>
            <div class="flex items-center w-full justify-between sm:p-4 p-2 sm:h3 h4 border-t-dark border-t">
                Currencies <span>{{Object.values(country.currencies ?? {}).map(el => el.name).join(',')}}</span>
            </div>
            <div class="flex items-center w-full justify-between sm:p-4 p-2 sm:h3 h4 border-y-dark border-y">
                Continent <span>{{ country.continents.join(',') }}</span>
            </div>
            <Suspense v-if="country.borders">
                <template #default>
                    <div class="sm:mt-10 mt-2 ">
                        <p class="sm:mb-6 mb-2 sm:h3 h4">Neighbouring Countries</p>
                        <NeighbouringCountry :countryCode="country.cca2" :neighborCodes="country.borders" />
                    </div>
                </template>
                <template #fallback>
                    <div class="border-s-2 border-very_grey rounded-full animate-spin size-10 mx-auto mt-10"></div>
                </template>
            </Suspense>

        </div>
    </div>
</template>