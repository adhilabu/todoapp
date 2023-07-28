<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <DocumentArrowUpIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3"
                                            class="font-semibold leading-6 text-gray-900 pb-7 text-2xl align-bottom">
                                            Task Details</DialogTitle>
                                        <div class="flex flex-col">
                                            <div class="mt-2">
                                                <label>Task title : </label>
                                                <input type="text" id="title" v-model="taskDetails.title"
                                                    class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div><br>
                                            <div>
                                                <label>Task description : </label>
                                                <input type="text" id="description" v-model="taskDetails.description"
                                                    class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div><br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="addTask" ref="cancelButtonRef">Add</button><span class="ml-2"></span>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="closeModallist" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <div v-show="!isEmpty">
        <div class="container p-2 mx-auto sm:p-4 pt-4">
            <h2 class="mb-4 text-2xl font-semibold leading">List of Tasks</h2>
            <div class="overflow-x-auto">
                <table v-show="!isEmpty" class="w-full p-6 text-xs text-left whitespace-nowrap text-white">
                    <colgroup>
                        <col class="w-1/3">
                        <col class="w-1/3">
                        <col class="w-1/3">
                    </colgroup>
                    <thead>
                        <tr class="dark:bg-gray-700">
                            <th class="p-3">Title</th>
                            <th class="p-3">Description</th>
                            <th class="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="border-b dark:bg-gray-900 dark:border-gray-700">
                        <tr v-for="eachtask in tasks" :key="eachtask.id">
                            <td class="px-3 py-2">{{ eachtask.title }}</td>
                            <td class="px-3 py-2">{{ eachtask.description }}</td>
                            <td class="px-3 py-2">
                                <button @click="updateTask(eachtask.id)"
                                    class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Update
                                </button><span class="ml-2"></span>
                                <button @click="deleteTask(eachtask.id)"
                                    class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { DocumentArrowUpIcon } from '@heroicons/vue/24/outline'
import { Task, createDefaultTask } from '@/types';

const taskDetails: Ref<Task> = ref(createDefaultTask());

const prop = defineProps<{
    open: boolean
}>();

const emit = defineEmits(['closeModal','openModal']);

const tasks: Ref<Array<Task>> = ref([]);

const generateRandomId = (): number => {
    const base36String = Math.random().toString(36).substring(2, 9);
    return parseInt(base36String.replace('.', ''), 36);
};

const closeModallist = () => {
    emit('closeModal');
}
const addTask = () => {
    if (!isValidate.value) {
        return false;
    }
    if (taskDetails.value.id == 0) {
        var id = generateRandomId();
        const taskObject: Task = {
            id: id,
            title: taskDetails.value.title,
            description: taskDetails.value.description,
        }
        tasks.value.push(taskObject);
    }
    else {
        const existingTaskIndex = tasks.value.findIndex(task => task.id === taskDetails.value.id);

        if (existingTaskIndex !== -1) {
            tasks.value[existingTaskIndex].title = taskDetails.value.title;
            tasks.value[existingTaskIndex].description = taskDetails.value.description;
        } else {
            tasks.value.push({
                id: taskDetails.value.id,
                title: taskDetails.value.title,
                description: taskDetails.value.description,
            });
        }
    }
    setDefaultValues();
    closeModallist();
}

const updateTask = (updateTaskId: number) => {
    const updateTask = tasks.value.find(taskFilter => taskFilter.id === updateTaskId);
    if (!updateTask) {
        console.error(`Error in finding task for id: ${updateTaskId}`)
        return
    }
    updateTaskDetails(updateTask);
    emit('openModal');
}

const deleteTask = (deleteTaskId: number) => {
    tasks.value = tasks.value.filter(taskFilter => taskFilter.id !== deleteTaskId);
}

const isEmpty = computed(() => {
    return tasks.value.length === 0;
});

const isValidate: ComputedRef<boolean> = computed(() => {
    return taskDetails.value.title !== '' && taskDetails.value.description !== '';
});

const setDefaultValues = () => {
    taskDetails.value.id = 0
    taskDetails.value.title = ''
    taskDetails.value.description = ''
}

const updateTaskDetails = (updateTask: Task) => {
    taskDetails.value.id = updateTask.id
    taskDetails.value.title = updateTask.title
    taskDetails.value.description = updateTask.description
}


</script>

<style lang="scss" scoped></style>