import { createRouter, createWebHistory } from "vue-router";
import Signin from "./components/auth/Signin.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";
import Projects from "./components/projects/Projects.vue";
import ProjectDetail from "./components/projects/ProjectDetail.vue";
import store from "./store/index";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Signin, name: "home" },
        { path: "/login", component: Signin, name: "login", alias: "/" },
        {
            path: "/dashboard",
            component: Dashboard,
            name: "dashboard",
            meta: { requiresAuth: true },
        },
        {
            path: "/projects",
            component: Projects,
            name: "projects",
            meta: { requiresAuth: true },
        },
        {
            path: "/projects/:id",
            component: ProjectDetail,
            name: "project-detail",
            meta: { requiresAuth: true },
            // props: true,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.authenticated) {
            next({ name: "login" });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
