<template>
  <n-config-provider :theme="theme">
    <n-layout has-sider position="absolute">
      <!-- 侧边栏 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="sider"
      >
        <!-- Logo -->
        <div class="logo" :class="{ 'logo-collapsed': collapsed }">
          <n-avatar
            round
            size="large"
            src="./../../../imgs/touxiang.jpg"
            :class="{ 'avatar-spin': isLogoHovered }"
            @mouseenter="isLogoHovered = true"
            @mouseleave="isLogoHovered = false"
          />
          <span class="logo-title" v-if="!collapsed">
            个人网站
          </span>
        </div>
        
        <!-- 侧边菜单 -->
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :value="activeKey"
          @update:value="handleMenuClick"
        />
      </n-layout-sider>
  
      <!-- 主体内容区 -->
      <n-layout :style="{ marginLeft: collapsed ? '64px' : '200px' }">
        <!-- 头部 -->
        <n-layout-header bordered class="header">
          <div class="header-content">
            <div class="header-left">
              <n-button
                quaternary
                circle
                @click="collapsed = !collapsed"
                class="trigger-button"
              >
                <template #icon>
                  <n-icon size="20">
                    <component :is="collapsed ? MenuUnfoldIcon : MenuFoldIcon" />
                  </n-icon>
                </template>
              </n-button>
              <n-breadcrumb>
                <n-breadcrumb-item>首页</n-breadcrumb-item>
                <n-breadcrumb-item>{{ activeKey }}</n-breadcrumb-item>
              </n-breadcrumb>
            </div>
            <div class="header-right">
              <n-space align="center">
                <n-input
                  v-model:value="searchText"
                  placeholder="搜索..."
                  clearable
                  round
                  style="width: 200px"
                  @keydown.enter="handleSearch"
                  :theme-overrides="{
                    borderHover: '#1890ff',
                    borderFocus: '#1890ff',
                    boxShadowFocus: '0 0 0 2px rgba(24, 144, 255, 0.2)'
                  }"
                >
                  <template #prefix>
                    <n-icon :component="SearchOutlined" />
                  </template>
                </n-input>
                <n-button quaternary circle @click="handleThemeChange">
                  <template #icon>
                    <n-icon>
                      <SettingOutlined />
                    </n-icon>
                  </template>
                </n-button>
                <n-divider vertical />
                <n-avatar
                  round
                  size="small"
                  src="./../../../imgs/touxiang.jpg"
                />
              </n-space>
            </div>
          </div>
          <!-- 搜索结果下拉框 -->
          <div class="search-dropdown" v-if="searchText && searchResults.length > 0">
            <n-list hoverable clickable>
              <n-list-item
                v-for="result in searchResults"
                :key="result.path"
                @click="handleResultClick(result)"
              >
                <n-thing :title="result.title">
                  {{ result.description }}
                </n-thing>
              </n-list-item>
            </n-list>
          </div>
        </n-layout-header>
  
        <!-- 内容区 -->
        <n-layout-content class="content">
          <router-view></router-view>
        </n-layout-content>
  
        <!-- 页脚 -->
        <n-layout-footer bordered class="footer">
          <n-space justify="center">
            <n-button
              text
              tag="a"
              href="https://github.com/WangjiaweiY"
              target="_blank"
            >
              <template #icon>
                <n-icon><GithubOutlined /></n-icon>
              </template>
              GitHub
            </n-button>
            <n-divider vertical />
            © 2024 个人网站
            <n-divider vertical />
            <n-button
              text
              tag="a"
              href="https://blog.csdn.net/m0_64403412?type=bbs"
              target="_blank"
            >
              <template #icon>
                <n-icon><BookOutlined /></n-icon>
              </template>
              CSDN博客
            </n-button>
          </n-space>
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
  
  <!-- 添加设置抽屉 -->
  <n-drawer v-model:show="showSettingDrawer" :width="300" placement="right">
    <n-drawer-content title="系统设置">
      <n-space vertical size="large">
        <!-- 主题设置 -->
        <div>
          <h3>主题模式</h3>
          <n-space vertical>
            <n-radio-group v-model:value="themeMode" name="theme-mode">
              <n-space>
                <n-radio-button value="light">
                  <n-space align="center" :size="4">
                    <n-icon><SettingOutlined /></n-icon>
                    <span>浅色</span>
                  </n-space>
                </n-radio-button>
                <n-radio-button value="dark">
                  <n-space align="center" :size="4">
                    <n-icon><SettingOutlined /></n-icon>
                    <span>深色</span>
                  </n-space>
                </n-radio-button>
              </n-space>
            </n-radio-group>
          </n-space>
        </div>

        <!-- 界面设 -->
        <div>
          <h3>界面设置</h3>
          <n-space vertical>
            <n-switch v-model:value="fixedHeader">
              <template #checked>固定头部</template>
              <template #unchecked>不固定头部</template>
            </n-switch>
            <n-switch v-model:value="showBreadcrumb">
              <template #checked>显示面包屑</template>
              <template #unchecked>隐藏面包屑</template>
            </n-switch>
            <n-switch v-model:value="showFooter">
              <template #checked>显示页脚</template>
              <template #unchecked>隐藏页脚</template>
            </n-switch>
          </n-space>
        </div>

        <!-- 动画设置 -->
        <div>
          <h3>动画效果</h3>
          <n-space vertical>
            <n-switch v-model:value="enableAnimation">
              <template #checked>开启动画</template>
              <template #unchecked>关闭动画</template>
            </n-switch>
            <template v-if="enableAnimation">
              <n-text depth="3">动画速度</n-text>
              <n-slider
                v-model:value="animationSpeed"
                :min="0.1"
                :max="2"
                :step="0.1"
                :marks="{
                  0.1: '慢',
                  1: '常',
                  2: '快'
                }"
              />
            </template>
          </n-space>
        </div>

        <!-- 界面风格 -->
        <div>
          <h3>界面</h3>
          <n-space vertical>
            <n-color-picker
              v-model:value="primaryColor"
              :swatches="[
                '#1890ff',
                '#42b883',
                '#722ed1',
                '#f5222d',
                '#13c2c2',
                '#52c41a'
              ]"
            />
          </n-space>
        </div>
      </n-space>

      <template #footer>
        <n-space justify="space-between">
          <n-button @click="resetSettings">恢复默认</n-button>
          <n-button type="primary" @click="saveSettings">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>

  <!-- 在最外层添加 -->
  <n-back-top :right="20" :bottom="20" />
