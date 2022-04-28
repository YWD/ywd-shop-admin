<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    text-color="#fff"
    :default-active="$route.path"
    :collapse="mainStore.collapse"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>首页</span>
      </template>
      <el-menu-item index="1-1">
        <el-icon><location /></el-icon>
        <span>首页-菜单一</span>
      </el-menu-item>
      <el-menu-item index="1-2">
        <el-icon><location /></el-icon>
        <span>首页-菜单二</span>
      </el-menu-item>
      <el-sub-menu index="1-3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>首页-子菜单</span>
        </template>
        <el-menu-item index="1-3-1">
          <el-icon><location /></el-icon>
          <span>首页-子菜单一</span>
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="product">
      <template #title>
        <el-icon><goods /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/list">
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/product/classify">
        <span>商品分类</span>
      </el-menu-item>
      <el-menu-item index="/product/attr">
        <span>商品规格</span>
      </el-menu-item>
      <el-menu-item index="/product/reply">
        <span>商品评论</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang='ts' setup>
import useMainStore from '@/store/store_index'

const mainStore = useMainStore()
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
