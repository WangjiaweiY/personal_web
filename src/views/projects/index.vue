<template>
  <div class="projects-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 精选项目 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card">
          <template #header>
            <div class="card-header">
              <n-icon size="24" color="#1890ff">
                <StarOutlined />
              </n-icon>
              <span class="header-title">精选项目</span>
              <div class="header-line"></div>
            </div>
          </template>
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
        <n-card class="shadow-card">
          <template #header>
            <div class="card-header">
              <n-icon size="24" color="#1890ff">
                <ProjectOutlined />
              </n-icon>
              <span class="header-title">所有项目</span>
              <div class="header-line"></div>
            </div>
          </template>
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
                        :style="{ backgroundColor: '#1890ff20' }"
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
                        :color="{ textColor: '#1890ff', borderColor: '#1890ff', color: '#1890ff20' }"
                      >
                        {{ tech }}
                      </n-tag>
                    </div>
                    <template #footer>
                      <n-space justify="space-between">
                        <n-text depth="3">{{ project.date }}</n-text>
                        <n-button text type="primary">
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
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import {
  CodeOutlined,
  RocketOutlined,
  CloudOutlined,
  ArrowRightOutlined,
  StarOutlined,
  ProjectOutlined
} from '@vicons/antd'

// 精选项目数据
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

// 项目分类数据
const projectCategories = [
  {
    key: 'web',
    label: 'Web应用',
    projects: [
      {
        title: '企业管理系统',
        description: '现代化的企业级应用',
        logo: '',
        color: '#1890ff',
        icon: CodeOutlined,
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
        icon: CloudOutlined,
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
        color: '#1890ff',
        icon: RocketOutlined,
        status: 'active',
        statusText: '开发中',
        tagType: 'warning',
        technologies: ['小程序', 'Taro', 'TypeScript'],
        date: '2023-03'
      }
    ]
  }
]
</script>

<style scoped>
.projects-container {
  padding: 16px;
}

.shadow-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
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
  color: #1890ff;
}

.project-desc {
  font-size: 16px;
  margin: 0 0 24px 0;
  opacity: 0.9;
}

.project-btn {
  margin-top: 16px;
  background-color: #1890ff;
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
  color: #1890ff;
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

:deep(.n-card-header) {
  color: #1890ff;
  font-weight: bold;
}

/* 添加标题样式 */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  position: relative;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  margin-right: 16px;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, #1890ff 0%, rgba(24, 144, 255, 0.2) 100%);
  border-radius: 1px;
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .shadow-card {
    background: linear-gradient(135deg, #141414 0%, #1f1f1f 100%);
  }

  .project-title {
    color: #1890ff;
  }

  .project-card-title {
    color: #1890ff;
  }

  .project-card-desc {
    color: rgba(255, 255, 255, 0.85);
  }

  :deep(.n-card-header) {
    color: #1890ff;
  }

  .header-title {
    color: #1890ff;
  }

  .header-line {
    background: linear-gradient(90deg, #1890ff 0%, rgba(24, 144, 255, 0.1) 100%);
  }
}
</style> 