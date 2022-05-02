<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>

<script lang='ts' setup>
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const containerRef = ref<HTMLDivElement>()

onMounted(() => {
  if (!containerRef.value) return
  Sortable.create(containerRef.value, {
    animation: 300,
    onUpdate: (event) => {
      const oldIndex = event.oldIndex
      const newIndex = event.newIndex
      if (oldIndex !== undefined && newIndex !== undefined) {
        const list = props.modelValue
        const element = list?.splice(oldIndex, 1)[0]
        list?.splice(newIndex, 0, element)
        emit('update:modelValue', list)
        console.log(list)
      }
    }
  })
})
</script>

<style lang='scss' scoped>

</style>
