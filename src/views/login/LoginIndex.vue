<template>
  <div class="login-container">
    <el-form
      size="medium"
    >
      <img
        src="src/assets/login-logo.png"
        alt="登录logo"
        style="height: 80px"
      >
      <el-form-item>
        <el-input placeholder="请输入用户名">
          <template #prefix>
            <el-icon>
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码">
          <template #prefix>
            <el-icon>
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <el-input placeholder="请输入验证码">
            <template #prefix>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
          <img
            src="https://shop.fed.lagounews.com/api/admin/captcha_pro?1651148848000"
            style="height: 31px;"
          >
        </div>
      </el-form-item>
      <el-button
        style="width: 100%"
        type="primary"
        size="large"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>

import { Key } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
}

.el-form {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
}
</style>
