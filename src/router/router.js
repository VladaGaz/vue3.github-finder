import App from "@/App";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: App
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;