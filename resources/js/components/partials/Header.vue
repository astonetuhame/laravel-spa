<template>
    <header class="min-h-10 bg-blue-800 flex justify-between items-center">
        <h1 class="text-4xl ml-6 text-white">Projectify</h1>
        <ul class="flex">
            <li class="mr-6" v-if="authenticated">
                <router-link
                    :to="{ name: 'dashboard' }"
                    class="text-blue-600 hover:text-white"
                    >Dashboard</router-link
                >
            </li>
            <li class="mr-6" v-if="authenticated">
                <router-link
                    :to="{ name: 'projects' }"
                    class="text-blue-600 hover:text-white"
                    >Projects</router-link
                >
            </li>
            <li class="mr-6" v-if="!authenticated">
                <router-link
                    :to="{ name: 'login' }"
                    class="text-blue-600 hover:text-white"
                    >Login</router-link
                >
            </li>
            <li class="mr-6" v-if="authenticated">
                <router-link
                    :to="{ name: 'dashboard' }"
                    class="text-blue-600 hover:text-white"
                    @click="handleLogout()"
                    >Logout</router-link
                >
            </li>
        </ul>
    </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["authenticated"]),
    },
    methods: {
        async handleLogout(){
            await this.$store.dispatch('logout');
            this.$router.push({name:'login'})
        }
    }
};
</script>
