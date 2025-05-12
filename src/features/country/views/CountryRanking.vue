<script setup lang="ts">
import { Search, Filter, CountryTable, fetchAllCountries, CountryStore } from '@/features/country';
import { storeToRefs } from 'pinia';
import {  watchEffect } from 'vue';
const countryStore = CountryStore()
const { sortBy } = storeToRefs(countryStore)
const { data, isLoading } = fetchAllCountries(sortBy)
watchEffect(() => {
    if (data.value) countryStore.setCountries(data.value)
    
})
watchEffect(() => {
    countryStore.loadingTable(isLoading.value)
})
</script>
<template>
    <div class="grid grid-cols-4 grid-rows-[max-content_auto] bg-very_dark
        gap-3.5 gap-y-10 container mx-auto border-grey -translate-y-10 
        border rounded-xl shadow-md shadow-dark p-6">
        <div class="col-span-4 text-center flex items-center justify-between h-fit">
            <Search />
        </div>
        <div class="text-center space-y-6">
            <Filter />
        </div>
        <div class="col-span-3 text-center ">
            <CountryTable />
        </div>
    </div>
</template>
<style scoped></style>
