<script setup lang="ts">

import { fetchCountryDetail } from '../services/country.svc'
import { useRoute } from "vue-router"
import { computed, defineAsyncComponent, onMounted, Suspense, watchEffect } from 'vue'
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
        class="fixed w-screen h-screen top-0 left-0 bg-very_dark flex items-center justify-center text-white">
        Pls wait for my API, it's like you—just a few seconds, or maybe shorter...
    </div>
    <div v-if="!isLoading && country">
        <div class=" bg-very_dark text-very_grey
        gap-3.5 gap-y-10 container mx-auto border-grey -translate-y-10 md:w-3/5 lg:w-2/5 w-2/3 
        border rounded-xl shadow-md shadow-dark p-6">

            <!-- <img v-once :src="country.flags.png" :alt="country.flags.alt"
                class="object-cover object-left-top h-50 w-auto aspect-[1.3] rounded-xl -mt-20 mx-auto"> -->
            <div class="aspect-[1.3] h-50 w-auto rounded-xl overflow-hidden -mt-20 mx-auto bg-transparent ">
                <img v-once :src="country.flags.png" :alt="country.flags.alt" class="w-full h-full object-contain" />
            </div>

            <h1 class="h1 text-center mt-8">{{ country.name.common }}</h1>
            <h2 class="h2 text-center"> {{ country.name.official }}</h2>
            <div class="flex items-center justify-around mt-12">
                <div class="p-2 bg-dark rounded-md flex items-center justify-center w-1/3">
                    <span class="w-full text-center shrink border-r border-very_dark px-2">Populations</span>
                    <span class="text-center w-full px-2">{{ country.population.toLocaleString() }}</span>
                </div>
                <div class="p-2 bg-dark rounded-md flex items-center justify-center w-1/3">
                    <span class="w-full text-center shrink border-r border-very_dark px-2">Area (km <sup>2</sup>)</span>
                    <span class="w-full text-center px-2">{{ country.area.toLocaleString() }}</span>
                </div>
            </div>
            <div class="flex items-center w-full justify-between p-4 border-t-dark border-t mt-12">
                Capital <span>{{ Object.values(country.languages).join(',') }}</span>
            </div>
            <div class="flex items-center w-full justify-between p-4 border-t-dark border-t">
                Subregion <span>{{ country.subregion }}</span>
            </div>
            <div class="flex items-center w-full justify-between p-4 border-t-dark border-t">
                Language <span>{{ Object.values(country.languages).join(',') }}</span>
            </div>
            <div class="flex items-center w-full justify-between p-4 border-t-dark border-t">
                Currencies <span>{{Object.values(country.currencies ?? {}).map(el => el.name).join(',')}}</span>
            </div>
            <div class="flex items-center w-full justify-between p-4 border-y-dark border-y">
                Continent <span>{{ country.continents.join(',') }}</span>
            </div>
            <Suspense v-if="country.borders">
                <template #default>
                    <div class="mt-10">
                        <p class="mb-6">Neighbouring Countries</p>
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