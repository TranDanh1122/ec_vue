<script setup lang="ts">
import { ref, watch } from 'vue';
import { CountryStore } from '@/features/country';
import  debounce  from "lodash.debounce"
const inputRef = ref<string>("")
const countryStore = CountryStore()
const debouceSearch = debounce(() => {
    countryStore.searching(inputRef.value)
}, 300)
watch(inputRef,() => {
    debouceSearch()
})

</script>
<template>
    <span class="h2 text-very_grey">Found {{ countryStore.total }} countries</span>
    <fieldset class="bg-dark h-fit flex items-center rounded-md px-2">
        <i class="block size-7 bg-very_grey"></i>
        <input type="text" class="p-2 h3 focus-visible:outline-0 placeholder:text-grey text-very_grey min-w-[345px]"
            placeholder="Search by Name, Region, Subregion" v-model="inputRef">
    </fieldset>

</template>
<style scoped>
i {
    mask: url('images/Search.svg') center / contain no-repeat;
    -webkit-mask: url('images/Search.svg') center / contain no-repeat;
}
</style>