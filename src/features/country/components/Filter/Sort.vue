<script setup lang="ts">

</script>
<template>
    <fieldset class="flex flex-col items-start gap-2">
        <label for="sort" class="h4 text-very_grey">Sort by</label>
        <div class="relative w-full">
            <select
                class="cursor-pointer h4_bold bg-very_dark w-full appearance-none text-very_grey border-2 border-dark p-2 rounded-lg focus-visible:outline-0"
                id="sort">
                <option value="population">Population</option>
                <option value="name">Name</option>
                <option value="area">Area (km<sup>2</sup>)</option>
            </select>
            <i class="size-3 block bg-very_grey absolute top-1/2 -translate-y-1/2 right-2"></i>
        </div>
    </fieldset>
</template>
<style scoped>
i {
    mask: url("images/Expand_down.svg");
    -webkit-mask: url("images/Expand_down.svg");
}
</style>