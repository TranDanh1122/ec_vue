<script setup lang="ts">
import Search from '../components/Search.vue';
import Filter from "../components/Filter/Filter.vue"
import CountryTable from "../components/Table/CountryTable.vue"
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { CountryStore } from '../stores/country.store'
import { fetchAllCountries } from "../services/country.svc"
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
        gap-3.5 gap-y-10 sm:container w-[95%] sm:w-full mx-auto border-grey sm:-translate-y-15 -translate-y-10 transform-gpu will-change
        border rounded-xl shadow-md shadow-dark p-6">
        <div class="col-span-4 text-center flex sm:flex-row flex-col sm:items-center items-start justify-between h-fit gap-2">
            <Search />
        </div>
        <div class="text-center space-y-6 col-span-4 sm:col-span-1">
            <Filter />
        </div>
        <div class="col-span-4 sm:col-span-3 text-center ">
            <CountryTable />
        </div>
    </div>
</template>
<style scoped></style>
