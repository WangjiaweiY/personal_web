<template>
    <n-config-provider :theme="theme">
      <n-layout has-sider position="absolute">
        <!-- 侧边栏 -->
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="180"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
          class="sider"
          :style="siderStyle"
        >
          <!-- Logo -->
          <div class="logo" :class="{ 'logo-collapsed': collapsed }">
            <n-avatar
              round
              size="large"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              :class="{ 'avatar-spin': isLogoHovered }"
              @mouseenter="isLogoHovered = true"
              @mouseleave="isLogoHovered = false"
            />
            <span class="logo-title" v-if="!collapsed">
              个人网站
            </span>
          </div>
          
          <!-- 侧菜单 -->
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
        <n-layout :style="{ marginLeft: collapsed ? '64px' : '180px' }">
          <!-- 头部 -->
          <n-layout-header bordered class="header" :style="headerStyle">
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
                <n-space>
                  <n-button quaternary circle>
                    <template #icon>
                      <n-icon><BellOutlined /></n-icon>
                    </template>
                  </n-button>
                  <n-button quaternary circle>
                    <template #icon>
                      <n-icon><SearchOutlined /></n-icon>
                    </template>
                  </n-button>
                  <n-dropdown
                    :options="settingOptions"
                    trigger="click"
                    @select="handleSettingSelect"
                  >
                    <n-button quaternary circle>
                      <template #icon>
                        <n-icon><SettingOutlined /></n-icon>
                      </template>
                    </n-button>
                  </n-dropdown>
                  <n-divider vertical />
                  <n-dropdown :options="userOptions" trigger="click">
                    <n-avatar
                      round
                      size="small"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                  </n-dropdown>
                </n-space>
              </div>
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

          <!-- 界面设置 -->
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
            <n-button type="primary" @click="saveSettings">保存设置</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>

    <!-- 在最外层添加 -->
    <n-back-top :right="20" :bottom="20" />
  </template>
  
  <script setup lang="ts">
  import { h, ref, computed, watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    BellOutlined,
    SearchOutlined,
    GithubOutlined,
    HeartOutlined,
    LogoutOutlined,
    BookOutlined,
    DesktopOutlined
  } from '@vicons/antd'
  import { NIcon } from 'naive-ui'
  import { menuOptions } from '@/utils'
  import { useMessage } from 'naive-ui'
  
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
    router.push(key === 'home' ? '/' : `/${key}`)
  }
  
  // 设置相关的状态
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
  </script>
  
  <style scoped>
  .sider {
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: #001529;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-right: none !important;
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
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  
  /* 修改菜单样式 */
  :deep(.n-menu) {
    background: transparent !important;
    padding: 0 !important;
  }

  :deep(.n-menu-item) {
    height: 50px !important;
    margin: 4px 0 !important;
    padding: 0 12px !important;
    border-radius: 0 !important;
    color: rgba(0, 0, 0, 0.85) !important;
    transition: all 0.3s ease !important;
  }

  :deep(.n-menu-item-content) {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding-left: 12px !important;
  }

  :deep(.n-menu-item-content__icon) {
    width: 20px !important;
    height: 20px !important;
    font-size: 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: inherit !important;
    margin-right: 0 !important;
  }

  :deep(.n-menu-item-content__text) {
    font-size: 14px !important;
  }

  :deep(.n-menu-item:hover) {
    color: #1890ff !important;
    background-color: rgba(24, 144, 255, 0.1) !important;
  }

  :deep(.n-menu-item--selected) {
    color: white !important;
    background-color: #1890ff !important;
  }

  :deep(.n-menu-item-content) {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }

  :deep(.n-menu-item-content__icon) {
    width: 24px !important;
    height: 24px !important;
    font-size: 18px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: rgba(0, 0, 0, 0.85) !important;
    margin-right: 0 !important;
  }

  :deep(.n-menu-item--selected .n-menu-item-content__icon) {
    color: white !important;
  }

  /* 折叠状态下的样式 */
  :deep(.n-menu--collapsed) {
    width: 64px !important;
    padding: 0 !important;
  }

  :deep(.n-menu--collapsed .n-menu-item) {
    padding: 0 !important;
    margin: 4px 0 !important;
    width: 64px !important;
  }

  :deep(.n-menu--collapsed .n-menu-item-content) {
    padding: 0 !important;
    width: 64px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  :deep(.n-menu--collapsed .n-menu-item-content__icon) {
    margin: 0 !important;
    width: 64px !important;
    height: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  /* 折叠状态下隐藏文字 */
  :deep(.n-menu--collapsed .n-menu-item-content__text) {
    display: none !important;
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
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    }

    .content {
      background-color: #141414 !important;
    }

    .footer {
      background-color: #000000 !important;
      border-color: #303030;
    }

    .sider {
      background-color: #000000 !important;
      border-color: #303030;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
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

    /* 统一边框和分割线颜色 */
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
  </style>