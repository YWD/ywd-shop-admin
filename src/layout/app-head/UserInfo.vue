<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ mainStore.user?.account }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :icon="Plus"
          @click="requestLogout"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts' setup>
import useMainStore from '@/store/store_index'
import { Plus } from '@element-plus/icons-vue'
import { logout } from '@/api/login'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const router = useRouter()

const requestLogout = () => {
  ElMessageBox.confirm('确认退出吗？', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    logout().then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
      mainStore.setUser(null)
      // router.replace('/login')
      router.replace({
        name: 'login'
      })
    }).catch(() => {})
  }).catch(() => {})
}
</script>

<style lang='scss' scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
