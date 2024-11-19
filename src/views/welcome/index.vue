<template>
  <div class="welcome-container">
    <!-- 背景动画 -->
    <div class="background-animation">
      <div v-for="n in 10" :key="n" class="floating-circle" 
        :style="{ 
          '--delay': `${n * 2}s`,
          '--size': `${20 + n * 10}px`,
          '--left': `${n * 10}%`
        }">
      </div>
    </div>

    <!-- 欢迎页面内容 -->
    <div class="welcome-content" :class="{ 'fade-out': isScrolling }">
      <div class="decorative-line"></div>

      <div class="welcome-header">
        <n-gradient-text :size="48" gradient="linear-gradient(90deg, #1890ff 0%, #69c0ff 100%)">
          Welcome
        </n-gradient-text>
      </div>

      <div class="name-title">
        <h1>王嘉炜</h1>
        <h2>Joeww Wang</h2>
      </div>

      <div class="subtitle">
        <n-text depth="3">西北大学软件工程专业</n-text>
      </div>

      <div class="scroll-hint">
        <n-text depth="2">向下滚动探索更多</n-text>
        <div class="scroll-icon-wrapper">
          <n-icon size="24" class="scroll-icon">
            <DownOutlined />
          </n-icon>
        </div>
      </div>
    </div>

    <!-- 主页内容 -->
    <div class="main-content" :class="{ 'fade-in': isScrolling }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { DownOutlined } from '@vicons/antd'

const router = useRouter()
const isScrolling = ref(false)
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const handleScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  if (window.scrollY > window.innerHeight / 3) {
    isScrolling.value = true
    scrollTimeout = setTimeout(() => {
      router.push('/home')
    }, 500)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
.welcome-container {
  min-height: 200vh;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%);
  position: relative;
  overflow: hidden;
}

/* 背景动画 */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-circle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(24,144,255,0.1) 0%, rgba(24,144,255,0.05) 100%);
  left: var(--left);
  animation: float 20s infinite linear;
  animation-delay: var(--delay);
}

.welcome-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.5s ease;
  background: transparent;
}

/* 装饰线 */
.decorative-line {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #1890ff, transparent);
  margin-bottom: 32px;
  animation: expandLine 1s ease forwards;
}

.welcome-header {
  margin-bottom: 32px;
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

.name-title {
  text-align: center;
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeInUp 1s ease 0.3s forwards;
}

.name-title h1 {
  font-size: 48px;
  color: #1890ff;
  margin: 0 0 8px 0;
  font-weight: 600;
  letter-spacing: 2px;
}

.name-title h2 {
  font-size: 28px;
  color: #1890ff;
  margin: 0;
  font-weight: 400;
  letter-spacing: 1px;
}

.subtitle {
  margin-bottom: 48px;
  opacity: 0;
  animation: fadeInUp 1s ease 0.6s forwards;
  font-size: 18px;
}

.scroll-hint {
  position: absolute;
  bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeInUp 1s ease 0.9s forwards;
}

.scroll-icon-wrapper {
  background: rgba(24,144,255,0.1);
  border-radius: 50%;
  padding: 8px;
}

.scroll-icon {
  animation: bounce 2s infinite;
  color: #1890ff;
}

.main-content {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  margin-top: 100vh;
}

.fade-out {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0% {
    transform: translateY(-100vh) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

@keyframes expandLine {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100px;
    opacity: 1;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .name-title h1 {
    font-size: 36px;
  }

  .name-title h2 {
    font-size: 24px;
  }
}
</style> 