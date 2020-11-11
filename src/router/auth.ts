import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export const authRoutes: Array<RouteConfig>  = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
];