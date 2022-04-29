<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="formUser"
      :rules="formRules"
      @submit.prevent="requestLogin"
    >
      <img
        src="src/assets/login-logo.png"
        alt="登录logo"
        style="height: 80px"
      >
      <el-form-item
        prop="name"
      >
        <el-input
          placeholder="请输入用户名"
          v-model="formUser.account"
        >
          <template #prefix>
            <el-icon>
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入密码"
          v-model="formUser.pwd"
        >
          <template #prefix>
            <el-icon>
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <el-input
            placeholder="请输入验证码"
            v-model="formUser.imgcode"
          >
            <template #prefix>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
          <img
            :src="captchaSrc"
            alt="验证码"
            style="height: 31px;"
            @click="requestCaptcha"
          >
        </div>
      </el-form-item>
      <el-button
        type="primary"
        native-type="submit"
      >
        登录
      </el-button>
      <el-button
        @click="resetForm"
      >
        重置
      </el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { captcha, login } from '@/api/login'
import { useRouter } from 'vue-router'
import useMainStore from '@/store/store_index'

const router = useRouter()
const mainStore = useMainStore()
const formRef = ref<FormInstance>()
const formUser = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: '',
  age: 18,
  no: false
})
const formRules: FormRules = {
  name: [
    { required: true, message: 'please input name', trigger: 'blur' }
  ]
}
const captchaSrc = ref('')

const requestLogin = async () => {
  const valid = await formRef.value?.validate
  if (valid) {
    const loginUser = {
      account: formUser.account,
      pwd: formUser.pwd,
      imgcode: formUser.imgcode,
      age: 18 // todo
    }
    // const rsp = await reqLoginP(loginUser)
    // console.log(rsp.user_info.account)
    // await router.replace('/')
    login(loginUser).then(rsp => {
      rsp.user_info.token = rsp.token
      mainStore.setUser(rsp.user_info)
      let redirect = router.currentRoute.value.query.redirect
      if (typeof redirect !== 'string') redirect = '/'
      router.replace(redirect)
    }).catch(() => {})
  }
}
const resetForm = () => {
  formRef.value?.resetFields()
}
const requestCaptcha = async () => {
  const rsp = await captcha()
  captchaSrc.value = URL.createObjectURL(rsp)
}

onMounted(() => {
  requestCaptcha()
})
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
