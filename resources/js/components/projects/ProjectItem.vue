<template>
    <tr>
        <td class="border px-4 py-2">{{ project.id }}</td>
        <td class="border px-4 py-2">{{ project.name }}</td>
        <td class="border px-4 py-2">
            {{ project.tasks_count }}
        </td>
        <td class="border px-4 py-2">
            <router-link
                :to="{ name: 'project-detail', params: { id: project.id } }"
                class="text-blue-600 hover:text-white"
            >
                <button
                    class="bg-gray-500 rounded text-white px-3 py-2 mr-2 hover:bg-gray-700"
                >
                    View
                </button>
            </router-link>
            <button
                @click="deleteProject(project.id)"
                class="bg-red-500 rounded text-white px-3 py-2 mr-2 hover:bg-gray-700"
            >
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: ["project"],
    methods: {
        deleteProject(id) {
            axios.delete(`api/projects/${id}`).then((res) => {
                this.$emit("project-deleted");
            });
        },
    },
};
</script>
