<script setup lang="ts">
import { TABLE_HEADER } from "@/features/country"

</script>
<template>
    <div class="table w-full" role="table" aria-label="List of country">
        <div class="table-header-group" role="rowgroup" aria-label="Country Table Title">
            <div class="table-row" role="row">
                <div v-for="(head, key) in TABLE_HEADER" :key v-html="head"
                class="table-cell text-very_grey h4 pb-3 border-b-2 border-b-dark text-left" 
                role="columnheader" 
                > 
                </div>
            </div>
        </div>
        <div class="table-row-group" role="rowgroup">
            <div v-for="(country) in countries" class="table-row" role="row">
                <div class="table-cell" role="cell">
                    
                </div>
                <div class="table-cell" role="cell">
                    
                </div>
                <div class="table-cell" role="cell">
                    
                </div>
                <div class="table-cell" role="cell">
                    
                </div>

            </div>
           
        </div>
    </div>
</template>