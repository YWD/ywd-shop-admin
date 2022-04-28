<template>
  <el-icon
    @click="toggleSideBar"
    size="24px"
  >
    <expand v-if="mainStore.collapse" />
    <fold v-else />
  </el-icon>
</template>

<script lang='ts' setup>
import useMainStore from '@/store/store_index'

const mainStore = useMainStore()
const toggleSideBar = () => {
  mainStore.collapse = !mainStore.collapse
}
</script>

<style lang='scss' scoped>

</style>
