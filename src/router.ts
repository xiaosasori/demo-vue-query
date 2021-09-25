import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/blog',
    component: () => import('./pages/Blog/index.vue'),
  },
  {
    path: '/sw',
    component: () => import('./pages/Starwars.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
