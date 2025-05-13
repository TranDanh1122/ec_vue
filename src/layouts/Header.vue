<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="w-full h-fit relative">
        <img src="/images/hero-image.jpg" alt="header" class="w-full object-cover">
        <RouterLink to="/">
            <img src="/images/Logo.svg" alt="logo" class="h-10 w-auto aspect-[6] object-cover absolute top-1/2 left-1/2 -translate-1/2">
        </RouterLink>
    </div>
</template>