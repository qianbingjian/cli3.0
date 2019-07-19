import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ()=> import(/* webpackChunkName: "layout" */ '@/components/layout/BasicLayout.vue'),
      name: 'home',
      redirect: '/home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue')
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ '@/views/notFound.vue')
    }
  ]
})
