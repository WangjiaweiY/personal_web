<template>
  <div class="projects-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 项目统计卡片 -->
      <n-grid-item :span="24">
        <div class="stats-container">
          <n-card v-for="stat in statistics" :key="stat.label" class="stat-card">
            <n-space align="center" :size="12">
              <div class="stat-icon" :style="{ backgroundColor: stat.color + '20' }">
                <n-icon :component="stat.icon" :color="stat.color" size="24" />
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </n-space>
          </n-card>
        </div>
      </n-grid-item>

      <!-- 精选项目 -->
      <n-grid-item :span="24">
        <n-card title="精选项目" class="shadow-card">
          <n-carousel
            show-arrow
            dot-type="line"
            effect="fade"
            autoplay
            :interval="5000"
            class="featured-carousel"
          >
            <n-carousel-item v-for="project in featuredProjects" :key="project.title">
              <div class="featured-project" :style="{ backgroundImage: `url(${project.image})` }">
                <div class="project-overlay">
                  <h2 class="project-title">{{ project.title }}</h2>
                  <p class="project-desc">{{ project.description }}</p>
                  <n-space>
                    <n-tag
                      v-for="tech in project.technologies"
                      :key="tech"
                      :bordered="false"
                      size="large"
                      round
                    >
                      {{ tech }}
                    </n-tag>
                  </n-space>
                  <n-button type="primary" size="large" class="project-btn">
                    查看详情
                    <template #icon>
                      <n-icon><ArrowRightOutlined /></n-icon>
                    </template>
                  </n-button>
                </div>
              </div>
            </n-carousel-item>
          </n-carousel>
        </n-card>
      </n-grid-item>

      <!-- 项目列表 -->
      <n-grid-item :span="24">
        <n-card title="所有项目" class="shadow-card">
          <n-tabs type="line" animated>
            <n-tab-pane
              v-for="category in projectCategories"
              :key="category.key"
              :name="category.key"
              :tab="category.label"
            >
              <n-grid :cols="3" :x-gap="16" :y-gap="16">
                <n-grid-item v-for="project in category.projects" :key="project.title">
                  <n-card :class="['project-card', project.status]" hoverable>
                    <div class="project-card-header">
                      <n-avatar
                        :src="project.logo"
                        :color="project.color"
                        :style="{ backgroundColor: project.color + '20' }"
                        :size="48"
                      >
                        <n-icon :component="project.icon" />
                      </n-avatar>
                      <n-tag :type="project.tagType" size="small" round class="project-status">
                        {{ project.statusText }}
                      </n-tag>
                    </div>
                    <h3 class="project-card-title">{{ project.title }}</h3>
                    <p class="project-card-desc">{{ project.description }}</p>
                    <div class="project-card-techs">
                      <n-tag
                        v-for="tech in project.technologies"
                        :key="tech"
                        size="small"
                        :bordered="false"
                        :color="{ textColor: project.color, borderColor: project.color, color: project.color + '20' }"
                      >
                        {{ tech }}
                      </n-tag>
                    </div>
                    <template #footer>
                      <n-space justify="space-between">
                        <n-text depth="3">{{ project.date }}</n-text>
                        <n-button text>
                          了解更多
                          <template #icon>
                            <n-icon><ArrowRightOutlined /></n-icon>
                          </template>
                        </n-button>
                      </n-space>
                    </template>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-grid-item>

      <!-- 项目时间线 -->
      <n-grid-item :span="24">
        <n-card title="项目历程" class="shadow-card">
          <n-timeline>
            <n-timeline-item
              v-for="milestone in projectMilestones"
              :key="milestone.date"
              :type="milestone.type"
              :title="milestone.title"
              :content="milestone.content"
              :time="milestone.date"
            >
              <template #icon>
                <n-icon :component="milestone.icon" />
              </template>
              <n-space vertical>
                <n-text depth="3">{{ milestone.description }}</n-text>
                <n-space>
                  <n-tag
                    v-for="(achievement, index) in milestone.achievements"
                    :key="index"
                    size="small"
                    :bordered="false"
                    :type="milestone.type"
                  >
                    {{ achievement }}
                  </n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  CodeOutlined,
  RocketOutlined,
  TrophyOutlined,
  TeamOutlined,
  CloudOutlined,
  MobileOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  ArrowRightOutlined,
  FlagOutlined
} from '@vicons/antd'

