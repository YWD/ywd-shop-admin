<template>
  <PageContainer>
    <el-card>
      <template #header>
        数据筛选
      </template>
      <el-form inline>
        <el-form-item
          label="商品分类"
        >
          <el-select v-model="queryForm.cate_id">
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="category in productCategories"
              :key="category.id"
              :label="category.cate_name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input>
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="商品类目">
            <el-radio-group
              v-model="queryForm.type"
            >
              <el-radio
                v-for="stockCategory in productStockCategories"
                :key="stockCategory.type"
                :label="stockCategory.type"
              >
                {{ `${stockCategory.name}(${stockCategory.count})` }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <el-button
          type="primary"
          @click="goProductAdd"
        >
          <el-icon style="margin-right: 8px">
            <Plus />
          </el-icon>
          添加商品
        </el-button>
        <el-button>
          批量上架
        </el-button>
        <el-button>
          批量下架
        </el-button>
        <el-button
          @click="downloadProducts"
        >
          <el-icon style="margin-right: 8px">
            <Document />
          </el-icon>
          导出表格
        </el-button>
      </template>
      <el-table
        :data="products"
      >
        <el-table-column
          label="Id"
          prop="id"
        />
        <el-table-column
          label="商品图片"
        >
          <template #default="scope">
            <img
              :src="scope.row.image"
              alt="商品图片"
              style="width: 100%"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="store_name"
        />
        <el-table-column
          label="商品售价"
          prop="price"
        />
        <el-table-column
          label="销量"
          prop="sales"
        />
        <el-table-column
          label="库存"
          prop="stock"
        />
        <el-table-column
          label="排序"
          prop="sort"
        />
        <el-table-column
          label="状态"
          prop="is_show"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text">
              编辑 {{ scope.row.id }}
            </el-button>
            <el-button type="text">
              查看评论
            </el-button>
            <el-button type="text">
              恢复商品
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <PaginationIndex
        v-model:page="queryForm.page"
        v-model:limit="queryForm.limit"
        :total="productCount"
        :query-method="requestProducts"
      />
    </el-card>
  </PageContainer>
</template>

<script lang='ts' setup>
import { Document, Plus, Search } from '@element-plus/icons-vue'
import PageContainer from '@/components/page-container/AppPageContainer.vue'
import { getProductCategories, getProducts, getProductStockCategories } from '@/api/product'
import { onMounted, reactive, ref } from 'vue'
import { Product, ProductCategory, ProductStockCategory } from '@/api/types/product'
import PaginationIndex from '@/components/pagination/AppPagination.vue'
import { useRouter } from 'vue-router'

const queryForm = reactive({
  page: 1,
  limit: 10,
  cate_id: 0,
  type: 1
})

onMounted(() => {
  requestProductCategories()
  requestProductStockCategories()
  requestProducts()
})
getProducts().then(rsp => console.log(rsp))

const products = ref<Product[]>()
const productCount = ref(0)
const requestProducts = async () => {
  const rsp = await getProducts(queryForm)
  products.value = rsp.list
  productCount.value = rsp.count
}

const productStockCategories = ref<ProductStockCategory[]>()
const requestProductStockCategories = async () => {
  const rsp = await getProductStockCategories()
  productStockCategories.value = rsp.list
}

const productCategories = ref<ProductCategory[]>()
const requestProductCategories = async () => {
  productCategories.value = await getProductCategories()
}

const downloadProducts = async () => {
  if (!products.value) return
  const { jsonToExcel } = await import('@/utils/export-to-excel')

  jsonToExcel({
    data: products.value,
    fileName: '产品列表.xlsx',
    bookType: 'xlsx'
  })
}

const router = useRouter()
const goProductAdd = () => {
  router.push('/product/add')
}
</script>

<style lang='scss' scoped>

</style>
