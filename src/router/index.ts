import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 使用 window.$loadingBar 而不是 useLoadingBar
  if (window.$loadingBar) {
    window.$loadingBar.start()
  }
  next()
})

// 添加全局后置守卫
router.afterEach(() => {
  if (window.$loadingBar) {
    window.$loadingBar.finish()
  }
})

export default router 