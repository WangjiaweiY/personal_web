<template>
  <div class="skills-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 技能总览卡片 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card overview-card">
          <n-space align="center" justify="center" class="overview-content">
            <n-statistic v-for="stat in statistics" :key="stat.label">
              <template #prefix>
                <n-icon :component="stat.icon" :color="stat.color" size="24" />
              </template>
              <template #label>{{ stat.label }}</template>
              {{ stat.value }}
            </n-statistic>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 主要技能卡片 -->
      <n-grid-item :span="16">
        <n-card title="核心技能" class="shadow-card">
          <n-space vertical size="large">
            <div v-for="skill in mainSkills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <n-space align="center">
                  <n-icon :component="skill.icon" :color="skill.color" size="20" />
                  <span class="skill-name">{{ skill.name }}</span>
                </n-space>
                <span class="skill-level">{{ skill.level }}</span>
              </div>
              <n-progress
                type="line"
                :percentage="skill.percentage"
                :color="skill.color"
                :height="20"
                :border-radius="4"
                :indicator-placement="'inside'"
              >
                {{ skill.description }}
              </n-progress>
              <div class="skill-tags">
                <n-tag
                  v-for="tag in skill.tags"
                  :key="tag"
                  size="small"
                  :bordered="false"
                  :color="{ textColor: skill.color, borderColor: skill.color, color: `${skill.color}20` }"
                >
                  {{ tag }}
                </n-tag>
              </div>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 其他技能卡片 -->
      <n-grid-item :span="8">
        <n-space vertical :size="16">
          <!-- 开发工具 -->
          <n-card title="开发工具" class="shadow-card">
            <n-space>
              <n-tooltip v-for="tool in tools" :key="tool.name" :trigger="'hover'" placement="top">
                <template #trigger>
                  <div class="tool-item" :style="{ borderColor: tool.color }">
                    <n-icon :component="tool.icon" :color="tool.color" size="24" />
                  </div>
                </template>
                {{ tool.name }}
              </n-tooltip>
            </n-space>
          </n-card>

          <!-- 软技能 -->
          <n-card title="软技能" class="shadow-card">
            <n-space vertical>
              <div v-for="skill in softSkills" :key="skill.name" class="soft-skill-item">
                <n-progress
                  type="circle"
                  :percentage="skill.percentage"
                  :color="skill.color"
                  :rail-color="skill.railColor"
                  :stroke-width="6"
                >
                  <div class="soft-skill-content">
                    <n-icon :component="skill.icon" :color="skill.color" size="24" />
                    <span>{{ skill.name }}</span>
                  </div>
                </n-progress>
              </div>
            </n-space>
          </n-card>
        </n-space>
      </n-grid-item>

      <!-- 技能证书 -->
      <n-grid-item :span="24">
        <n-card title="技能证书" class="shadow-card">
          <n-grid :cols="4" :x-gap="16">
            <n-grid-item v-for="cert in certificates" :key="cert.name">
              <div class="cert-item" :class="{ 'cert-featured': cert.featured }">
                <n-icon :component="cert.icon" :color="cert.color" size="36" class="cert-icon" />
                <h3 class="cert-name">{{ cert.name }}</h3>
                <p class="cert-issuer">{{ cert.issuer }}</p>
                <n-tag :type="cert.featured ? 'success' : 'default'" size="small" round>
                  {{ cert.date }}
                </n-tag>
              </div>
            </n-grid-item>
          </n-grid>
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
  DatabaseOutlined,
  TeamOutlined,
  TrophyOutlined,
  ToolOutlined,
  RocketOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  GithubOutlined,
  ChromeOutlined,
  ApiOutlined,
  AppstoreOutlined
} from '@vicons/antd'

const statistics = [
  { label: '开发年限', value: '5年+', icon: CodeOutlined, color: '#42b883' },
  { label: '项目经验', value: '20+', icon: RocketOutlined, color: '#1890ff' },
  { label: '技术栈', value: '10+', icon: AppstoreOutlined, color: '#722ed1' },
  { label: '最佳实践', value: '50+', icon: TrophyOutlined, color: '#f5222d' }
]

const mainSkills = [
  {
    name: '前端开发',
    level: '精通',
    percentage: 90,
    color: '#42b883',
    icon: CodeOutlined,
    description: '现代前端开发技术栈',
    tags: ['Vue3', 'React', 'TypeScript', 'Webpack', 'Vite']
  },
  {
    name: '后端开发',
    level: '熟练',
    percentage: 80,
    color: '#1890ff',
    icon: CloudOutlined,
    description: '服务端开发技术栈',
    tags: ['Node.js', 'Express', 'MySQL', 'MongoDB', 'Redis']
  },
  {
    name: '移动开发',
    level: '掌握',
    percentage: 75,
    color: '#722ed1',
    icon: DesktopOutlined,
    description: '移动端开发技术',
    tags: ['小程序', 'React Native', 'Flutter', 'Hybrid App']
  },
  {
    name: '数据库',
    level: '熟练',
    percentage: 85,
    color: '#13c2c2',
    icon: DatabaseOutlined,
    description: '数据库设计与优化',
    tags: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL']
  }
]

const tools = [
  { name: 'VS Code', icon: CodeOutlined, color: '#007acc' },
  { name: 'Git', icon: GithubOutlined, color: '#f05032' },
  { name: 'Chrome DevTools', icon: ChromeOutlined, color: '#4285f4' },
  { name: 'Postman', icon: ApiOutlined, color: '#ff6c37' },
  { name: 'Docker', icon: CloudOutlined, color: '#2496ed' }
]

const softSkills = [
  { name: '团队协作', percentage: 95, color: '#42b883', railColor: '#42b88333', icon: TeamOutlined },
  { name: '问题解决', percentage: 90, color: '#1890ff', railColor: '#1890ff33', icon: BulbOutlined },
  { name: '快速学习', percentage: 88, color: '#722ed1', railColor: '#722ed133', icon: ThunderboltOutlined }
]

const certificates = [
  {
    name: '前端开发工程师',
    issuer: '某知名互联网公司',
    date: '2023',
    icon: CodeOutlined,
    color: '#42b883',
    featured: true
  },
  {
    name: '全栈工程师认证',
    issuer: '某在线教育平台',
    date: '2022',
    icon: CloudOutlined,
    color: '#1890ff',
    featured: true
  },
  {
    name: '数据库管理员',
    issuer: '某数据库厂商',
    date: '2021',
    icon: DatabaseOutlined,
    color: '#13c2c2',
    featured: false
  },
  {
    name: '敏捷开发认证',
    issuer: '某认证机构',
    date: '2020',
    icon: RocketOutlined,
    color: '#722ed1',
    featured: false
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

.overview-card {
  background: linear-gradient(135deg, #42b883 0%, #3178c6 100%);
}

.overview-content {
  padding: 24px;
}

.overview-content :deep(.n-statistic) {
  padding: 0 32px;
  color: white;
}

.overview-content :deep(.n-statistic-label) {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  margin-top: 8px;
}

.skill-item {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
}

.skill-level {
  color: #666;
}

.skill-tags {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tool-item {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tool-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.soft-skill-item {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.soft-skill-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.cert-item {
  text-align: center;
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cert-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cert-featured {
  border: 2px solid #42b883;
}

.cert-icon {
  margin-bottom: 16px;
}

.cert-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
}

.cert-issuer {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}
</style> 