const statistics = [
  { label: '完成项目', value: '30+', icon: RocketOutlined, color: '#42b883' },
  { label: '客户好评', value: '98%', icon: TrophyOutlined, color: '#1890ff' },
  { label: '团队规模', value: '20+', icon: TeamOutlined, color: '#722ed1' },
  { label: '技术栈', value: '15+', icon: CodeOutlined, color: '#f5222d' }
]

const featuredProjects = [
  {
    title: '企业级管理系统',
    description: '基于 Vue3 + TypeScript 的现代化企业管理系统，包含多个子系统和丰富的业务功能',
    image: 'https://picsum.photos/1200/400',
    technologies: ['Vue3', 'TypeScript', 'Naive UI', 'Node.js']
  },
  {
    title: '电商平台小程序',
    description: '功能完善的电商平台小程序，支持商品展示、购物车、订单管理等核心功能',
    image: 'https://picsum.photos/1200/400',
    technologies: ['微信小程序', 'TypeScript', 'Taro', 'Node.js']
  }
]

const projectCategories = [
  {
    key: 'web',
    label: 'Web应用',
    projects: [
      {
        title: '企业管理系统',
        description: '现代化的企业级应用',
        logo: '',
        color: '#42b883',
        icon: DesktopOutlined,
        status: 'active',
        statusText: '维护中',
        tagType: 'success',
        technologies: ['Vue3', 'TypeScript', 'Node.js'],
        date: '2023-01'
      },
      {
        title: '数据分析平台',
        description: '大数据可视化平台',
        logo: '',
        color: '#1890ff',
        icon: DatabaseOutlined,
        status: 'completed',
        statusText: '已完成',
        tagType: 'info',
        technologies: ['React', 'Echarts', 'Python'],
        date: '2022-12'
      }
    ]
  },
  {
    key: 'mobile',
    label: '移动应用',
    projects: [
      {
        title: '电商小程序',
        description: '全功能电商平台',
        logo: '',
        color: '#52c41a',
        icon: MobileOutlined,
        status: 'active',
        statusText: '开发中',
        tagType: 'warning',
        technologies: ['小程序', 'Taro', 'TypeScript'],
        date: '2023-03'
      }
    ]
  }
]

const projectMilestones = [
  {
    date: '2023 Q4',
    title: '企业管理系统上线',
    content: '重要里程碑',
    type: 'success',
    icon: FlagOutlined,
    description: '成功交付并部署企业级管理系统',
    achievements: ['性能优化', '安全加固', '用户培训']
  },
  {
    date: '2023 Q3',
    title: '数据分析平台完成',
    content: '重要进展',
    type: 'info',
    icon: RocketOutlined,
    description: '完成数据分析平台的开发和测试',
    achievements: ['可视化优化', '实时分析', '报表导出']
  }
]
</script>

<style scoped>
.projects-container {
  padding: 16px;
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
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.shadow-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.shadow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.featured-carousel {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.featured-project {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.project-title {
  font-size: 28px;
  margin: 0 0 16px 0;
}

.project-desc {
  font-size: 16px;
  margin: 0 0 24px 0;
  opacity: 0.9;
}

.project-btn {
  margin-top: 16px;
}

.project-card {
  height: 100%;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.project-status {
  margin-left: auto;
}

.project-card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.project-card-desc {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.5;
}

.project-card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.active {
  border-top: 3px solid #52c41a;
}

.completed {
  border-top: 3px solid #1890ff;
}

.development {
  border-top: 3px solid #722ed1;
}
</style> 