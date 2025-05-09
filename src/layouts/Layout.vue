<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router';
</script>
<template>
        <Header />
        <div class="bg-very_dark">
        <RouterView />
        </div>
</template>