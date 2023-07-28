<template>
    <div class="flex flex-col items-center justify-center">
        <div class="w-3/4">
            <Todolist :open="open" @closeModal="closeModal" @openModal="openModal"></Todolist>
        </div>
        <div class="pt-5">
            <button type="button"
                class="inline-flex rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto bg-green-600"
                @click="open = true">Add Task</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Task, createDefaultTask } from '@/types';

const taskDetails: Ref<Task> = ref(createDefaultTask());

const open: Ref<boolean> = ref(false);

const closeModal = () => {
    open.value = false;
}

const openModal = () => {
    open.value = true;
}

</script>

<style lang="scss" scoped></style>