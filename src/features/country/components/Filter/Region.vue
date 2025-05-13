<script setup lang="ts">
import { CountryStore } from "../../stores/country.store";
import { REGIONS } from "../../ults/const"
const countryStore = CountryStore()
</script>
<template>
    <div class=" flex items-start flex-col gap-2 ">
        <label class="h4 text-very_grey">Region</label>
        <div class="flex flex-wrap items-center gap-2">
            <span v-for="(region) in REGIONS" :key="region" @click="countryStore.changeRegionFilter(region)"
                :class="`h4 text-very_grey w-fit px-2 py-2.5 ${countryStore.regions.has(region) ? 'bg-dark' : 'bg-inherit'} rounded-xl cursor-pointer capitalize`">
                {{ region }}</span>
        </div>
    </div>
</template>