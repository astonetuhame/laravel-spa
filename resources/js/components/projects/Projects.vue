<template>
    <div class="p-4 m-4 bg-white rounded flex flex-col">
        <div class="flex justify-between">
            <h1 class="text-2xl text-gray-700">Projects</h1>
            <button
                class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-gray-700"
            >
                Add Project
            </button>
        </div>
        <div class="justify-center flex">
            <table class="table-auto justify-center">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">ID</th>
                        <th class="border px-4 py-2">Name</th>
                        <th class="border px-4 py-2">Tasks</th>
                        <th class="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ProjectItem
                        v-for="project in projects"
                        :key="project.id"
                        :project="project"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ProjectItem from "./ProjectItem.vue";
export default {
    components: {
        ProjectItem,
    },
    data() {
        return {
            projects: [],
        };
    },
    mounted() {
        axios.get("api/projects").then((res) => {
            this.projects = res.data.data;
        });
    },
};
</script>
