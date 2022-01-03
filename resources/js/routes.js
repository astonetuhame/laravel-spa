import { createRouter, createWebHistory } from "vue-router";
import Signin from "./components/auth/Signin.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";
import Project from "./components/projects/Project.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", component: Signin, name: "login" },
        { path: "/dashboard", component: Dashboard, name: "dashboard" },
        { path: "/projects", component: Project, name: "projects" },
    ],
});

export default router;
