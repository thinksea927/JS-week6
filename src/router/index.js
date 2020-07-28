import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'

  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'checkout',
        component: () => import('../views/Checkout.vue')
      },
      {
        path: 'closing',
        component: () => import('../views/Closing.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Dashboard/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/Orders.vue')
      },
      {
        path: 'images',
        component: () => import('../views/Dashboard/Images.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   component: () => import('../views/About.vue')
  // },
  // {
  //   path: '/index',
  //   component: () => import('../views/Index.vue')
  // }

]

const router = new VueRouter({
  routes
})

export default router
