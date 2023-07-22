<template>
    <h1 class="font-bold pb-6 text-5xl pt-6"> TO DO LIST</h1>
    <div v-show="!isValidate" clas>
        <h3 class="text-lg text-red-600 font-thin italic">type valid task details.............</h3>
    </div><br>
    <div>
        <div class="flex flex-col">
            <div>
                <label>Task title : </label>
                <input type="text" id="title" v-model="taskDetails.title" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div><br>
            <div>
                <label>Task description : </label>
                <input type="text" id="description" v-model="taskDetails.description" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div><br>
        </div>
    </div>

    <Todolist :isValidate="isValidate" :taskDetails="taskDetails" @addTask="handleChildClick" @updateParentTask="updateTaskDetails"></Todolist>
</template>

<script setup lang="ts">

const taskDetails = ref({
  id: 0,
  title: '',
  description: '',
});

const handleChildClick =  () => {
    taskDetails.value.id = 0
    taskDetails.value.title = ''
    taskDetails.value.description = ''
}

const updateTaskDetails =  (task: Array<{ id: number; title: string; description: string; }>) => {
    const updateTask = task[0];
    taskDetails.value.id = updateTask.id
    taskDetails.value.title = updateTask.title
    taskDetails.value.description = updateTask.description
}

const isValidate = computed(() => {
    if (taskDetails.value.title == '' || taskDetails.value.description == '') {
        return false;
    } else {
        return true
    }
});

</script>

<style lang="scss" scoped></style>