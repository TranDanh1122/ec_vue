<script setup lang="ts">
import { pageStore } from '@/stores/page.store';
import { fetchNeighBouringCountries } from '../services/country.svc';
import { useRouter } from 'vue-router';
const props = defineProps<{ neighborCodes: string[], countryCode: string }>()
const { data: countries, isLoading } = fetchNeighBouringCountries(props.neighborCodes, props.countryCode)
const router = useRouter()
</script>
<template>
    <div v-if="isLoading" class="w-full flex flex-wrap gap-4 justify-center">
        <div v-for="(_, key) in Array.from({length: 5 })" :key class="p-1 cursor-pointer w-1/6 space-y-2">
            <div class="h-18 w-full bg-dark"></div>
            <div class="w-full h-4 rounded-md line-clamp-1 truncate text-center bg-dark"></div>
        </div>
    </div>
    <div v-if="!isLoading" class="w-full flex flex-wrap gap-4 justify-center ">
        <div @click="() => {
            pageStore().setParam(country.cca2)
            router.push(`/country/${country.cca2}`)
        }" v-for="(country) in countries" :key="country.flag" class="p-1 cursor-pointer w-1/6 space-y-2">
            <img :src="country.flags.png" :alt="country.flags.alt" class="object-cover h-18 w-auto rounded-md mx-auto">
            <h3 class="w-full line-clamp-1 truncate text-center">{{ country.name.common }}</h3>
        </div>
    </div>

</template>
