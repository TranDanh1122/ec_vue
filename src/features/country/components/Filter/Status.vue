<script setup lang="ts">
import { CountryStore } from '../../stores/country.store';
const countryStore = CountryStore()
</script>
<template>
    <fieldset class="flex flex-col space-y-2">
        <legend class="h4 text-very_grey w-full text-left">Status</legend>
        <div class="space-y-2">
            <div @click="countryStore.changeStatusFilter('unmember')" class="flex items-center gap-2 cursor-pointer">
                <div role="checkbox" tabindex="0" :aria-checked="countryStore.countryStatus.has('unmember')"
                    aria-label="Country Member of the United Nations" :class="`size-5 rounded-sm   flex items-center justify-center 
                    ${countryStore.countryStatus.has('unmember') ? 'bg-blue' : 'bg-inherit border border-very_grey'}`">
                    <img src="/images/Done_round.svg" alt="checked" class=" size-4 object-cover"
                        v-if="countryStore.countryStatus.has('unmember')">
                </div>
                <span class="h4_bold text-very_grey">Member of the United Nations</span>
            </div>
            <div @click="countryStore.changeStatusFilter('independent')" class="flex items-center gap-2 cursor-pointer">
                <div role="checkbox" tabindex="0" :aria-checked="countryStore.countryStatus.has('independent')"
                    aria-label="Country Independent"
                    :class="`size-5 rounded-sm  flex items-center justify-center 
                    ${countryStore.countryStatus.has('independent') ? 'bg-blue' : 'bg-inherit border border-very_grey'}`">
                    <img src="/images/Done_round.svg" alt="checked" class=" size-4 object-cover"
                        v-if="countryStore.countryStatus.has('independent')">
                </div>
                <span class="h4_bold text-very_grey">Independent</span>
            </div>
        </div>
    </fieldset>
</template>