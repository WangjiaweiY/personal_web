<template>
  <div class="about-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 个人简介卡片 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card intro-card">
          <n-space align="center" justify="center" class="intro-header">
            <div class="avatar-wrapper">
              <n-avatar
                round
                :size="160"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                class="intro-avatar"
              />
              <div class="avatar-ring"></div>
            </div>
            <div class="intro-text">
              <h1 class="intro-name">王嘉炜 (Joeww Wang)</h1>
              <p class="intro-title">西北大学软件工程专业 / 推免研究生</p>
              <n-space>
                <n-tag type="success" round size="large">中共党员</n-tag>
                <n-tag type="info" round size="large">班长</n-tag>
                <n-tag type="warning" round size="large">辅导员助理</n-tag>
              </n-space>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 个人经历时间线 -->
      <n-grid-item :span="12">
        <n-card title="工作经历" class="shadow-card">
          <n-timeline>
            <n-timeline-item
              v-for="(exp, index) in workExperience"
              :key="index"
              :type="exp.type"
              :title="exp.company"
              :content="exp.position"
              :time="exp.time"
            >
              <template #icon>
                <n-icon :component="exp.icon" />
              </template>
              <n-space vertical>
                <n-text depth="3">{{ exp.description }}</n-text>
                <n-space>
                  <n-tag
                    v-for="(tech, tIndex) in exp.technologies"
                    :key="tIndex"
                    size="small"
                    :bordered="false"
                    :color="{ textColor: tech.color, borderColor: tech.color, color: `${tech.color}20` }"
                  >
                    {{ tech.name }}
                  </n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>

            <!-- 在工作经历部分添加腾讯实习经历 -->
            <n-timeline-item
              type="success"
              title="腾讯 CSIG"
              content="云产品五部终端研发中心 - iOS开发"
              time="2024.05 - 2024.08"
            >
              <template #icon>
                <n-icon><RocketOutlined /></n-icon>
              </template>
              <n-space vertical>
                <n-text depth="3">客户端开发实习生</n-text>
                <n-text depth="3">主要方向：iOS开发</n-text>
                <n-space>
                  <n-tag size="small" :bordered="false" type="info">腾讯云</n-tag>
                  <n-tag size="small" :bordered="false" type="success">iOS开发</n-tag>
                  <n-tag size="small" :bordered="false" type="warning">客户端开发</n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-grid-item>

      <!-- 教育背景 -->
      <n-grid-item :span="12">
        <n-card title="教育背景" class="shadow-card">
          <n-timeline>
            <n-timeline-item
              type="success"
              title="西北大学"
              content="软件工程专业 研究生"
              time="2024 - 至今"
            >
              <template #icon>
                <n-icon><BookOutlined /></n-icon>
              </template>
              <n-space vertical>
                <n-text depth="3">研究方向：医学影像处理</n-text>
                <n-text depth="3">导师：崔磊</n-text>
                <n-space>
                  <n-tag size="small" :bordered="false" type="success">推免研究生</n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>

            <n-timeline-item
              type="info"
              title="西北大学"
              content="软件工程专业 本科"
              time="2020 - 2024"
            >
              <template #icon>
                <n-icon><BookOutlined /></n-icon>
              </template>
              <n-space vertical>
                <n-text depth="3">担任职务：</n-text>
                <n-space>
                  <n-tag size="small" :bordered="false" type="success">班长</n-tag>
                  <n-tag size="small" :bordered="false" type="info">辅导员助理</n-tag>
                  <n-tag size="small" :bordered="false" type="warning">党支部纪检党小组组长</n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-grid-item>

      <!-- 个人兴趣爱好 -->
      <n-grid-item :span="24">
        <n-card title="兴趣爱好" class="shadow-card">
          <n-grid :cols="4" :x-gap="16">
            <n-grid-item v-for="(hobby, index) in hobbies" :key="index">
              <div class="hobby-item" :class="{ 'hobby-active': hobby.active }">
                <n-icon
                  :component="hobby.icon"
                  :color="hobby.color"
                  size="36"
                  class="hobby-icon"
                />
                <h3 class="hobby-title">{{ hobby.title }}</h3>
                <p class="hobby-desc">{{ hobby.description }}</p>
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
  BookOutlined,
  TrophyOutlined,
  CodeOutlined,
  RocketOutlined,
  CameraOutlined,
  ReadOutlined,
  CompassOutlined,
  CustomerServiceOutlined
} from '@vicons/antd'

const workExperience = [
  {
    company: 'XX科技有限公司',
    position: '高级前端开发工程师',
    time: '2020 - 至今',
    type: 'success',
    icon: RocketOutlined,
    description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目。',
    technologies: [
      { name: 'Vue3', color: '#42b883' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Node.js', color: '#68a063' }
    ]
  },
  {
    company: 'YY互联网公司',
    position: '前端开发工程师',
    time: '2018 - 2020',
    type: 'info',
    icon: CodeOutlined,
    description: '参与公司电商平台的开发和维护，负责性能优化和用户体验改进。',
    technologies: [
      { name: 'React', color: '#61dafb' },
      { name: 'Redux', color: '#764abc' },
      { name: 'Webpack', color: '#8dd6f9' }
    ]
  }
]

const education = [
  {
    school: 'XX大学',
    degree: '计算机科学与技术 硕士',
    time: '2015 - 2018',
    type: 'success',
    icon: BookOutlined,
    description: '主修人工智能和Web开发相关课程',
    achievements: ['优秀毕业生', '学术奖学金', '发表论文2篇']
  },
  {
    school: 'YY大学',
    degree: '软件工程 学士',
    time: '2011 - 2015',
    type: 'info',
    icon: TrophyOutlined,
    description: '主修软件开发和项目管理课程',
    achievements: ['专业前10%', '多次获得奖学金']
  }
]

const hobbies = [
  {
    title: '摄影',
    description: '记录生活中的美好瞬间',
    icon: CameraOutlined,
    color: '#f5222d',
    active: false
  },
  {
    title: '阅读',
    description: '享受知识的海洋',
    icon: ReadOutlined,
    color: '#722ed1',
    active: false
  },
  {
    title: '旅行',
    description: '探索世界的每个角落',
    icon: CompassOutlined,
    color: '#13c2c2',
    active: false
  },
  {
    title: '音乐',
    description: '感受旋律的魅力',
    icon: CustomerServiceOutlined,
    color: '#52c41a',
    active: false
  }
]
</script>

<style scoped>
.about-container {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.intro-header {
  padding: 32px;
}

.avatar-wrapper {
  position: relative;
  margin-right: 32px;
}

.intro-avatar {
  border: 4px solid white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.avatar-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ring-rotate 10s linear infinite;
}

@keyframes ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.intro-text {
  text-align: left;
}

.intro-name {
  font-size: 36px;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.intro-title {
  font-size: 18px;
  margin: 0 0 16px 0;
  opacity: 0.8;
}

.hobby-item {
  text-align: center;
  padding: 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hobby-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-4px);
}

.hobby-icon {
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.hobby-item:hover .hobby-icon {
  transform: scale(1.2);
}

.hobby-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: bold;
}

.hobby-desc {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.hobby-active {
  background-color: #f5f5f5;
}
</style> 