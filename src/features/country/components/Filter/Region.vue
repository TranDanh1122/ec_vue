<script setup lang="ts">
import { REGIONS } from "@/features/country";

</script>
<template>
    <div class=" flex items-start flex-col gap-2 ">
        <label class="h4 text-very_grey">Region</label>
        <div class="flex flex-wrap items-center gap-2">
            <span v-for="(region) in REGIONS" :key="region"
                class="h4 text-very_grey w-fit px-2 py-2.5 bg-dark rounded-xl ">
                {{ region }}</span>
        </div>
    </div>
</template>