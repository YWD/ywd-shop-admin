<template>
  <div class="home-container">
    Home index
  </div>
  <el-button>按钮</el-button>
</template>

<script lang='ts' setup>
import { loginInfo } from '@/api/login'
import { onMounted } from 'vue'

onMounted(async () => {
  const data = await loginInfo()
  console.log(data.login_logo)
})
</script>

<style lang='scss' scoped>
//@import 'src/styles/variables'; vite.config.js css
.home-container {
  color: $color;
}
</style>
