<template>
    <div class="flex flex-col h-screen justify-between">
        <Header></Header>
        <main class="flex-grow bg-blue-100">
            <router-view></router-view>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export default {
    components: {
        Header,
        Footer,
    },
};
</script>
