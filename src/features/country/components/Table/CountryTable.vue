<script setup lang="ts">
import { TABLE_HEADER, CountryStore } from "@/features/country"
const countryStore = CountryStore()

</script>
<template>
    <div class="table w-full" role="table" aria-label="List of country">
        <div class="table-header-group" role="rowgroup" aria-label="Country Table Title">
            <div class="table-row" role="row">
                <div v-for="(head, key) in TABLE_HEADER" :key v-html="head"
                    class="table-cell text-very_grey h4 pb-3 border-b-2 border-b-dark text-left" role="columnheader">
                </div>
            </div>
        </div>
        <div class="table-row-group" role="rowgroup">
            <div v-for="(country) in countryStore.paginatedCountries" 
            class="table-row row-body text-very_grey text-left rounded-md cursor-pointer hover:bg-dark" role="row">
                <div class="table-cell align-middle py-1 pl-1" role="cell">
                    <img :src="country.flags.png" :alt="country.name.common" class="object-cover h-6 w-8 rounded-md">
                </div>
                <div class="table-cell align-middle py-1" role="cell">
                    {{ country.name.common }}
                </div>
                <div class="table-cell align-middle py-1" role="cell">
                    {{ country.population.toLocaleString() }}
                </div>
                <div class="table-cell align-middle py-1" role="cell">
                    {{ country.area }}
                </div>
                <div class="table-cell align-middle py-1" role="cell">
                    {{ country.region }}
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.row-body:hover {
    transform: scale(1.01);
    transition: all 0.3s ease;
}
</style>