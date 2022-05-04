<template>
  <PageContainer>
    <el-card>
      <template #header>
        <el-button @click="pageBack">
          <el-icon>
            <Back />
          </el-icon>
          返回
        </el-button>
      </template>
      <el-form
        label-width="100px"
        :model="product"
      >
        <el-form-item
          label="商品名称"
          prop="store_name"
          required
        >
          <el-input
            v-model="product.store_name"
          />
        </el-form-item>
        <el-form-item
          label="商品关键字"
          prop="keyword"
          required
        >
          <el-input
            v-model="product.keyword"
          />
        </el-form-item>
        <el-form-item
          label="单位"
          prop="unit_name"
          required
        >
          <el-input
            v-model="product.unit_name"
          />
        </el-form-item>
        <el-form-item
          label="商品封面图(最多1张)"
          prop="unit_name"
          required
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品推荐图(最多1张)"
          prop="unit_name"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品轮播图(最多10张)"
          prop="unit_name"
          required
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品规格"
        >
          <el-radio-group
            v-model="product.spec_type"
          >
            <el-radio
              :label="0"
            >
              单规格
            </el-radio>
            <el-radio
              :label="1"
            >
              多规格
            </el-radio>
          </el-radio-group>
          <AttrTable
            v-model="singleAttrData"
            v-if="product.spec_type === 0"
          />
        </el-form-item>
        <el-form-item
          label="规格模板"
          v-if="product.spec_type === 1"
        >
          <el-space
            direction="vertical"
            style="width: 100%"
          >
            <AttrTemplate
              @confirm="productAttrs = $event"
            />
            <AttrEdit
              v-if="productAttrs"
              v-model="productAttrs"
              @on-product-attr-generated="onProductAttrGenerated"
            />
            <template v-if="multiAttrData.length">
              批量设置
              <AttrTable
                v-model="multiAttrDataOrigin"
              >
                <template #append>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="120"
                  >
                    <template #default>
                      <el-button
                        @click="batchSetMultiAttrData"
                        type="text"
                        size="small"
                      >
                        批量设置
                      </el-button>
                      <el-button
                        @click="clearMultiAttrDataOrigin"
                        type="text"
                        size="small"
                      >
                        清空
                      </el-button>
                    </template>
                  </el-table-column>
                </template>
              </AttrTable>
              商品属性
              <AttrTable
                v-model="multiAttrData"
              >
                <template #prepend>
                  <el-table-column
                    v-for="attr in productExtraAttr"
                    :key="attr.key"
                    :prop="attr.key"
                    :label="attr.title"
                  />
                </template>
                <template #append>
                  <el-table-column
                    label="操作"
                    fixed="right"
                  >
                    <template #default="{ $index }">
                      <el-button
                        @click="deleteProductAttr($index)"
                        type="text"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </template>
              </AttrTable>
            </template>
          </el-space>
        </el-form-item>
        <el-form-item
          label="商品详情"
        >
          <AppEditor
            ref="editorRef"
          />
        </el-form-item>
        <el-form-item
          label="活动优先级"
        >
          <AppDraggable
            v-model="activities"
          >
            <el-tag
              v-for="activity in activities"
              :key="activity.name"
              :type="activity.type"
              effect="dark"
            >
              {{ activity.name }}
            </el-tag>
          </AppDraggable>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="requestCreateProduct"
            type="primary"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </PageContainer>
</template>

<script lang='ts' setup>
import PageContainer from '@/components/page-container/AppPageContainer.vue'
import { Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import AppEditor from '@/components/editor/AppEditor.vue'
import { computed, ref, watch } from 'vue'
import AppDraggable from '@/components/draggable/AppDraggable.vue'
import { AttrRuleValue, AttrTableHeader, ProductAttr } from '@/api/types/product'
import AttrTable from './AttrTable.vue'
import AttrTemplate from './AttrTemplate.vue'
import AttrEdit from './AttrEdit.vue'
import { createProduct } from '@/api/product'
import { ElMessage } from 'element-plus'

const router = useRouter()
const pageBack = () => {
  router.back()
}

const editorRef = ref<InstanceType<typeof AppEditor>>()
const requestCreateProduct = async () => {
  const rsp = await createProduct(product.value)
  if (rsp.code === 200) ElMessage.success('成功')
}

const activities = ref([
  {
    type: 'danger',
    name: '砍价'
  },
  {
    type: 'warning',
    name: '活动'
  },
  {
    type: 'info',
    name: '秒杀'
  },
  {
    type: 'success',
    name: '拼团'
  }
])

const product = ref({
  activity: computed(() => activities.value.map(item => item.name)),
  attrs: [] as ProductAttr[], // 商品规格
  cate_id: [226],
  command_word: '',
  couponName: [],
  coupon_ids: [],
  description: '231',
  ficti: 0,
  give_integral: 0,
  header: [] as AttrTableHeader[],
  id: 0,
  image: 'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  is_benefit: 0,
  is_best: 0,
  is_good: 0,
  is_hot: 0,
  is_new: 0,
  is_postage: 0,
  is_show: 1,
  is_sub: [],
  items: [] as AttrRuleValue[],
  keyword: '',
  label_id: [],
  recommend_image: 'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  selectRule: '',
  slider_image: [
    'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagounews.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg'
  ],
  sort: 0,
  spec_type: 0 as 0 | 1, // 0 单规格、1 多规格
  store_info: '',
  store_name: '',
  temp_id: '',
  unit_name: '',
  video_link: ''
})

const productAttrItem = {
  pic: 'https://shop.fed.lagounews.com/uploads/attach/2022/04/20220430/2ae1e4641bd7551678234d2ba9731a49.jpg',
  vip_price: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  bar_code: '',
  weight: 0,
  volume: 0,
  brokerage: 0,
  brokerage_two: 0
}
const getProductAttrItem = () => JSON.parse(JSON.stringify(productAttrItem))
const singleAttrData = ref<ProductAttr[]>([getProductAttrItem()])
const multiAttrDataOrigin = ref<ProductAttr[]>([getProductAttrItem()])
const multiAttrData = ref<ProductAttr[]>([])
const clearMultiAttrDataOrigin = () => {
  multiAttrDataOrigin.value = [getProductAttrItem()]
}
const batchSetMultiAttrData = () => {
  const validOrigin: Record<string, any> = {}
  let key: keyof typeof multiAttrDataOrigin.value[0]
  for (key in multiAttrDataOrigin.value[0]) {
    if (multiAttrDataOrigin.value[0][key]) {
      validOrigin[key] = multiAttrDataOrigin.value[0][key]
    }
  }
  multiAttrData.value.forEach(item => Object.assign(item, validOrigin))
}

watch([singleAttrData, multiAttrData, () => product.value.spec_type], () => {
  product.value.attrs = product.value.spec_type === 0 ? singleAttrData.value : multiAttrData.value
}, {
  deep: true,
  immediate: true
})

const productAttrs = ref<AttrRuleValue[]>()

const onProductAttrGenerated = (data: {attr: AttrRuleValue[], header: AttrTableHeader[], value: ProductAttr[]}) => {
  product.value.items = data.attr
  product.value.header = data.header
  multiAttrData.value = data.value
}
const productExtraAttr = computed(() => { return product.value.header.filter(item => item.key && item.key.startsWith('value')) })

const deleteProductAttr = (index: number) => {
  multiAttrData.value.splice(index, 1)
}

</script>

<style lang='scss' scoped>

</style>
