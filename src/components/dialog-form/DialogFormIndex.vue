<template>
  <el-dialog
    ref="dialogRef"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="confirmSubmit"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { PropType, ref } from 'vue'
import { DialogInstance } from '@/types/element-plus'

// const emit = defineEmits(['success'])
const props = defineProps({
  submit: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

const dialogRef = ref<DialogInstance>()
const cancel = () => {
  dialogRef.value!.visible = false
}

const confirmLoading = ref(false)
const confirmSubmit = async () => {
  confirmLoading.value = true
  await props.submit().finally(() => {
    confirmLoading.value = false
  })
  cancel()
}
</script>

<style lang='scss' scoped>

</style>
