<script setup lang="ts">
import { ref, computed } from 'vue';

const inputRef = ref<string>("")
const input = computed({
    get: () => inputRef.value,
    set: (newVal) => {
        inputRef.value = newVal
    }
})
</script>
<template>
        <span class="h2 text-very_grey">Found 234 countries</span>
        <fieldset class="bg-dark h-fit flex items-center rounded-md px-2">
            <i class="block size-7 bg-very_grey"></i>
            <input type="text" class="p-2 h3 focus-visible:outline-0 placeholder:text-grey text-very_grey min-w-[345px]"
                placeholder="Search by Name, Region, Subregion" v-model="input">
        </fieldset>
  
</template>
<style scoped>
i {
    mask: url('images/Search.svg') center / contain no-repeat;
    -webkit-mask: url('images/Search.svg') center / contain no-repeat;
}
</style>