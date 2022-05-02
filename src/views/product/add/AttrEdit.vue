<template>
  <el-form
    label-position="top"
  >
    <el-form-item
      v-for="item in props.modelValue"
      :key="item.value"
      :label="item.value"
    >
      <el-tag
        v-for="tag in item.detail"
        :key="tag"
        class="mx-1"
        closable
      >
        {{ tag }}
      </el-tag>
    </el-form-item>
    <el-form-item>
      <el-button>
        添加模板
      </el-button>
      <el-button
        type="success"
        @click="requestGenerate"
      >
        立即生成
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { AttrRuleValue } from '@/api/types/product'
import { createProductAttrs } from '@/api/product'

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})
const emit = defineEmits(['onProductAttrGenerated'])

const requestGenerate = async () => {
  const rsp = await createProductAttrs(0, 1, { attrs: props.modelValue })
  emit('onProductAttrGenerated', rsp.info)
}
</script>

<style lang='scss' scoped>

</style>
