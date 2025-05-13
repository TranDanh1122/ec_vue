<script setup lang="ts">
interface PaginateProps {
    current: number,
    total: number
}
const emit = defineEmits()
defineProps<PaginateProps>()
const handleChangePage = (page: number) => {
    emit("changePage", page)
}
</script>
<template>
    <div class="flex items-center gap-2">
        <button role="button" @click="handleChangePage(1)" :class="`${current == 1 ? 'text-dark bg-very_grey' : 'text-very_grey border border-very_grey'} 
            size-8 rounded-md cursor-pointer 5`">
            1
        </button>
        <span class="text-very_grey" v-if="current - 1 >= 2">
            ...
        </span>
        <button role="button" v-if="current - 1 > 1" @click="handleChangePage(current - 1)"
            class="size-8 text-very_grey border 4 border-very_grey rounded-md cursor-pointer">
            {{ current - 1 }}
        </button>
        <button role="button" v-if="current != 1 && current != total && current != 1" @click="handleChangePage(current)"
            class="size-8 text-dark 3 bg-very_grey rounded-md cursor-pointer">
            {{ current }}
        </button>
        <button role="button" v-if="current + 1 < total - 1" @click="handleChangePage(current + 1)"
            class="size-8 text-very_grey border border-very_grey rounded-md cursor-pointer">
            {{ current + 1 }}
        </button>
        <span class="text-very_grey" v-if="current <= total - 2">
            ...
        </span>
        <button v-if="total != 1" role="button" @click="handleChangePage(total)" :class="` ${current == total ? 'text-dark bg-very_grey' : 'text-very_grey border border-very_grey'}
             cursor-pointer size-8 rounded-md`">
            {{ total }}</button>
    </div>
</template>