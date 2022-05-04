<template>
  <AppPageContainer>
    <el-card>
      <el-form inline>
        <el-form-item label="规格搜索:">
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
          添加商品规格
        </el-button>
        <el-button>
          批量删除
        </el-button>
      </template>
      <el-table :data="productAttrs">
        <el-table-column
          label="Id"
          prop="id"
        />
        <el-table-column
          label="规格名称"
          prop="rule_name"
          expanded
        />
        <el-table-column
          label="商品规格"
          prop="attr_name"
        />
        <el-table-column
          label="商品属性"
          prop="attr_value"
        />
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
import { onMounted, ref } from 'vue'
import { getProductAttr } from '@/api/product'
import { ProductAttrTpl } from '@/api/types/product'

onMounted(() => {
  requestProductAttrs()
})

const productAttrs = ref<ProductAttrTpl[]>()
const requestProductAttrs = async () => {
  const rsp = await getProductAttr()
  productAttrs.value = rsp.list
}
</script>

<style lang='scss' scoped>

</style>
