<template>
  <el-form
    @submit.prevent=""
  >
    <AppDraggable
      v-model="attrRuleValues"
      :options="{
        handle: '.el-icon'
      }"
    >
      <el-form-item
        v-for="(item, index) in attrRuleValues"
        :key="item.value"
      >
        <template #label>
          <el-icon
            size="16px"
          >
            <Sort />
          </el-icon>
        </template>
        <div>
          <div>
            <el-tag
              effect="dark"
              closable
              @close="attrRuleValues.splice(index, 1)"
            >
              {{ item.value }}
            </el-tag>
          </div>
          <div>
            <el-space>
              <AppDraggable
                v-model="item.detail"
              >
                <el-tag
                  v-for="(tag, index1) in item.detail"
                  :key="tag"
                  class="mx-1"
                  closable
                  @close="item.detail.splice(index1, 1)"
                >
                  {{ tag }}
                </el-tag>
              </AppDraggable>
              <el-input
                :ref="bindInputRef"
                v-if="item.inputVisible"
                v-model="item.inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="addAttrDetailValue(item)"
                @blur="addAttrDetailValue(item)"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                size="small"
                @click="showAddAttrInput(item)"
              >
                + New Tag
              </el-button>
            </el-space>
          </div>
        </div>
      </el-form-item>
    </AppDraggable>
    <el-form-item
      v-if="!isAddAttr"
    >
      <template #label>
        <el-icon
          style="visibility: hidden"
        >
          <Sort />
        </el-icon>
      </template>
      <div style="margin-top: 8px">
        <el-button
          @click="showAddAttrForm"
        >
          添加模板
        </el-button>
        <el-button
          type="success"
          @click="requestGenerate"
        >
          立即生成
        </el-button>
      </div>
    </el-form-item>
    <el-form-item
      v-else
    >
      <el-form
        inline
        :model="attr"
      >
        <el-form-item
          label="规格名称"
          prop="value"
          required
        >
          <el-input
            v-model="attr.value"
          />
        </el-form-item>
        <el-form-item
          label="规格值"
          prop="detail"
          required
        >
          <el-input
            v-model="attr.detail[0]"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addAttr"
            type="success"
          >
            确定
          </el-button>
          <el-button>
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { nextTick, PropType, ref, watch } from 'vue'
import { AttrRuleValue } from '@/api/types/product'
import { createProductAttrs } from '@/api/product'
import { Sort } from '@element-plus/icons-vue'
import AppDraggable from '@/components/draggable/AppDraggable.vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})
const emit = defineEmits(['onProductAttrGenerated', 'update:modelValue'])

const attrRuleValues = ref<AttrRuleValue[]>([])
watch(() => props.modelValue, (newValue) => {
  // 换个名字修改props，不监听数组内部变化，引用变化时触发，deep: false
  attrRuleValues.value = newValue
  attrRuleValues.value.forEach(item => {
    item.inputValue = ''
    item.inputVisible = false
  })
}, {
  immediate: true
})
// watch(attrRuleValues, (newValue) => {
//   console.log('cycle attrRuleValues')
//   emit('update:modelValue', newValue)
// }, {
//   deep: true
// })
// const inputRef = ref<HTMLInputElement>()
const showAddAttrInput = async (item: AttrRuleValue) => {
  item.inputVisible = true
  // await nextTick()
  // console.log(inputRef.value)
  // inputRef.value?.focus()
}
const addAttrDetailValue = (item: AttrRuleValue) => {
  if (item.inputValue) item.detail.push(item.inputValue)
  item.inputValue = ''
  item.inputVisible = false
}

const requestGenerate = async () => {
  const rsp = await createProductAttrs(0, 1, { attrs: props.modelValue })
  emit('onProductAttrGenerated', rsp.info)
}

const bindInputRef = async (el: HTMLInputElement) => {
  await nextTick()
  if (el) el.focus()
}

const isAddAttr = ref(false)
const attr = ref<AttrRuleValue>()
const showAddAttrForm = () => {
  attr.value = {
    value: '',
    detail: [''],
    inputVisible: false,
    inputValue: ''
  }
  isAddAttr.value = true
}
const addAttr = () => {
  if (attr.value) attrRuleValues.value.push(attr.value)
  isAddAttr.value = false
}
</script>

<style lang='scss' scoped>

</style>
