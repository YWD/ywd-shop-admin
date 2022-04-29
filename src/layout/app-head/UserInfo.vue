<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ mainStore.user?.account }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Plus">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts' setup>
import useMainStore from '@/store/store_index'
import { Plus } from '@element-plus/icons-vue'

const mainStore = useMainStore()
</script>

<style lang='scss' scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