</template>
  
<script setup lang="ts">
import { h, ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import {
  useOsTheme,
  darkTheme,
  lightTheme,
  useMessage,
  NIcon
} from 'naive-ui/es'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  GithubOutlined,
  HeartOutlined,
  LogoutOutlined,
  DesktopOutlined
} from '@vicons/antd'
import { menuOptions } from '@/utils'
  
const router = useRouter()
const activeKey = ref('home')
const collapsed = ref(false)
const isLogoHovered = ref(false)
  
// 头部样式
const headerStyle = computed(() => ({
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s ease'
}))
  
// 侧边栏样式
const siderStyle = computed(() => ({
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.3s ease'
}))
  
const MenuFoldIcon = MenuFoldOutlined
const MenuUnfoldIcon = MenuUnfoldOutlined
const SettingIcon = SettingOutlined
  
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
  
// 用户下拉菜单
const userOptions = [
  {
    label: '个人设置',
    key: 'settings',
    icon: renderIcon(SettingOutlined)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutOutlined)
  }
]
  
const handleMenuClick = (key: string) => {
  activeKey.value = key
  if (key === 'home') {
    router.push('/home')
  } else {
    router.push(`/home/${key}`)
  }
}
  
// 设置相的状态
const showSettingDrawer = ref(false)
const themeMode = ref('light')
const primaryColor = ref('#1890ff')
const fixedHeader = ref(true)
const showBreadcrumb = ref(true)
const showFooter = ref(true)
const enableAnimation = ref(true)
const animationSpeed = ref(1)
  
// 设置菜单选项
const settingOptions = [
  {
    label: '主题设置',
    key: 'theme',
    icon: renderIcon(SettingOutlined)
  },
  {
    label: '布局设置',
    key: 'layout',
    icon: renderIcon(DesktopOutlined)
  },
  {
    label: '系统设置',
    key: 'system',
    icon: renderIcon(SettingOutlined)
  }
]
  
// 处理设置菜单选择
const handleSettingSelect = (key: string) => {
  showSettingDrawer.value = true
}
  
