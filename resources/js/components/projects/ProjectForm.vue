<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name" class="sr-only">Name</label>
                <input
                    v-model="name"
                    id="name"
                    name="name"
                    type="text"
                    class="appearance-none rounded-none relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="name"
                />
            </div>
            <p v-if="errorMsg.length" class="text-red-500 text-ms italic">
                {{ errorMsg }}
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
</template>

<script>
export default {
    data() {
        return {
            name: "",
            errorMsg: "",
        };
    },
    methods: {
        cancelForm() {
            this.name = "";
            this.errorMsg = "";
            this.$emit("cancel-form");
        },

        async handleSubmit() {
            try {
                const response = await axios.post("api/projects", {
                    name: this.name,
                });
                if (response.data.status == "OK") {
                    this.name = "";
                    this.errorMsg = "";
                    this.$emit("project-added");
                }
            } catch (e) {
                if (e.response.data.error.name[0].length > 0) {
                    this.errorMsg = e.response.data.error.name[0];
                }
            }
        },
    },
};
</script>
