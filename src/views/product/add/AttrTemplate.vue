<template>
  <div>
    <el-select
      v-model="value"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.rule_name"
        :value="item.id"
      />
    </el-select>
    <el-button
      type="primary"
      @click="handleConfirm"
      style="margin-left: 12px"
    >
      确定
    </el-button>
    <el-button>
      添加规格模板
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getProductAttrs } from '@/api/product'
import type { AttrRuleValue, ProductAttrTpl } from '@/api/types/product'

interface EmitsType {
  (e: 'confirm', value: AttrRuleValue[]): void
}

const emit = defineEmits<EmitsType>()

const value = ref<number | null>(null)

const options = ref<ProductAttrTpl[]>([])

onMounted(() => {
  loadAttrs()
})

const loadAttrs = async () => {
  options.value = await getProductAttrs()
}

const handleConfirm = () => {
  if (value.value) {
    const item = options.value.find(item => item.id === value.value)
    if (item) {
      emit('confirm', item.rule_value)
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-space__item) {
  flex: 0;
}
</style>
