<template>
  <div class="awards-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 获奖统计卡片 -->
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

      <!-- 主要获奖经历 -->
      <n-grid-item :span="24">
        <n-card title="获奖经历" class="shadow-card">
          <n-timeline>
            <n-timeline-item
              v-for="award in awards"
              :key="award.name"
              :type="award.type"
              :title="award.name"
              :content="award.level"
              :time="award.date"
            >
              <template #icon>
                <n-icon :component="award.icon" />
              </template>
              <n-space vertical>
                <n-text depth="3">{{ award.description }}</n-text>
                <n-space>
                  <n-tag
                    v-for="(tag, index) in award.tags"
                    :key="index"
                    size="small"
                    :bordered="false"
                    :type="award.type"
                  >
                    {{ tag }}
                  </n-tag>
                </n-space>
              </n-space>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-grid-item>

      <!-- 荣誉证书展示 -->
      <n-grid-item :span="24">
        <n-card title="荣誉证书" class="shadow-card">
          <n-grid :cols="6" :x-gap="16" :y-gap="16">
            <n-grid-item v-for="cert in certificates" :key="cert.name">
              <n-card hoverable class="cert-card">
                <template #cover>
                  <img :src="cert.image" class="cert-image" />
                </template>
                <h3 class="cert-name">{{ cert.name }}</h3>
                <p class="cert-date">{{ cert.date }}</p>
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
  TrophyOutlined,
  CrownOutlined,
  StarOutlined,
  RocketOutlined,
  HeartOutlined
} from '@vicons/antd'

const statistics = [
  { label: '获奖总数', value: '10+', icon: TrophyOutlined, color: '#f5222d' },
  { label: '校级奖项', value: '6', icon: CrownOutlined, color: '#faad14' },
  { label: '省级奖项', value: '1', icon: StarOutlined, color: '#1890ff' },
  { label: '其他荣誉', value: '3', icon: RocketOutlined, color: '#52c41a' }
]

const awards = [
  {
    name: '校级一等奖学金',
    level: '校级',
    date: '2023-2024',
    type: 'success',
    icon: TrophyOutlined,
    description: '获得2023-2024学年校级一等奖学金',
    tags: ['奖学金', '校级']
  },
  {
    name: '中海油助学金',
    level: '企业奖学金',
    date: '2023-2024',
    type: 'info',
    icon: StarOutlined,
    description: '获得2023-2024学年中海油助学金',
    tags: ['助学金', '企业奖学金']
  },
  {
    name: '校级一等奖学金',
    level: '校级',
    date: '2022-2023',
    type: 'success',
    icon: TrophyOutlined,
    description: '获得2022-2023学年校级一等奖学金',
    tags: ['奖学金', '校级']
  },
  {
    name: '军训优秀参训称号',
    level: '校级',
    date: '2023',
    type: 'info',
    icon: CrownOutlined,
    description: '2023年军训中表现优异，获得优秀参训称号',
    tags: ['军训', '荣誉称号']
  },
  {
    name: '优秀共青团员',
    level: '校级',
    date: '2023',
    type: 'success',
    icon: StarOutlined,
    description: '2023年获得优秀共青团员称号',
    tags: ['荣誉称号', '校级']
  },
  {
    name: '数学建模省级一等奖',
    level: '省级',
    date: '2022',
    type: 'warning',
    icon: TrophyOutlined,
    description: '2022年高教社全国大学生数学建模比赛省级一等奖',
    tags: ['竞赛', '省级']
  },
  {
    name: '校级一等奖学金',
    level: '校级',
    date: '2021-2022',
    type: 'success',
    icon: TrophyOutlined,
    description: '获得2021-2022学年校级一等奖学金',
    tags: ['奖学金', '校级']
  },
  {
    name: '优秀志愿者',
    level: '社区级',
    date: '2022',
    type: 'info',
    icon: HeartOutlined,
    description: '2022年抗击疫情中获得社区颁发的"优秀志愿者"称号',
    tags: ['志愿服务', '社区级']
  },
  {
    name: '迎新晚会优秀奖',
    level: '院级',
    date: '2021-2022',
    type: 'info',
    icon: StarOutlined,
    description: '2021-2022学年信息学院迎新晚会优秀奖',
    tags: ['文艺活动', '院级']
  },
  {
    name: '运动会跳高第六名',
    level: '校级',
    date: '2021',
    type: 'info',
    icon: TrophyOutlined,
    description: '2021年运动会大一男子跳高第六名',
    tags: ['体育竞技', '校级']
  }
]

const certificates = [
  {
    name: '国家奖学金证书',
    date: '2023年',
    image: 'path/to/image1.jpg'  // 需要替换为实际的证书图片
  },
  {
    name: '优秀学生干部证书',
    date: '2023年',
    image: 'path/to/image2.jpg'  // 需要替换为实际的证书图片
  }
  // 可以继续添加其他证书
]
</script>

<style scoped>
.awards-container {
  padding: 16px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 8px;
}

.stat-card {
  transition: all 0.3s ease;
  padding: 16px;
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
  font-size: 28px;
  font-weight: bold;
  line-height: 1.2;
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

.cert-card {
  height: 100%;
  transition: all 0.3s ease;
}

.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cert-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.cert-name {
  margin: 12px 0 4px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cert-date {
  margin: 0;
  color: #666;
  font-size: 14px;
}

:deep(.n-timeline) {
  padding: 16px 24px;
}

:deep(.n-timeline-item) {
  margin-bottom: 24px;
}

:deep(.n-timeline-item-content) {
  margin-left: 24px;
}
</style> 