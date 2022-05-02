<template>
  <el-pagination
    background
    layout="total,sizes,prev,pager,next,jumper"
    :page-size="props.limit"
    :current-page="props.page"
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
  page: number,
  limit: number,
  total: number,
  queryMethod: Function
}
const props = withDefaults(defineProps<Prop>(), {
  page: 1,
  limit: 10,
  total: 0,
  queryMethod: () => {}
})

// const emits = defineEmits(['update:cur-pagination', 'update:pagination-size'])
interface Emit {
  (e: 'update:page', value: number): void
  (e: 'update:limit', value: number): void
}
const emit = defineEmits<Emit>()

const pageSizeChange = (limit: number) => {
  emit('update:limit', limit)
  emit('update:page', 1)
  props.queryMethod()
}
const pageCurrentChange = (page: number) => {
  emit('update:page', page)
  props.queryMethod()
}
</script>

<style lang='scss' scoped>
.el-pagination {
  justify-content: end;
  margin-top: 8px;
}
</style>
