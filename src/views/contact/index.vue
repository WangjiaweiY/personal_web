<template>
  <div class="contact-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 联系卡片 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card intro-card">
          <div class="contact-header">
            <n-avatar
              round
              :size="120"
              src="./../../../imgs/touxiang.jpg"
              class="contact-avatar"
            />
            <div class="contact-info">
              <h1 class="contact-name">王嘉炜</h1>
              <p class="contact-title">Joeww Wang</p>
              <n-space>
                <n-tag type="info" round size="large" :bordered="false">
                  <template #icon>
                    <n-icon><MailOutlined /></n-icon>
                  </template>
                  3014639047@qq.com
                </n-tag>
              </n-space>
            </div>
          </div>
        </n-card>
      </n-grid-item>

      <!-- 主要联系方式 -->
      <n-grid-item :span="12">
        <n-card class="shadow-card">
          <template #header>
            <div class="card-header">
              <n-icon size="24" color="#1890ff">
                <ContactsOutlined />
              </n-icon>
              <span class="header-title">联系方式</span>
              <div class="header-line"></div>
            </div>
          </template>
          <n-space vertical size="large">
            <!-- QQ -->
            <div class="contact-item">
              <n-space align="center" :size="12">
                <div class="contact-icon">
                  <n-icon><QqOutlined /></n-icon>
                </div>
                <div class="contact-detail">
                  <div class="contact-type">QQ</div>
                  <div class="contact-value">3014639047</div>
                </div>
                <div class="contact-action">
                  <n-button 
                    text
                    size="small"
                    type="primary"
                    @click="handleCopy('3014639047')"
                    class="copy-button"
                  >
                    <template #icon>
                      <n-icon><CopyOutlined /></n-icon>
                    </template>
                    复制号码
                  </n-button>
                </div>
              </n-space>
            </div>

            <!-- 微信 -->
            <div class="contact-item">
              <n-space align="center" :size="12">
                <div class="contact-icon">
                  <n-icon><WechatOutlined /></n-icon>
                </div>
                <div class="contact-detail">
                  <div class="contact-type">微信</div>
                  <div class="contact-value">JWW03287</div>
                </div>
                <div class="contact-action">
                  <n-button 
                    text
                    size="small"
                    type="primary"
                    @click="handleCopy('JWW03287')"
                    class="copy-button"
                  >
                    <template #icon>
                      <n-icon><CopyOutlined /></n-icon>
                    </template>
                    复制号码
                  </n-button>
                </div>
              </n-space>
            </div>

            <!-- 电话 -->
            <div class="contact-item">
              <n-space align="center" :size="12">
                <div class="contact-icon">
                  <n-icon><PhoneOutlined /></n-icon>
                </div>
                <div class="contact-detail">
                  <div class="contact-type">电话</div>
                  <div class="contact-value">18792309310</div>
                </div>
                <div class="contact-action">
                  <n-button 
                    text
                    size="small"
                    type="primary"
                    @click="handleCopy('18792309310')"
                    class="copy-button"
                  >
                    <template #icon>
                      <n-icon><CopyOutlined /></n-icon>
                    </template>
                    复制号码
                  </n-button>
                </div>
              </n-space>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- 社交平台 -->
      <n-grid-item :span="12">
        <n-card class="shadow-card">
          <template #header>
            <div class="card-header">
              <n-icon size="24" color="#1890ff">
                <LinkOutlined />
              </n-icon>
              <span class="header-title">社交平台</span>
              <div class="header-line"></div>
            </div>
          </template>
          <n-space vertical size="large">
            <!-- GitHub -->
            <div class="contact-item">
              <n-space align="center" :size="12">
                <div class="contact-icon">
                  <n-icon><GithubOutlined /></n-icon>
                </div>
                <div class="contact-detail">
                  <div class="contact-type">GitHub</div>
                  <div class="contact-value">WangjiaweiY</div>
                </div>
                <div class="contact-action">
                  <n-button 
                    text
                    size="small"
                    type="primary"
                    tag="a"
                    href="https://github.com/WangjiaweiY"
                    target="_blank"
                    class="copy-button"
                  >
                    <template #icon>
                      <n-icon><LinkOutlined /></n-icon>
                    </template>
                    访问主页
                  </n-button>
                </div>
              </n-space>
            </div>

            <!-- CSDN -->
            <div class="contact-item">
              <n-space align="center" :size="12">
                <div class="contact-icon">
                  <n-icon><BookOutlined /></n-icon>
                </div>
                <div class="contact-detail">
                  <div class="contact-type">CSDN</div>
                  <div class="contact-value">m0_64403412</div>
                </div>
                <div class="contact-action">
                  <n-button 
                    text
                    size="small"
                    type="primary"
                    tag="a"
                    href="https://blog.csdn.net/m0_64403412?type=bbs"
                    target="_blank"
                    class="copy-button"
                  >
                    <template #icon>
                      <n-icon><LinkOutlined /></n-icon>
                    </template>
                    访问主页
                  </n-button>
                </div>
              </n-space>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  MailOutlined,
  PhoneOutlined,
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  BookOutlined,
  LinkOutlined,
  ContactsOutlined,
  CopyOutlined
} from '@vicons/antd'
import { useMessage } from 'naive-ui/es'

const message = useMessage()

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text)
  message.success('复制成功')
}
</script>

<style scoped>
.contact-container {
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

.contact-header {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;
}

.contact-avatar {
  border: 4px solid white;
  box-shadow: 0 0 20px rgba(24, 144, 255, 0.2);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-name {
  font-size: 28px;
  margin: 0;
  color: #1890ff;
  font-weight: bold;
}

.contact-title {
  font-size: 18px;
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
}

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

.contact-item {
  padding: 16px;
  border-radius: 8px;
  background: rgba(24, 144, 255, 0.05);
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-2px);
  background: rgba(24, 144, 255, 0.1);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(24, 144, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  font-size: 20px;
}

.contact-detail {
  flex: 1;
}

.contact-type {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.contact-value {
  font-size: 16px;
  color: #1890ff;
  font-weight: 500;
}

.contact-action {
  margin-left: auto;
}

.contact-action :deep(.n-button) {
  transition: all 0.3s ease;
}

.contact-action :deep(.n-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.copy-button {
  padding: 4px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #1890ff !important;
  background-color: rgba(24, 144, 255, 0.1);
}

.copy-button:hover {
  background-color: rgba(24, 144, 255, 0.2);
  transform: translateY(-2px);
}

/* 深色模式适配 */
:deep([data-theme='dark']) {
  .intro-card {
    background: linear-gradient(135deg, #141414 0%, #1f1f1f 100%);
  }

  .contact-name {
    color: #1890ff;
  }

  .contact-title {
    color: rgba(255, 255, 255, 0.85);
  }

  .header-title {
    color: #1890ff;
  }

  .header-line {
    background: linear-gradient(90deg, #1890ff 0%, rgba(24, 144, 255, 0.1) 100%);
  }

  .contact-item {
    background: rgba(24, 144, 255, 0.05);
  }

  .contact-item:hover {
    background: rgba(24, 144, 255, 0.1);
  }

  .contact-type {
    color: rgba(255, 255, 255, 0.65);
  }

  .contact-value {
    color: #1890ff;
  }
}
</style> 