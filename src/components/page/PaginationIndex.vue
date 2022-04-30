<template>
  <el-pagination
    background
    layout="total,sizes,prev,pager,next,jumper"
    :page-size="props.limit"
    :current-page="props.curPage"
    :total="props.total"
    :page-sizes="[10, 2, 3, 4]"
    @size-change="pageSizeChange"
    @current-change="pageCurrentChange"
  />
</template>

<script lang='ts' setup>
// const propsD = defineProps({
//   curPage: {
//     type: Number,
//     default: 1,
//   },
//   pageSize: {
//     type: Number,
//     default: 10
//   }
// })
interface Prop {
  curPage: number,
  limit: number,
  total: number,
  queryMethod: Function
}
const props = withDefaults(defineProps<Prop>(), {
  curPage: 1,
  limit: 10,
  total: 0,
  queryMethod: () => {}
})

// const emits = defineEmits(['update:cur-page', 'update:page-size'])
interface Emit {
  (e: 'update:curPage', value: number): void
  (e: 'update:limit', value: number): void
}
const emit = defineEmits<Emit>()

const pageSizeChange = (limit: number) => {
  emit('update:limit', limit)
  emit('update:curPage', 1)
  props.queryMethod()
}
const pageCurrentChange = (page: number) => {
  emit('update:curPage', page)
  props.queryMethod()
}
</script>

<style lang='scss' scoped>

</style>
