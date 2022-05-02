<template>
  <el-space
    direction="vertical"
  >
    <slot />
  </el-space>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
.el-space {
  width: 100%;
  :deep(.el-space__item) {
    width: 100%;
  }
}
</style>
