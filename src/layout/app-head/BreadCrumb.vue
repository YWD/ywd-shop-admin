<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="route in routes"
      :key="route.path"
    >
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

</script>

<style lang='scss' scoped>
</style>
