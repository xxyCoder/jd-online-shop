import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';
import HomeView from '@/views/Home-view.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/User-view.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart-view.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login-view.vue'),
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/registry',
        name: 'registry',
        component: () => import('../views/Registry-view.vue'),
        meta: {
            requireAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 开启全局路由
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.state.token) {    // 需要登录状态并且有token，那么可以跳转
        next('/login');
    } else {
        next();
    }
})

export default router;