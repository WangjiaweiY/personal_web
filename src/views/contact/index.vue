<template>
  <div class="contact-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 联系卡片 -->
      <n-grid-item :span="24">
        <n-card class="shadow-card contact-card">
          <div class="contact-header">
            <n-avatar
              round
              :size="120"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              class="contact-avatar"
            />
            <h1 class="contact-title">联系我</h1>
            <p class="contact-subtitle">欢迎通过以下方式与我联系</p>
          </div>
        </n-card>
      </n-grid-item>

      <!-- 主要联系方式 -->
      <n-grid-item :span="12">
        <n-space vertical :size="16">
          <!-- QQ联系卡片 -->
          <n-card class="shadow-card contact-item">
            <div class="contact-content">
              <div class="contact-icon qq-icon">
                <n-icon size="36"><QqOutlined /></n-icon>
              </div>
              <div class="contact-info">
                <h3>QQ联系</h3>
                <p>3014639047</p>
                <n-space>
                  <n-button
                    type="primary"
                    secondary
                    round
                    @click="handleCopy('3014639047')"
                  >
                    <template #icon>
                      <n-icon><CopyOutlined /></n-icon>
                    </template>
                    复制QQ号
                  </n-button>
                  <n-button
                    type="info"
                    secondary
                    round
                    tag="a"
                    href="tencent://message/?uin=3014639047"
                  >
                    <template #icon>
                      <n-icon><MessageOutlined /></n-icon>
                    </template>
                    发起会话
                  </n-button>
                </n-space>
              </div>
            </div>
          </n-card>

          <!-- 微信联系卡片 -->
          <n-card class="shadow-card contact-item">
            <div class="contact-content">
              <div class="contact-icon wechat-icon">
                <n-icon size="36"><WechatOutlined /></n-icon>
              </div>
              <div class="contact-info">
                <h3>微信联系</h3>
                <p>JWW03287</p>
                <n-button
                  type="success"
                  secondary
                  round
                  @click="handleCopy('JWW03287')"
                >
                  <template #icon>
                    <n-icon><CopyOutlined /></n-icon>
                  </template>
                  复制微信号
                </n-button>
              </div>
            </div>
          </n-card>

          <!-- 电话联系卡片 -->
          <n-card class="shadow-card contact-item">
            <div class="contact-content">
              <div class="contact-icon phone-icon">
                <n-icon size="36"><PhoneOutlined /></n-icon>
              </div>
              <div class="contact-info">
                <h3>电话联系</h3>
                <p>18792309310</p>
                <n-button
                  type="warning"
                  secondary
                  round
                  @click="handleCopy('18792309310')"
                >
                  <template #icon>
                    <n-icon><CopyOutlined /></n-icon>
                  </template>
                  复制手机号
                </n-button>
              </div>
            </div>
          </n-card>
        </n-space>
      </n-grid-item>

      <!-- 其他联系方式 -->
      <n-grid-item :span="12">
        <n-space vertical :size="16">
          <!-- 邮箱联系卡片 -->
          <n-card class="shadow-card contact-item">
            <div class="contact-content">
              <div class="contact-icon email-icon">
                <n-icon size="36"><MailOutlined /></n-icon>
              </div>
              <div class="contact-info">
                <h3>邮箱联系</h3>
                <p>3014639047@qq.com</p>
                <n-button
                  type="info"
                  secondary
                  round
                  @click="handleCopy('3014639047@qq.com')"
                >
                  <template #icon>
                    <n-icon><CopyOutlined /></n-icon>
                  </template>
                  复制邮箱
                </n-button>
              </div>
            </div>
          </n-card>

          <!-- 社交平台卡片 -->
          <n-card class="shadow-card contact-item">
            <div class="contact-content">
              <div class="contact-icon social-icon">
                <n-icon size="36"><LinkOutlined /></n-icon>
              </div>
              <div class="contact-info">
                <h3>社交平台</h3>
                <n-space vertical>
                  <n-button
                    text
                    tag="a"
                    href="https://github.com/WangjiaweiY"
                    target="_blank"
                  >
                    <template #icon>
                      <n-icon><GithubOutlined /></n-icon>
                    </template>
                    GitHub主页
                  </n-button>
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
              </div>
            </div>
          </n-card>
        </n-space>
      </n-grid-item>

      <!-- 留言板 -->
      <n-grid-item :span="24">
        <n-card title="给我留言" class="shadow-card">
          <n-form>
            <n-form-item label="称呼">
              <n-input v-model:value="messageForm.name" placeholder="请输入您的称呼" />
            </n-form-item>
            <n-form-item label="联系方式">
              <n-input v-model:value="messageForm.contact" placeholder="请输入您的联系方式" />
            </n-form-item>
            <n-form-item label="留言内容">
              <n-input
                v-model:value="messageForm.content"
                type="textarea"
                placeholder="请输入留言内容"
                :rows="4"
              />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="handleSubmit">
                提交留言
              </n-button>
            </n-form-item>
          </n-form>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  QqOutlined,
  WechatOutlined,
  PhoneOutlined,
  MailOutlined,
  GithubOutlined,
  BookOutlined,
  LinkOutlined,
  CopyOutlined,
  MessageOutlined
} from '@vicons/antd'
import { useMessage } from 'naive-ui'

const message = useMessage()

const messageForm = ref({
  name: '',
  contact: '',
  content: ''
})

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text)
  message.success('复制成功')
}

const handleSubmit = () => {
  message.success('留言已提交')
  messageForm.value = {
    name: '',
    contact: '',
    content: ''
  }
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

.contact-card {
  background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
  color: white;
}

.contact-header {
  text-align: center;
  padding: 32px;
}

.contact-avatar {
  border: 4px solid white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
}

.contact-title {
  font-size: 32px;
  margin: 16px 0 8px;
}

.contact-subtitle {
  font-size: 16px;
  opacity: 0.8;
}

.contact-item {
  height: calc(33.33% - 11px);
}

.contact-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.contact-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qq-icon {
  background-color: rgba(24, 144, 255, 0.1);
  color: #1890ff;
}

.wechat-icon {
  background-color: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.phone-icon {
  background-color: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.email-icon {
  background-color: rgba(114, 46, 209, 0.1);
  color: #722ed1;
}

.social-icon {
  background-color: rgba(245, 34, 45, 0.1);
  color: #f5222d;
}

.contact-info {
  flex: 1;
}

.contact-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.contact-info p {
  margin: 0 0 16px 0;
  color: #666;
  font-size: 16px;
}
</style> 