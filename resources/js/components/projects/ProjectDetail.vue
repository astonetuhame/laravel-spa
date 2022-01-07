<template>
    <div class="p-4 m-4 bg-white rounded flex flex-col">
        <div class="flex justify-between">
            <h1 class="text-2xl text-gray-700">
                Project Detail # {{ `${this.$route.params.id}` }}
            </h1>
            <div>
                <button
                    @click="showForm = true"
                    class="bg-orange-500 rounded text-white px-3 py-2 mr-6 hover:bg-orange-700"
                >
                    Edit Project
                </button>
                <button
                    @click="deleteProject"
                    class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-gray-700"
                >
                    Delete Project
                </button>
            </div>
        </div>
        <div v-show="showForm" class="flex justify-center">
            <ProjectEditForm
                :project="project"
                @project-edited="fetchProject"
                @cancel-form="showForm = false"
            />
        </div>
        <div class="mt-6">
            <div class="flex">
                <div class="w-1/6 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        Project Name
                    </div>
                </div>
                <div class="w-1/2 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        {{ project.name }}
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-1/6 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        Created Date
                    </div>
                </div>
                <div class="w-1/2 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        {{ project.created_at }}
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-1/6 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        Updated Date
                    </div>
                </div>
                <div class="w-1/2 p-2">
                    <div class="bg-gray-400 text-gray-700 p-2 text-left">
                        {{ project.updated_at }}
                    </div>
                </div>
            </div>
            <div class="my-4">
                <div class="flex justify-between">
                    <h2 class="text-2xl text-gray-600 mb-4">Tasks</h2>

                    <button
                        @click="addTask"
                        class="mb-4 bg-blue-500 rounded text-white px-3 py-2 mr-6 hover:bg-blue-700"
                    >
                        Add Task
                    </button>
                </div>
                <div v-show="showTaskForm" class="flex justify-center mb-6">
                    <div>
                        <form @submit.prevent="handleTaskSubmit">
                            <div>
                                <input
                                    v-model="task.name"
                                    type="text"
                                    class="appearance-none rounded-none relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="name"
                                />
                            </div>
                            <p
                                v-if="taskErrMsg.length"
                                class="mb-3 text-red-500 text-ms italic"
                            >
                                {{ taskErrMsg }}
                            </p>
                            <div>
                                <button
                                    type="submit"
                                    class="mr-2 mb-3 group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add
                                </button>
                                <button
                                    @click="cancelForm"
                                    type="button"
                                    class="mb-3 group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <TaskItem
                    @edit-task="editTask"
                    @delete-task="deleteTask"
                    v-for="task in project.tasks"
                    :key="task.id"
                    :task="task"
                />
            </div>
        </div>
    </div>
    <!-- {{ project }} -->
</template>

<script>
import TaskItem from "./TaskItem.vue";
import ProjectEditForm from "./ProjectEditForm.vue";
export default {
    props: ["id"],
    components: {
        TaskItem,
        ProjectEditForm,
    },
    data() {
        return {
            project: [],
            showForm: false,
            showTaskForm: false,
            task: {
                name: "",
                project_id: this.id,
            },
            taskErrMsg: "",
            taskId: 0,
        };
    },
    methods: {
        deleteProject() {
            axios
                .delete(
                    `http://localhost:8000/api/projects/${this.$route.params.id}`
                )
                .then((res) => {
                    this.$router.push({ name: "projects" });
                });
        },
        fetchProject() {
            this.showForm = false;
            axios
                .get(
                    `http://localhost:8000/api/projects/${this.$route.params.id}`
                )
                .then((res) => {
                    this.project = res.data.data;
                    // console.log(res);
                });
        },
        deleteTask(id) {
            axios
                .delete("http://localhost:8000/api/tasks/" + id)
                .then((res) => {
                    const index = this.project.tasks
                        .map((i) => i.id)
                        .indexOf(id);
                    this.project.tasks.splice(index, 1);
                });
        },
        addTask() {
            (this.showTaskForm = true),
                (this.task.name = ""),
                (this.taskErrMsg = "");
        },
        editTask(id) {
            const task = this.project.tasks.filter((i) => i.id == id);
            this.showTaskForm = true;
            this.task.name = task[0].name;
            this.taskErrMsg = "";
            this.taskId = id;
        },
        cancelForm() {
            this.showTaskForm = false;
            this.taskErrMsg = "";
        },
        async handleTaskSubmit() {
            if (this.taskId > 0) {
                try {
                    const response = await axios.put(
                        "http://localhost:8000/api/tasks/" + this.taskId,
                        this.task
                    );
                    if (response.data.status == "OK") {
                        const index = this.project.tasks
                            .map((i) => i.id)
                            .indexOf(this.taskId);
                        this.project.tasks.splice(index, 1, response.data.data);
                        this.showTaskForm = false;
                        this.taskErrMsg = "";
                    }
                } catch (e) {
                    if (e.response.data.errors.name[0].length > 0) {
                        this.taskErrMsg = e.response.data.errors.name[0];
                    }
                }
            } else {
                try {
                    const response = await axios.post(
                        "http://localhost:8000/api/tasks/",
                        this.task
                    );
                    if (response.data.status == "OK") {
                        this.project.tasks.push(response.data.data);
                        this.showTaskForm = false;
                        this.taskErrMsg = "";
                    }
                } catch (e) {
                    if (e.response.data.errors.name[0].length > 0) {
                        this.taskErrMsg = e.response.data.errors.name[0];
                    }
                }
            }
        },
    },
    mounted() {
        this.fetchProject();

        // async axios.get("api/projects/" + this.id)
        // cons res = await
        //     console.log(res);
        // });
    },
};
</script>
