<template>
  <AppPageContainer>
    <el-card>
      <el-form inline>
        <el-form-item label="商品分类:">
          <el-select>
            <el-option
              :value="123"
              :label="123"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态:">
          <el-select>
            <el-option
              :value="123"
              :label="123"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称:">
          <el-input>
            <template #append>
              <el-icon>
                <Search />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <el-button type="primary">
          <el-icon>
            <Plus />
          </el-icon>
          添加分类
        </el-button>
      </template>
      <el-table :data="productCategories">
        <el-table-column
          label="Id"
          prop="id"
        />
        <el-table-column
          label="分类名称"
          prop="cate_name"
          expanded
        />
        <el-table-column
          label="分类图标"
        >
          <template #default="scope">
            {{ scope.row.big_pic }}
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          prop="sort"
        />
        <el-table-column
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.show"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </AppPageContainer>
</template>

<script lang='ts' setup>

import AppPageContainer from '@/components/page-container/AppPageContainer.vue'
import { Search, Plus } from '@element-plus/icons-vue'
// import { getProductCategories } from '@/api/product'
import { onMounted, ref } from 'vue'
import { ProductCategory } from '@/api/types/product'
import { getProductCategories2 } from '@/api/product'

onMounted(() => {
  requestProductCategories()
})

const productCategories = ref<ProductCategory[]>()
const requestProductCategories = async () => {
  const rsp = await getProductCategories2({ page: 1, limit: 10 })
  productCategories.value = rsp.list
  productCategories.value?.forEach(item => { item.show = item.is_show === 1 })
}

</script>

<style lang='scss' scoped>

</style>
