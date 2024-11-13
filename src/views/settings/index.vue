<template>
  <div class="settings-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- 个人资料设置 -->
      <n-grid-item :span="16">
        <n-card title="个人资料" class="shadow-card">
          <n-form
            ref="formRef"
            :model="profileForm"
            :rules="rules"
            label-placement="left"
            label-width="100"
            require-mark-placement="right-hanging"
          >
            <n-form-item label="头像" path="avatar">
              <div class="avatar-upload">
                <n-avatar
                  round
                  :size="100"
                  :src="profileForm.avatar"
                  class="preview-avatar"
                />
                <n-upload
                  accept="image/*"
                  :show-file-list="false"
                  @change="handleAvatarUpload"
                >
                  <n-button>更换头像</n-button>
                </n-upload>
              </div>
            </n-form-item>
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="profileForm.username" placeholder="请输入用户名" />
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
              <n-input v-model:value="profileForm.nickname" placeholder="请输入昵称" />
            </n-form-item>
            <n-form-item label="个人简介" path="bio">
              <n-input
                v-model:value="profileForm.bio"
                type="textarea"
                placeholder="请输入个人简介"
                :rows="3"
              />
            </n-form-item>
            <n-form-item label="职业" path="profession">
              <n-input v-model:value="profileForm.profession" placeholder="请输入您的职业" />
            </n-form-item>
            <n-form-item label="所在地" path="location">
              <n-input v-model:value="profileForm.location" placeholder="请输入所在地" />
            </n-form-item>
            <n-form-item>
              <n-space>
                <n-button type="primary" @click="handleSaveProfile">
                  保存修改
                </n-button>
                <n-button @click="resetForm">
                  重置
                </n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-grid-item>

      <!-- 账号安全设置 -->
      <n-grid-item :span="8">
        <n-space vertical :size="16">
          <!-- 密码修改 -->
          <n-card title="账号安全" class="shadow-card">
            <n-space vertical>
              <div class="security-item">
                <div class="security-info">
                  <n-icon size="20" color="#52c41a">
                    <LockOutlined />
                  </n-icon>
                  <span>登录密码</span>
                </div>
                <n-button text type="primary" @click="showPasswordModal = true">
                  修改
                </n-button>
              </div>
              <n-divider />
              <div class="security-item">
                <div class="security-info">
                  <n-icon size="20" color="#1890ff">
                    <MailOutlined />
                  </n-icon>
                  <span>绑定邮箱</span>
                </div>
                <n-button text type="primary" @click="showEmailModal = true">
                  修改
                </n-button>
              </div>
              <n-divider />
              <div class="security-item">
                <div class="security-info">
                  <n-icon size="20" color="#722ed1">
                    <PhoneOutlined />
                  </n-icon>
                  <span>绑定手机</span>
                </div>
                <n-button text type="primary" @click="showPhoneModal = true">
                  修改
                </n-button>
              </div>
            </n-space>
          </n-card>

          <!-- 第三方账号绑定 -->
          <n-card title="账号绑定" class="shadow-card">
            <n-space vertical>
              <div class="security-item">
                <div class="security-info">
                  <n-icon size="20" color="#333">
                    <GithubOutlined />
                  </n-icon>
                  <span>GitHub</span>
                </div>
                <n-button text type="primary">
                  绑定
                </n-button>
              </div>
              <n-divider />
              <div class="security-item">
                <div class="security-info">
                  <n-icon size="20" color="#07c160">
                    <WechatOutlined />
                  </n-icon>
                  <span>微信</span>
                </div>
                <n-button text type="primary">
                  绑定
                </n-button>
              </div>
            </n-space>
          </n-card>
        </n-space>
      </n-grid-item>

      <!-- 通知设置 -->
      <n-grid-item :span="24">
        <n-card title="通知设置" class="shadow-card">
          <n-space vertical size="large">
            <div class="notification-item">
              <div class="notification-info">
                <h3>系统通知</h3>
                <p>接收系统更新、维护等通知</p>
              </div>
              <n-switch v-model:value="notifications.system" />
            </div>
            <n-divider />
            <div class="notification-item">
              <div class="notification-info">
                <h3>消息提醒</h3>
                <p>接收新消息、评论等提醒</p>
              </div>
              <n-switch v-model:value="notifications.message" />
            </div>
            <n-divider />
            <div class="notification-item">
              <div class="notification-info">
                <h3>邮件通知</h3>
                <p>接收重要更新的邮件通知</p>
              </div>
              <n-switch v-model:value="notifications.email" />
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- 修改密码弹窗 -->
    <n-modal v-model:show="showPasswordModal" preset="card" title="修改密码">
      <n-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
      >
        <n-form-item label="当前密码" path="oldPassword">
          <n-input
            v-model:value="passwordForm.oldPassword"
            type="password"
            placeholder="请输入当前密码"
          />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input
            v-model:value="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
          />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input
            v-model:value="passwordForm.confirmPassword"
            type="password"
            placeholder="请确认新密码"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showPasswordModal = false">取消</n-button>
          <n-button type="primary" @click="handleChangePassword">
            确认修改
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  GithubOutlined,
  WechatOutlined
} from '@vicons/antd'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const showPasswordModal = ref(false)
const showEmailModal = ref(false)
const showPhoneModal = ref(false)

// 个人资料表单
const profileForm = ref({
  avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  username: 'admin',
  nickname: '管理员',
  bio: '这个人很懒，什么都没有留下...',
  profession: '前端开发工程师',
  location: '北京'
})

// 表单验证规则
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur'
  }
}

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码表单验证规则
const passwordRules = {
  oldPassword: {
    required: true,
    message: '请输入当前密码',
    trigger: 'blur'
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur'
  },
  confirmPassword: {
    required: true,
    message: '请确认新密码',
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      return value === passwordForm.value.newPassword || new Error('两次输入的密码不一致')
    }
  }
}

// 通知设置
const notifications = ref({
  system: true,
  message: true,
  email: false
})

// 处理头像上传
const handleAvatarUpload = (options: any) => {
  const { file } = options
  // 这里可以处理文件上传逻辑
  message.success('头像上传成功')
}

// 保存个人资料
const handleSaveProfile = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('保存成功')
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value?.restoreValidation()
  // 重置表单数据
}

// 修改密码
const handleChangePassword = () => {
  message.success('密码修改成功')
  showPasswordModal.value = false
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}
</script>

<style scoped>
.settings-container {
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

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 24px;
}

.preview-avatar {
  border: 2px solid #eee;
  transition: all 0.3s ease;
}

.preview-avatar:hover {
  border-color: #1890ff;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.security-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.notification-info h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
}

.notification-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style> 