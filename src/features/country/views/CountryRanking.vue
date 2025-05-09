<script setup lang="ts">
import { Search, Filter, Table } from '@/features/country';
</script>
<template>
    <div
        class="grid grid-cols-4 grid-rows-[max-content_auto] gap-3.5 gap-y-10 container mx-auto border-grey border rounded-xl shadow-md shadow-dark p-6">
        <div class="col-span-4 text-center flex items-center justify-between h-fit">
            <Search />
        </div>
        <div class="text-center space-y-6">
            <Filter />
        </div>
        <div class="col-span-3 text-center ">
            <Table />
        </div>
    </div>
</template>
<style scoped></style>
