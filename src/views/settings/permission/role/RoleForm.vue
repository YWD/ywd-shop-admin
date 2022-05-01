<template>
  <DialogFormIndex
    :title="`${roleId === 0 ? '添加' : '编辑'}角色`"
    :submit="submitRoleForm"
    @open="onRoleFormOpen"
    @close="onRoleFormClose"
  >
    <el-form
      ref="formRef"
      label-width="100px"
      :model="formRole"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
        required
      >
        <el-input
          placeholder="请输入角色名称"
          v-model="formRole.role_name"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
        required
      >
        <el-radio-group
          v-model="formRole.status"
        >
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="角色权限"
      >
        <el-tree
          ref="treeRef"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </DialogFormIndex>
</template>

<script lang='ts' setup>
/* eslint-disable import/first */
import DialogFormIndex from '@/components/dialog-form/DialogFormIndex.vue'
import { nextTick, reactive, ref } from 'vue'
import { createRole, getMenus, getRole } from '@/api/role'
import { Menu } from '@/api/types/role'
import { ElTreeInstance } from '@/types/element-plus'
import { ElMessage, FormInstance } from 'element-plus'
import { assignObjectValue } from '@/utils/method'

const props = defineProps({
  roleId: {
    type: Number,
    default: 0
  }
})
const formLoading = ref(false)
const formRef = ref<FormInstance>()
const formRole = reactive({
  id: 0,
  role_name: '',
  status: 1,
  checked_menus: [] as number[]
})
// const formRole = ref<FormRole>({
//   id: 0,
//   role_name: '',
//   status: 1,
//   checked_menus: [] as number[]
// })

const menus = ref<Menu[]>()
const onRoleFormOpen = async () => {
  formRole.id = props.roleId
  formLoading.value = true
  props.roleId === 0
    ? await requestMenus().finally(() => { formLoading.value = false })
    : await requestRole().finally(() => { formLoading.value = false })
}
const requestMenus = async () => {
  if (menus.value) return
  const { menus: menuData } = await getMenus()
  menus.value = menuData
}
const requestRole = async () => {
  const { role, menus: menuData } = await getRole(props.roleId)
  menus.value = menuData
  assignObjectValue(formRole, role)
  formRole.checked_menus = role.rules.split(',').map(roleId => parseInt(roleId))
  await nextTick()
  selectCheckedMenus()
}
const selectCheckedMenus = () => {
  for (const nodeId of formRole.checked_menus) {
    const node = treeRef.value?.getNode(nodeId)
    if (node && node.isLeaf) {
      treeRef.value?.setChecked(nodeId, true, false)
    }
  }
}

const emit = defineEmits(['success', 'update:roleId'])

const onRoleFormClose = () => {
  formRef.value?.resetFields()
  const clearTreeCheck = () => {
    const checkedKeys = treeRef.value?.getCheckedKeys()
    if (checkedKeys) {
      for (const checkedKey of checkedKeys) {
        treeRef.value?.setChecked(checkedKey, false, false)
      }
    }
  }
  clearTreeCheck()
  emit('update:roleId', 0)
}
const treeRef = ref<ElTreeInstance>()
const submitRoleForm = async () => {
  formRole.checked_menus = [
    ...treeRef.value?.getHalfCheckedKeys() as number[],
    ...treeRef.value?.getCheckedKeys() as number[]
  ]
  await createRole(formRole)
  ElMessage.success('操作成功')
  emit('success')
}
</script>

<style lang='scss' scoped>

</style>
