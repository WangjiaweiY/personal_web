declare module 'vue-router' {
  import type { RouteRecordRaw as _RouteRecordRaw } from 'vue-router/dist/vue-router'
  export type RouteRecordRaw = _RouteRecordRaw
  export { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
} 