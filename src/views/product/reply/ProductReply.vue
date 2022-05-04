<template>
  <AppPageContainer>
    <el-card>
      <el-form inline>
        <el-form-item
          label="时间选择"
          style="width: 100%"
        >
          <el-radio-group style="margin-bottom: 0">
            <el-radio-button label="top">
              全部
            </el-radio-button>
            <el-radio-button label="right">
              今天
            </el-radio-button>
            <el-radio-button label="bottom">
              昨天
            </el-radio-button>
            <el-radio-button label="left">
              最近七天
            </el-radio-button>
            <el-radio-button label="left">
              最近30天
            </el-radio-button>
            <el-radio-button label="left">
              本月
            </el-radio-button>
            <el-radio-button label="left">
              本年
            </el-radio-button>
          </el-radio-group>
          <el-date-picker
            type="daterange"
            v-model="queryForm.dateRange"
            style="width: 240px; margin-left: 16px"
          />
        </el-form-item>
        <el-form-item label="评价状态:">
          <el-select>
            <el-option
              :value="123"
              :label="123"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品信息:">
          <el-input />
        </el-form-item>
        <el-form-item label="用户名称:">
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
      <el-table :data="productReplies">
        <el-table-column
          label="Id"
          prop="id"
        />
        <el-table-column
          label="商品信息"
          prop="store_name"
          expanded
        />
        <el-table-column
          label="用户名称"
          prop="account"
        />
        <el-table-column
          label="评分"
          prop="product_score"
          sortable
        />
        <el-table-column
          label="评价内容"
          prop="comment"
        />
        <el-table-column
          label="回复内容"
          prop="merchant_reply_content"
        />
        <el-table-column
          label="评价时间"
          sortable
          prop="add_time"
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
import { onMounted, reactive, ref } from 'vue'
import { getProductReplies } from '@/api/product'
import { ProductReply } from '@/api/types/product'

const queryForm = reactive({
  dateRange: ''
})

onMounted(() => {
  requestProductReplies()
})

const productReplies = ref<ProductReply[]>()
const requestProductReplies = async () => {
  const rsp = await getProductReplies()
  productReplies.value = rsp.list
}
</script>

<style lang='scss' scoped>
:deep(.el-input__inner) {
  flex-grow: 0;
}
:deep(.el-range-input) {
  width: 90px;
}
</style>
