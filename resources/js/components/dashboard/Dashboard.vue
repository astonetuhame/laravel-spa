<template>
    <div class="p-4 m-4 bg-white rounded flex">
        <div>
            <h1 class="text-2xl text-gray-700">Dashboard</h1>
            <p class="mt-4">
                Hello <span class="font-bold">{{ user.name }}</span> Welcome to
                the Dashboard. You have registered with the email
                <span class="italic"> {{ user.email }}</span>
            </p>
            <p class="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea et
                dolorem incidunt pariatur repudiandae impedit alias. Quos
                recusandae a consequatur iste natus harum sapiente corporis
                eligendi, dicta rerum veritatis sunt?
            </p>
            <p class="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea et
                dolorem incidunt pariatur repudiandae impedit alias. Quos
                recusandae a consequatur iste natus harum sapiente corporis
                eligendi, dicta rerum veritatis sunt?
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["user"]),
    },
};
</script>
