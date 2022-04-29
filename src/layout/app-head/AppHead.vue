<template>
  <div class="app-head">
    <el-space :size="16">
      <ToggleSideBar />
      <BreadCrumb />
    </el-space>
    <el-space :size="16">
      <el-icon @click="toggleFullScreen">
        <full-screen />
      </el-icon>
      <UserInfo />
    </el-space>
  </div>
</template>

<script lang='ts' setup>
import ToggleSideBar from './ToggleSideBar.vue'
import BreadCrumb from '@/layout/app-head/BreadCrumb.vue'
import UserInfo from '@/layout/app-head/UserInfo.vue'

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang='scss' scoped>
.app-head {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}
</style>
