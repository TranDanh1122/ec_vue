<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router';
import { Suspense } from "vue"
</script>
<template>
        <div class="flex flex-col h-full">
        <Header />
        <div class="bg-very_dark w-full h-full">
                <RouterView v-slot="{ Component }">
                        <Suspense>
                                <template #default>
                                        <component :is="Component"></component>
                                </template>
                                <template #fallback>
                                        <div
                                                class="fixed w-screen h-screen top-0 left-0 bg-black flex items-center justify-center text-white">
                                                Pls wait for my API, it's like you—just a few seconds, or maybe shorter...
                                        </div>
                                </template>
                        </Suspense>
                </RouterView>
        </div>
</div>

</template>