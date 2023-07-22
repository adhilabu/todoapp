<template>
    <div>
        <button @click="addTask" :disabled="!isValidate" class="btn">Add Task</button>
        <div v-show="isEmpty">
            <h2 class="text-3xl pb-6 pt-6">Items are empty, Please add tasks.</h2>
        </div>
        <div v-show="!isEmpty" class="pb-6 text-3xl pt-6 font-bold">
            <h2>List</h2>
        </div>
        <table v-show="!isEmpty" class="min-w-full text-left text-sm font-light">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="eachtask in tasks" :key="eachtask.id">
                    <td>{{ eachtask.title }}</td>
                    <td>{{ eachtask.description }}</td>
                    <td>
                        <button @click="updateTask(eachtask.id)" class="btn-primary">Update</button>
                        <button @click="deleteTask(eachtask.id)" class="btn-primary">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const prop = defineProps({
    taskDetails: Object,
    isValidate: Boolean,
});

const emit = defineEmits(['addTask', 'updateParentTask']);

const tasks = ref([]);

const addTask = () => {
    if (!prop.isValidate) {
        return false;
    }
    if (prop.taskDetails.id == 0) {
        var id = Math.random().toString(36).substring(2, 9);
        const taskObject = {
            id: id,
            title: prop.taskDetails.title,
            description: prop.taskDetails.description,
        }
        tasks.value.push(taskObject);
    }
    else {
        const existingTaskIndex = tasks.value.findIndex(task => task.id === prop.taskDetails.id);

        if (existingTaskIndex !== -1) {
            tasks.value[existingTaskIndex].title = prop.taskDetails.title;
            tasks.value[existingTaskIndex].description = prop.taskDetails.description;
        } else {
            tasks.value.push({
                id: prop.taskDetails.id,
                title: prop.taskDetails.title,
                description: prop.taskDetails.description,
            });
        }
    }
    emit('addTask');
}

const updateTask = (updateTaskId) => {
    const updateTask = tasks.value.filter(taskFilter => taskFilter.id === updateTaskId);
    emit('updateParentTask', updateTask)
}

const deleteTask = (deleteTaskId) => {
    tasks.value = tasks.value.filter(taskFilter => taskFilter.id !== deleteTaskId);
}

const isEmpty = computed(() => {
    return tasks.value.length === 0;
});

</script>

<style lang="scss" scoped></style>