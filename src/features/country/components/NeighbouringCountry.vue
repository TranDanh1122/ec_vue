<script setup lang="ts">
import { pageStore } from '@/stores/page.store';
import { fetchNeighBouringCountries } from '../services/country.svc';
import { useRouter } from 'vue-router';
const props = defineProps<{ neighborCodes: string[], countryCode: string }>()
const { data: countries, isLoading } = fetchNeighBouringCountries(props.neighborCodes, props.countryCode)
const router = useRouter()
</script>
<template>
    <div v-if="isLoading" class="w-full flex flex-wrap sm:gap-4 gap-2 justify-center">
        <div v-for="(_, key) in Array.from({ length: 5 })" :key class="p-1 cursor-pointer sm:w-[calc(25%-13.5px)] lg:w-[calc(16.6667%-15px)] w-[calc(33.33%-8px)] space-y-2">
            <div class="h-18 w-full bg-dark"></div>
            <div class="w-full h-4 rounded-md line-clamp-1 truncate text-center bg-dark"></div>
        </div>
    </div>
    <div v-if="!isLoading" class="w-full flex flex-wrap sm:gap-4.5 gap-3 justify-center ">
        <div @click="() => {
            pageStore().setParam(country.cca2)
            router.push(`/country/${country.cca2}`)
        }" v-for="(country) in countries" :key="country.flag" class="p-1 cursor-pointer sm:w-[calc(25%-13.5px)] lg:w-[calc(16.6667%-15px)] w-[calc(33.33%-8px)] space-y-2">
            <img :src="country.flags.png" :alt="country.flags.alt" class="object-cover sm:h-18 h-10 w-full rounded-md mx-auto">
            <h3 class="w-full line-clamp-1 truncate max-w-[150px] text-center sm:h3 h4">{{ country.name.common }}</h3>
        </div>
    </div>

</template>
