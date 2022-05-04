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
          <el-input
            v-model="queryForm.store_name"
          >
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
        <el-button
          v-if="queryForm.type === 2"
        >
          批量上架
        </el-button>
        <el-button
          v-if="queryForm.type === 1"
        >
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
        @sort-change="changeProductsSort"
        @selection-change="selectProducts"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <el-form
              inline
              class="table-expand-form"
            >
              <el-form-item
                label="商品分类"
              >
                {{ scope.row.cate_name }}
              </el-form-item>
              <el-form-item
                label="市场价格"
              >
                {{ scope.row.ot_price }}
              </el-form-item>
              <el-form-item
                label="成本价"
              >
                {{ scope.row.cost }}
              </el-form-item>
              <el-form-item
                label="收藏数量"
              >
                {{ scope.row.collect }}
              </el-form-item>
              <el-form-item
                label="虚拟销量"
              >
                {{ scope.row.ficti }}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
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
          sortable
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
              查看评论
            </el-button>
            <el-button
              type="text"
              size="small"
            >
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
import { onMounted, reactive, ref, watch } from 'vue'
import { Product, ProductCategory, ProductStockCategory } from '@/api/types/product'
import PaginationIndex from '@/components/pagination/AppPagination.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const queryForm = reactive({
  page: 1,
  limit: 10,
  cate_id: 0,
  store_name: '',
  type: 1,
  sales: 'normal' as 'normal' | 'asc' | 'desc'
})

onMounted(() => {
  requestProductCategories()
  requestProductStockCategories()
  requestProducts()
})

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
  if (!selectedProducts.value) return ElMessage.warning('请勾选商品')
  const { jsonToExcel } = await import('@/utils/export-to-excel')

  jsonToExcel({
    data: selectedProducts.value,
    fileName: '产品列表.xlsx',
    bookType: 'xlsx'
  })
}

const router = useRouter()
const goProductAdd = () => {
  router.push('/product/add')
}

const changeProductsSort = ({ order }: { order: string }) => {
  if (order === 'ascending') queryForm.sales = 'asc'
  else queryForm.sales = 'desc'
}
watch(queryForm, () => {
  requestProducts()
}, {
  deep: true
})

const selectedProducts = ref<Product[]>()
const selectProducts = (value: any) => {
  selectedProducts.value = value
}
</script>

<style lang='scss' scoped>
.table-expand-form {
  width: 100%;
  .el-form-item {
    width: 50%;
    margin-right: 0;
    padding-left: 60px;
  }
}
</style>
