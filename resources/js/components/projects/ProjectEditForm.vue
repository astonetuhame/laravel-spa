<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name" class="sr-only">Name</label>
                <input
                    v-model="projectName"
                    type="text"
                    class="appearance-none rounded-none relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
            </div>
            <p v-if="errorMsg.length" class="mb-2 text-red-500 text-ms italic">
                {{ errorMsg }}
            </p>
            <div>
                <button
                    type="submit"
                    class="mr-2 mb-3 group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
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
</template>

<script>
export default {
    props: ["project"],
    data() {
        return {
            projectName: this.project.name,
            errorMsg: "",
        };
    },
    methods: {
        cancelForm() {
            this.projectName = "";
            this.errorMsg = "";
            this.$emit("cancel-form");
        },

        async handleSubmit() {
            try {
                const response = await axios.put(
                    `http://localhost:8000/api/projects/${this.$route.params.id}`,

                    {
                        name: this.projectName,
                    }
                );
                if (response.data.status == "OK") {
                    this.name = "";
                    this.errorMsg = "";
                    this.$emit("project-edited");
                }
            } catch (e) {
                if (e.response.data.errors.name[0].length > 0) {
                    this.errorMsg = e.response.data.errors.name[0];
                }
            }
        },
    },
};
</script>
