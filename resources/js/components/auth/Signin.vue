<template>
    <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
    <div class="flex w-full h-full items-center justify-center">
        <form @submit.prevent="handleLogin" class="w-1/3 h-1/2 mt-8 space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
                <h1 class="text-center font-bold text-gray-700 text-3xl">
                    Login Form
                </h1>
                <div>
                    <label for="email-address" class="sr-only"
                        >Email address</label
                    >
                    <input
                        v-model="email"
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        class="appearance-none rounded-none relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        v-model="password"
                        id="password"
                        name="password"
                        type="password"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
                <p v-if="errorMsg.length" class="text-red-500 text-ms italic">
                    {{ errorMsg }}
                </p>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span
                        class="absolute left-0 inset-y-0 flex items-center pl-3"
                    >
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg
                            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                    Sign in
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMsg: "",
        };
    },
    // computed: {
    //     ...mapGetters(["authenticated"]),
    // },
    methods: {
        async handleLogin() {
            this.errorMsg = "";

            //Action here
            try {
                await this.$store.dispatch("signIn", {
                    email: this.email,
                    password: this.password,
                });
                this.$router.push({ name: "dashboard" });
            } catch (e) {
                this.errorMsg = e;
            }
        },
    },
    // mounted() {
    //     if (this.authenticated) {
    //         this.$router.push({ name: "dashboard" });
    //     }
    // },
};
</script>
