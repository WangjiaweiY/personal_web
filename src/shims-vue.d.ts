declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export * from '@vue/runtime-dom'
  export default Vue
}

declare module 'vue-router' {
  export * from 'vue-router'
}

declare module 'naive-ui' {
  const naive: any
  export default naive
} 