// 获取消息提示实例
const message = useMessage()
  
// 重置设置
const resetSettings = () => {
  themeMode.value = 'light'
  primaryColor.value = '#1890ff'
  fixedHeader.value = true
  showBreadcrumb.value = true
  showFooter.value = true
  enableAnimation.value = true
  animationSpeed.value = 1
  message.success('已恢复默认设置')
}
  
// 保存设置
const saveSettings = () => {
  localStorage.setItem('theme-settings', JSON.stringify({
    themeMode: themeMode.value,
    primaryColor: primaryColor.value,
    fixedHeader: fixedHeader.value,
    showBreadcrumb: showBreadcrumb.value,
    showFooter: showFooter.value,
    enableAnimation: enableAnimation.value,
    animationSpeed: animationSpeed.value
  }))
  showSettingDrawer.value = false
  message.success('设置已保存')
}
  
// 主题相关
const osTheme = useOsTheme()
const theme = computed(() => {
  switch (themeMode.value) {
    case 'dark':
      return darkTheme
    case 'light':
      return lightTheme
    case 'system':
      return osTheme.value === 'dark' ? darkTheme : lightTheme
    default:
      return lightTheme
  }
})
  
// 监听主题变化
watch([themeMode, primaryColor], () => {
  // 更新主题
  document.documentElement.setAttribute('data-theme', themeMode.value)
  document.documentElement.style.setProperty('--primary-color', primaryColor.value)
  
  // 更新背景色和文字颜色
  if (themeMode.value === 'dark') {
    document.body.style.backgroundColor = '#18181c'
    document.body.style.color = '#ffffff'
  } else {
    document.body.style.backgroundColor = '#f5f5f5'
    document.body.style.color = '#000000'
  }
})
  
// 在组件挂载加保存的设置
onMounted(() => {
  const savedSettings = localStorage.getItem('theme-settings')
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    themeMode.value = settings.themeMode
    primaryColor.value = settings.primaryColor
    fixedHeader.value = settings.fixedHeader
    showBreadcrumb.value = settings.showBreadcrumb
    showFooter.value = settings.showFooter
    enableAnimation.value = settings.enableAnimation
    animationSpeed.value = settings.animationSpeed
  }
})

// 主题切换
const handleThemeChange = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
}

// 添加深色模式判断
const isDark = computed(() => {
  return document.documentElement.getAttribute('data-theme') === 'dark'
})

// 搜索相关
const searchText = ref('')
const searchResults = ref<Array<{
  title: string
  description: string
  path: string
  anchor?: string
}>>([])

// 搜索数据
const searchData = [
  {
    title: '关于我',
    description: '个人简介、教育背景等',
    path: '/about'
  },
  {
    title: '技能特长',
    description: '专业技能、开发工具等',
    path: '/skills'
  },
  {
    title: '项目经历',
    description: '个人项目、实习经历等',
    path: '/projects'
  },
  {
    title: '获奖经历',
    description: '竞赛获奖、奖学金等',
    path: '/awards'
  },
  {
    title: '联系方式',
    description: 'QQ、微信、邮箱等联系方式',
    path: '/contact'
  }
]

// 处理搜索
const handleSearch = () => {
  if (!searchText.value) {
    searchResults.value = []
    return
  }
  
  searchResults.value = searchData.filter(item => 
    item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.value.toLowerCase())
  )
}

// 处理搜索结果点击
const handleResultClick = (result: { path: string, anchor?: string }) => {
  searchText.value = ''
  searchResults.value = []
  router.push(result.path + (result.anchor ? `#${result.anchor}` : ''))
}

// 监听搜索文本变化
watch(searchText, () => {
  handleSearch()
})
</script>
  
<style scoped>
/* 侧边栏基础样式 */
.sider {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: #ffffff !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  border-right: none !important;
}

