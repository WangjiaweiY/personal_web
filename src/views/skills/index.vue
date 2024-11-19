<template>
  <div class="skills-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 技能统计卡片 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card intro-card">
          <div class="stats-container">
            <n-card v-for="stat in statistics" :key="stat.label" class="stat-card">
              <n-space align="center" :size="12">
                <div class="stat-icon" :style="{ backgroundColor: '#1890ff20' }">
                  <n-icon :component="stat.icon" color="#1890ff" size="24" />
                </div>
                <div class="stat-content">
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </n-space>
            </n-card>
          </div>
        </n-card>
      </n-grid-item>

      <!-- 主要技能 -->
      <n-grid-item :span="24">
        <n-card title="核心技能" class="shadow-card">
          <n-space vertical size="large">
            <div v-for="skill in mainSkills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <n-space align="center">
                  <n-icon :component="skill.icon" color="#1890ff" size="20" />
                  <span class="skill-name">{{ skill.name }}</span>
                </n-space>
                <span class="skill-level">{{ skill.level }}</span>
              </div>
              <n-progress
                type="line"
                :percentage="skill.percentage"
                :color="'#1890ff'"
                :height="20"
                :border-radius="4"
                :indicator-placement="'inside'"
              >
                {{ skill.description }}
              </n-progress>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  CodeOutlined,
  DesktopOutlined,
  CloudOutlined,
  DatabaseOutlined
} from '@vicons/antd'

const statistics = [
  { label: '技术栈', value: '10+', icon: CodeOutlined },
  { label: '项目经验', value: '5+', icon: DesktopOutlined },
  { label: '开发工具', value: '8+', icon: CloudOutlined },
  { label: '最佳实践', value: '20+', icon: DatabaseOutlined }
]

const mainSkills = [
  {
    name: '前端开发',
    level: '精通',
    percentage: 90,
    icon: CodeOutlined,
    description: '现代前端开发技术栈'
  },
  {
    name: '后端开发',
    level: '熟练',
    percentage: 80,
    icon: CloudOutlined,
    description: '服务端开发技术栈'
  },
  {
    name: '数据库',
    level: '熟练',
    percentage: 85,
    icon: DatabaseOutlined,
    description: '数据库设计与优化'
  }
]
</script>

<style scoped>
.skills-container {
  padding: 16px;
}

.shadow-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.shadow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.intro-card {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.skill-item {
  padding: 16px;
  background: rgba(24, 144, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 16px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.skill-name {
  font-size: 16px;
  font-weight: bold;
  color: #1890ff;
}

.skill-level {
  color: #666;
}

:deep(.n-card-header) {
  color: #1890ff;
  font-weight: bold;
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .intro-card {
    background: linear-gradient(135deg, #141414 0%, #1f1f1f 100%);
  }

  .stat-value {
    color: #1890ff;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.85);
  }

  .skill-name {
    color: #1890ff;
  }

  .skill-level {
    color: rgba(255, 255, 255, 0.85);
  }

  :deep(.n-card-header) {
    color: #1890ff;
  }
}
</style> 