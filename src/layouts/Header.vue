<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="w-full h-fit  min-h-2/5  relative">
        <picture >
            <source media="(max-width: 640px)" srcset="/images/hero-image-sm.jpg">
            <img src="/images/hero-image.jpg" alt="header"  class="w-full h-full object-cover">
        </picture>
        
        <RouterLink to="/">
            <img src="/images/Logo.svg" alt="logo"
                class="sm:h-10 h-5 w-auto aspect-[6] object-cover absolute top-1/2 left-1/2 -translate-1/2">
        </RouterLink>
    </div>
</template>