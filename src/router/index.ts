import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';
import HomeView from '@/views/Home-view.vue'
import GoodView from '@/views/Good-view.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requireAuth: false
        },
        children: [
            {
                path: '',   // 为空，表示默认显示该子路由
                name: 'good',
                component: GoodView
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
                path: '/goods',
                name: 'goods',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/views/Goods-view.vue'),
                children: [
                    {
                        path: '',
                        name: 'myGood',
                        component: () => import('@/views/MyGood-view.vue')
                    },
                    {
                        path: '/goods/modify',
                        name: 'modifyGood',
                        component: () => import('@/views/Modify-view.vue')
                    },
                    {
                        path: '/goods/newly',
                        name: 'newlyGood',
                        component: () => import('@/views/Newly-view.vue')
                    }
                ]
            }
        ]
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
    },
    {
        path: '/modifyInfo',
        name: 'modifyInfo',
        component: () => import('@/views/Info-view.vue'),
        meta: {
            requireAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 开启全局路由
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !localStorage.getItem('token')) {    // 需要登录状态并且有token，那么可以跳转
        next('/login');
    } else {
        next();
    }
})

export default router;