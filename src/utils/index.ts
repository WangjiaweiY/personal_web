import { h } from 'vue'
import type { Component } from 'vue'
import {
  BookOutlined,
  UserOutlined,
  ProjectOutlined,
  ToolOutlined,
  PhoneOutlined,
  TrophyOutlined
} from '@vicons/antd'
import { NIcon } from 'naive-ui/es/icon'

interface MenuOption {
  label: string
  key: string
  icon?: () => Component
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
    icon: renderIcon(BookOutlined)
  },
  {
    label: '关于我',
    key: 'about',
    icon: renderIcon(UserOutlined)
  },
  {
    label: '技能特长',
    key: 'skills',
    icon: renderIcon(ToolOutlined)
  },
  {
    label: '项目经历',
    key: 'projects',
    icon: renderIcon(ProjectOutlined)
  },
  {
    label: '获奖经历',
    key: 'awards',
    icon: renderIcon(TrophyOutlined)
  },
  {
    label: '联系方式',
    key: 'contact',
    icon: renderIcon(PhoneOutlined)
  }
] 