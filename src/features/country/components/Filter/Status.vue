<script setup lang="ts">
</script>
<template>
    <fieldset class="flex flex-col space-y-2">
        <legend class="h4 text-very_grey w-full text-left">Status</legend>
        <div class="space-y-2">
            <div class="flex items-center gap-2" role="checkbox-group">
                <div role="checkbox" tabindex="0" aria-checked="true"
                    class="size-5 rounded-sm border border-very_grey flex items-center justify-center">
                    <!-- <img src="/images/Done_round.svg" alt="checked" class=" size-4 object-cover"> -->
                </div>
                <span class="h4_bold text-very_grey">Member of the United Nations</span>
            </div>
            <div class="flex items-center gap-2" role="checkbox-group">
                <div role="checkbox" tabindex="0" aria-checked="true"
                    class="size-5 rounded-sm  flex items-center justify-center bg-blue">
                    <img src="/images/Done_round.svg" alt="checked" class=" size-4 object-cover">
                </div>
                <span class="h4_bold text-very_grey">Independent</span>
            </div>
        </div>
    </fieldset>
</template>