/* 重置菜单样式 */
:deep(.n-menu) {
  background-color: transparent !important;
  /* 覆盖 naive-ui 默认变量 */
  --n-item-color-active-hover: rgba(24, 144, 255, 0.1) !important;
  --n-item-color-active: rgba(24, 144, 255, 0.1) !important;
  --n-item-color-hover: transparent !important;
  --n-item-icon-color-hover: rgb(24, 144, 255) !important;
  --n-item-icon-color-active: rgb(24, 144, 255) !important;
  --n-item-icon-color-active-hover: rgb(24, 144, 255) !important;
  --n-item-text-color-hover: rgb(24, 144, 255) !important;
  --n-item-text-color-active: rgb(24, 144, 255) !important;
  --n-item-text-color-active-hover: rgb(24, 144, 255) !important;
  --n-item-color-active-collapsed: rgba(24, 144, 255, 0.1) !important;
  --n-item-icon-color-active-collapsed: rgb(24, 144, 255) !important;
  --n-item-text-color-active-collapsed: rgb(24, 144, 255) !important;
  padding: 0 !important;
  width: 200px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

/* 基础菜单项样式 */
:deep(.n-menu-item) {
  height: 50px !important;
  margin: 4px 0 !important;
  padding: 0 !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
  width: 180px !important;
  position: relative !important;
  background: none !important;
}

/* 菜单项内容样式 */
:deep(.n-menu-item-content) {
  padding: 0 16px !important;
  line-height: 50px !important;
  background: none !important;
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  position: relative !important;
}

/* 图标和文字的基础样式 */
:deep(.n-menu-item-content__icon) {
  width: 24px !important;
  height: 24px !important;
  margin-right: 8px !important;
  color: rgba(0, 0, 0, 0.65) !important;
  transition: color 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.n-menu-item-content__text) {
  color: rgba(0, 0, 0, 0.65) !important;
  transition: color 0.3s ease !important;
}

/* 悬浮状态 - 只改变文字和图标颜色 */
:deep(.n-menu-item:hover) {
  background-color: transparent !important;
}

:deep(.n-menu-item:hover) .n-menu-item-content__icon,
:deep(.n-menu-item:hover) .n-menu-item-content__text {
  color: rgb(24, 144, 255) !important;
}

/* 选中状态 */
:deep(.n-menu-item.n-menu-item--selected) {
  background: none !important;
}

:deep(.n-menu-item.n-menu-item--selected) .n-menu-item-content {
  position: relative !important;
}

:deep(.n-menu-item.n-menu-item--selected) .n-menu-item-content::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 0;
  width: 170px;
  height: 100%;
  background-color: rgba(24, 144, 255, 0.1);
  border-radius: 8px;
  z-index: -1;
}

:deep(.n-menu-item.n-menu-item--selected .n-menu-item-content .n-menu-item-content__icon),
:deep(.n-menu-item.n-menu-item--selected .n-menu-item-content .n-menu-item-content__text) {
  color: rgb(24, 144, 255) !important;
  position: relative !important;
  z-index: 1 !important;
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .sider {
    background-color: #000000 !important;
  }

  .n-menu-item-content__icon,
  .n-menu-item-content__text {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  .n-menu-item--selected .n-menu-item-content__icon,
  .n-menu-item--selected .n-menu-item-content__text {
    color: rgb(24, 144, 255) !important;
  }
}

.logo {
  height: 80px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
}
  
.logo-collapsed {
  padding: 16px 0;
  justify-content: center;
}
  
.logo-title {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: rgba(0, 0, 0, 0.85);
}
  
.avatar-spin {
  animation: spin 1s linear infinite;
}
  
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
  
.header {
  height: 64px;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 99;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
  
.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
  
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
  
.trigger-button {
  transition: transform 0.3s ease;
}
  
.trigger-button:hover {
  transform: rotate(90deg);
}
  
.content {
  padding: 24px;
  min-height: calc(100vh - 128px);
  background-color: #f0f2f5;
}
  
.footer {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, #f0f2f5 100%);
  border-top: 1px solid #f0f0f0;
}
  
/* 添加一些hover效果 */
.n-button:not(.n-button--disabled):hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
  
/* 添加菜单包装器样式 */
.menu-wrapper {
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}

/* 折叠状态下的样式 */
:deep(.n-menu--collapsed) {
  width: 64px !important;
  padding: 0 !important;
}

:deep(.n-menu--collapsed .n-menu-item) {
  width: 64px !important;
  padding: 0 !important;
  margin: 4px 0 !important;
}

:deep(.n-menu--collapsed .n-menu-item-content) {
  padding: 0 !important;
  width: 64px !important;
  display: flex !important;
  justify-content: center !important;
}

:deep(.n-menu--collapsed .n-menu-item-content-header) {
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.n-menu--collapsed .n-menu-item-content__icon) {
  margin: 0 !important;
  padding: 0 !important;
  width: 24px !important;
  height: 24px !important;
  position: absolute !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected) {
  background: none !important;
}

:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected .n-menu-item-content) {
  position: relative !important;
}

:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected .n-menu-item-content::before) {
  content: '' !important;
  position: absolute !important;
  left: 8px !important;
  top: 0 !important;
  width: 48px !important;
  height: 100% !important;
  background-color: rgba(24, 144, 255, 0.1) !important;
  border-radius: 8px !important;
  z-index: -1 !important;
}

:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected .n-menu-item-content__icon) {
  color: rgb(24, 144, 255) !important;
  position: absolute !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 1 !important;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .header {
    background-color: #000000 !important;
    border-color: #303030;
  }

  .content {
    background-color: #141414 !important;
  }

  .footer {
    background-color: #141414 !important;
    border-color: #303030;
  }

  .sider {
    background-color: #000000 !important;
    border-color: #303030;
  }

  .logo {
    background-color: #000000 !important;
  }

  /* 卡片和内容区域使用稍深的颜色 #1f1f1f */
  :deep(.n-card) {
    background-color: #1f1f1f !important;
    border-color: #303030;
  }

  :deep(.n-card-header) {
    border-bottom-color: #303030 !important;
  }

  :deep(.n-layout-content) {
    background-color: #141414 !important;
  }

  :deep(.n-tabs-nav) {
    background-color: #1f1f1f !important;
  }

  :deep(.n-tab-pane) {
    background-color: #1f1f1f !important;
  }

  /* 文字和图标颜色统一 */
  :deep(.n-menu-item) {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  :deep(.n-menu-item-content__icon) {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  :deep(.n-menu-item:hover) {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.09) !important;
  }

  :deep(.n-menu-item--selected) {
    color: white !important;
    background-color: #1890ff !important;
  }

  :deep(.n-menu-item--selected .n-menu-item-content__icon) {
    color: white !important;
  }

  :deep(.n-breadcrumb-item:not(:last-child)) {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  :deep(.n-divider) {
    background-color: #303030;
  }

  :deep(.n-button) {
    color: rgba(255, 255, 255, 0.85);
  }

  .logo-title {
    color: rgba(255, 255, 255, 0.85);
  }

  /* 统一边框和割线颜色 */
  :deep(.n-divider) {
    background-color: #303030 !important;
  }

  :deep(.n-card-header) {
    border-bottom-color: #303030 !important;
  }

  :deep(.n-layout-header) {
    border-bottom-color: #303030 !important;
  }

  :deep(.n-layout-footer) {
    border-top-color: #303030 !important;
  }

  /* 统一阴影效果 */
  .shadow-card,
  .header,
  .sider {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
  }
}

/* 覆盖 naive-ui 默认变量，删除绿色 */
:deep(.n-menu) {
  --n-item-color-active-hover: rgba(24, 144, 255, 0.1) !important;
  --n-item-color-active: rgba(24, 144, 255, 0.1) !important;
  --n-item-color-hover: rgba(24, 144, 255, 0.1) !important;
  --n-item-icon-color-hover: rgb(24, 144, 255) !important;
  --n-item-icon-color-active: rgb(24, 144, 255) !important;
  --n-item-icon-color-active-hover: rgb(24, 144, 255) !important;
  --n-item-text-color-hover: rgb(24, 144, 255) !important;
  --n-item-text-color-active: rgb(24, 144, 255) !important;
  --n-item-text-color-active-hover: rgb(24, 144, 255) !important;
}

:deep(.n-button) {
  transition: all 0.3s ease;
}

:deep(.n-button:hover) {
  color: #1890ff !important;
}

/* 折叠状态的样式 */
:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected) {
  background-color: rgba(24, 144, 255, 0.1) !important;
}

:deep(.n-menu--collapsed .n-menu-item.n-menu-item--selected .n-menu-item-content__icon) {
  color: rgb(24, 144, 255) !important;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  right: 200px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .search-dropdown {
    background-color: #1f1f1f;
  }
}

:deep(.n-input) {
  --n-border-hover: rgb(24, 144, 255) !important;
  --n-border-focus: rgb(24, 144, 255) !important;
  --n-box-shadow-focus: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
}
</style>