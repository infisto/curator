import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store/store";
import AppWeather from "@/components/AppWeather";
import AppToDo from "@/components/AppToDo";
import AppAuth from "@/components/AppAuth";
import Templates from "@/components/Templates";
import AppRegistration from "@/components/AppRegistration";
import AppRequests from "@/components/AppRequests";
import NotFound404 from "@/components/NotFound404";
import AppResetPassword from "@/components/AppResetPassword";
import Chat from "../components/Chat";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/templates',
            component: Templates,
            meta: {
                layout: 'main',
                auth: true
            }
        },
        {
            path: '/requests',
            component: AppRequests,
            meta: {
                layout: 'main',
                auth: true
            }
        },
        {
            path: '/weather',
            component: AppWeather,
            meta: {
                layout: 'main',
                auth: true
            }
        },
        {
            path: '/chat',
            component: Chat,
            meta: {
                layout: 'main',
                auth: true
            }
        },
        {
            path: '/todo',
            component: AppToDo,
            meta: {
                layout: 'main',
                auth: true
            }
        },
        {
            path: '/auth',
            alias: '/',
            component: AppAuth,
            meta: {
                layout: 'auth',
                auth: false
            }
        },
        {
            path: '/registration',
            component: AppRegistration,
            meta: {
                layout: 'auth',
                auth: false
            }
        },
        {
            path: '/resetPassword',
            component: AppResetPassword,
            meta: {
                layout: 'auth',
                auth: false
            }
        },
        {
            path: "/:pathMatch(.*)*",
            component: NotFound404,
            meta: {
                layout: 'main',
                auth: true
            }
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth
    if (requireAuth && store.getters.isAuthenticated) {
        next()
    } else if (requireAuth && !store.getters.isAuthenticated) {
        next('/auth?message=auth')
    } else {
        next()
    }
})

export default router