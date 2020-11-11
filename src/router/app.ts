import Dashboard from "@/views/Dashboard.vue";
import {RouteConfig} from "vue-router";
import AddPrediction from "@/views/AddPrediction.vue";

export const appRoutes: Array<RouteConfig>  = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/predictions/add',
        name: 'Add prediction',
        component: AddPrediction,
        meta: {
            requiresAuth: true
        }
    },
];