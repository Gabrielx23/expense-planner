import Vue from 'vue'
import VueRouter from 'vue-router'
import {authRoutes} from "@/router/auth";
import {auth} from "@/plugins/firebase";
import {appRoutes} from "@/router/app";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
      ...authRoutes,
      ...appRoutes
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
        return;
    }

    if (!requiresAuth && auth.currentUser) {
        next('/')
        return;
    }

    next()
})

export default router
