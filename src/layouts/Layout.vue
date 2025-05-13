<script setup lang="ts">
import Header from './Header.vue';
import { RouterView } from 'vue-router';
</script>
<template>
        <div class="flex flex-col h-full min-h-screen">
                <Header v-once />
                <div class="bg-very_dark w-full flex-1">
                        <RouterView :key="$route.fullPath" v-slot="{ Component }">
                                <Suspense>
                                        <template #default>
                                                <component :is="Component"></component>
                                        </template>
                                        <template #fallback>
                                                <div
                                                        class="fixed w-screen h-screen top-0 left-0 bg-very_dark flex items-center justify-center text-white h4 sm:px-0 px-2">
                                                        Pls wait for my API, it's like you—just a few seconds, or maybe
                                                        shorter...
                                                </div>
                                        </template>
                                </Suspense>
                        </RouterView>
                </div>
        </div>

</template>