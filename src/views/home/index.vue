<template>
  <div class="home-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 个人信息卡片 -->
      <n-grid-item :span="8">
        <n-card class="shadow-card">
          <div class="profile-header">
            <n-avatar
              round
              :size="120"
              src="./../../../imgs/touxiang.jpg"
              class="profile-avatar"
            />
            <h2 class="profile-name">王嘉炜 (Joeww Wang)</h2>
            <div class="profile-title">西北大学软件工程专业</div>
          </div>
          <n-divider />
          <n-descriptions :column="1" class="profile-info">
            <n-descriptions-item label="学历">
              <n-tag type="success" round>
                <template #icon>
                  <n-icon><BookOutlined /></n-icon>
                </template>
                推免研究生
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="研究方向">
              <n-tag type="info" round>
                <template #icon>
                  <n-icon><ExperimentOutlined /></n-icon>
                </template>
                医学影像处理
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="导师">
              <n-tag type="warning" round>
                <template #icon>
                  <n-icon><UserOutlined /></n-icon>
                </template>
                崔磊
              </n-tag>
            </n-descriptions-item>
          </n-descriptions>
          <n-divider />
          <n-space justify="center">
            <n-button type="primary" secondary round>
              <template #icon>
                <n-icon><DownloadOutlined /></n-icon>
              </template>
              下载简历
            </n-button>
            <n-button type="info" secondary round>
              <template #icon>
                <n-icon><MessageOutlined /></n-icon>
              </template>
              联系我
            </n-button>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 技能概览卡片 -->
      <n-grid-item :span="16">
        <n-card title="技能概览" class="shadow-card">
          <n-space vertical size="large">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percentage">{{ skill.percentage }}%</span>
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
            </div>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 项目经历卡片 -->
      <n-grid-item :span="24">
        <n-card title="最近项目" class="shadow-card">
          <n-grid :cols="3" :x-gap="16">
            <n-grid-item v-for="project in projects" :key="project.title">
              <n-card :class="['project-card', project.type]" hoverable>
                <template #header>
                  <div class="project-header">
                    <n-icon :component="project.icon" :color="project.iconColor" size="24" />
                    <span class="project-title">{{ project.title }}</span>
                  </div>
                </template>
                <p class="project-desc">{{ project.description }}</p>
                <template #footer>
                  <n-space justify="space-between">
                    <n-tag :type="project.tagType" round>{{ project.status }}</n-tag>
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
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  EnvironmentOutlined,
  MailOutlined,
  GithubOutlined,
  DownloadOutlined,
  MessageOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  CloudOutlined,
  MobileOutlined,
  BookOutlined,
  ExperimentOutlined,
  UserOutlined
} from '@vicons/antd'

const skills = [
  {
    name: 'Vue.js',
    percentage: 90,
    color: '#42b883',
    description: '熟练掌握 Vue3 生态'
  },
  {
    name: 'TypeScript',
    percentage: 85,
    color: '#3178c6',
    description: '熟悉 TS 开发'
  },
  {
    name: 'Node.js',
    percentage: 80,
    color: '#68a063',
    description: '后端开发经验'
  },
  {
    name: 'React',
    percentage: 75,
    color: '#61dafb',
    description: 'React 项目经验'
  }
]

const projects = [
  {
    title: '个人网站',
    description: '使用 Vue3 + TypeScript + Naive UI 开发的响应式个人网站',
    status: '进行中',
    type: 'featured',
    tagType: 'success',
    icon: CodeOutlined,
    iconColor: '#42b883'
  },
  {
    title: '企业管理系统',
    description: 'React + Node.js 开发的全栈企业管理系统',
    status: '已完成',
    type: 'enterprise',
    tagType: 'info',
    icon: CloudOutlined,
    iconColor: '#1890ff'
  },
  {
    title: '微信小程序商城',
    description: '基于微信小程序开发的电商平台',
    status: '维护中',
    type: 'mobile',
    tagType: 'warning',
    icon: MobileOutlined,
    iconColor: '#52c41a'
  }
]
</script>

<style scoped>
.home-container {
  padding: 16px;
  background-color: #f5f5f5;
}

.shadow-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.shadow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.profile-avatar {
  margin-bottom: 16px;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.profile-name {
  margin: 8px 0;
  font-size: 24px;
  font-weight: bold;
}

.profile-title {
  color: #666;
  font-size: 16px;
}

.profile-info {
  margin: 16px 0;
}

.skill-item {
  margin-bottom: 16px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: bold;
}

.skill-percentage {
  color: #666;
}

.project-card {
  height: 100%;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-title {
  font-size: 16px;
  font-weight: bold;
}

.project-desc {
  color: #666;
  margin: 16px 0;
  line-height: 1.5;
}

.featured {
  border-top: 3px solid #42b883;
}

.enterprise {
  border-top: 3px solid #1890ff;
}

.mobile {
  border-top: 3px solid #52c41a;
}
</style> 