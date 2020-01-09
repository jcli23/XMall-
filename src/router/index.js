import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common/common'
import user from '../views/my/my'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: "/home"
    },
    {
        path: '/home',
        component: Common,
        children: [{
            path: "",
            name: "home",
            component: Home
        }]
    },
    {
        path: '/goods',
        component: Common,
        children: [{
            path: "",
            name: "goods",
            component: () =>
                import ('../views/goods/goods')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ("../views/login/login")
    },
    {
        path: '/user',
        name: 'user',
        component: () =>
            import ("../views/my/my")
    },
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import ("../views/cart/cart")
    },
    {
        path: '/my_order',
        component: user,
        children: [{
            path: "",
            name: "my_order",
            component: () =>
                import ('../views/my_order/my_order')
        }]
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ("../views/register/register")
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router