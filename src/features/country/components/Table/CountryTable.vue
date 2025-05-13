<script setup lang="ts">
import { Paginate } from "@/components/"
import { TABLE_HEADER } from "../../ults/const"
import { CountryStore } from "../../stores/country.store"
import { useRouter } from "vue-router"
import { pageStore } from "@/stores/page.store"
const countryStore = CountryStore()
const router = useRouter()
</script>
<template>
    <div class="w-full space-y-2 sm:overflow-hidden overflow-x-auto">
        <div class="table w-full" role="table" aria-label="List of country">
            <div class="table-header-group" role="rowgroup" aria-label="Country Table Title">
                <div class="table-row" role="row">
                    <div v-for="(head, key) in TABLE_HEADER" :key v-html="head"
                        class="table-cell text-very_grey h4 pb-3 border-b-2 border-b-dark text-left px-1 line-clamp-1 truncate max-w-[100px]"
                        role="columnheader">
                    </div>
                </div>
            </div>
            <div class="table-row-group" role="rowgroup">
                <div @click="() => {
                    pageStore().setParam(country.cca2)
                    router.push(`/country/${country.cca2}`)
                }" v-for="(country) in countryStore.paginatedCountries" :key="country.flag"
                    class="table-row row-body text-very_grey text-left rounded-md cursor-pointer hover:bg-dark"
                    role="row">
                    <div class="table-cell align-middle py-1.5 px-1" role="cell">
                        <img :src="country.flags.png" :alt="country.flags.alt" class="object-cover h-6 w-8 rounded-md">
                    </div>
                    <div class="table-cell align-middle py-1 px-1 line-clamp-1 truncate max-w-[100px] sm:h3 h4" role="cell">
                        {{ country.name.common }}
                    </div>
                    <div class="table-cell align-middle py-1 px-1 sm:h3 h4" role="cell">
                        {{ country.population.toLocaleString() }}
                    </div>
                    <div class="table-cell align-middle py-1 px-1 sm:h3 h4" role="cell">
                        {{ country.area }}
                    </div>
                    <div class="table-cell align-middle py-1 px-1 sm:h3 h4" role="cell">
                        {{ country.region }}
                    </div>
                </div>
            </div>
        </div>
      
    </div>
    <div class="flex items-center justify-center mt-4">
            <Paginate :current="countryStore.paginate.page" :total="countryStore.totalPage"
                @changePage="(page: number) => countryStore.changePage(page)" />

        </div>
</template>
<style scoped>
.row-body:hover {
    transform: scale(1.01);
    transition: all 0.3s ease;
}
</style>