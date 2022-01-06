<template>
    <div class="p-4 m-4 bg-white rounded flex flex-col">
        <div class="flex justify-between">
            <h1 class="text-2xl text-gray-700">
                Project Detail # {{ `${this.$route.params.id}` }}
            </h1>
            <button
                @click="deleteProject"
                class="bg-red-500 rounded text-white px-3 py-2 mr-6 hover:bg-gray-700"
            >
                Delete Project
            </button>
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
            <!-- <div v-if="project.tasks.length > 0" class="my-4">
                {{ project.tasks }}
            </div> -->
        </div>
    </div>
    <!-- {{ project }} -->
</template>

<script>
export default {
    // props: ["id"],
    data() {
        return {
            project: [],
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
    },
    mounted() {
        axios
            .get(`http://localhost:8000/api/projects/${this.$route.params.id}`)
            .then((res) => {
                this.project = res.data.data;
                // console.log(res);
            });

        // async axios.get("api/projects/" + this.id)
        // cons res = await
        //     console.log(res);
        // });
    },
};
</script>
