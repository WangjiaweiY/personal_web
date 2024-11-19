import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/welcome/index.vue')
  },
  {
    path: '/home',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue')
      },
      {
        path: 'skills',
        name: 'Skills',
        component: () => import('@/views/skills/index.vue')
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/projects/index.vue')
      },
      {
        path: 'awards',
        name: 'Awards',
        component: () => import('@/views/awards/index.vue')
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/contact/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: to => {
      if (to.path === '/') {
        return '/home'
      }
      const path = to.path.replace('/', '')
      return `/home/${path}`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 