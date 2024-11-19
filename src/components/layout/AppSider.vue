<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
    class="sider"
    :style="siderStyle"
  >
    <div class="logo" :class="{ 'logo-collapsed': collapsed }">
      <n-avatar
        round
        size="large"
        src="../../../imgs/touxiang.jpg"
        :class="{ 'avatar-spin': isLogoHovered }"
        @mouseenter="isLogoHovered = true"
        @mouseleave="isLogoHovered = false"
      />
      <span class="logo-title" v-if="!collapsed">
        <n-gradient-text
          :size="16"
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
        >
          个人网站
        </n-gradient-text>
      </span>
    </div>
    
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuClick"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { renderIcon, menuOptions } from '@/utils'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
  (e: 'select', key: string): void
}>()

const router = useRouter()
const activeKey = ref('home')
const isLogoHovered = ref(false)

const siderStyle = computed(() => ({
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s ease'
}))

const handleMenuClick = (key: string) => {
  activeKey.value = key
  emit('select', key)
}
</script>

<style scoped>
.sider {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo {
  height: 64px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.logo-collapsed {
  justify-content: center;
}

.logo-title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.avatar-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 