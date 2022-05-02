<template>
  <DialogFormIndex
    :title="`${formAdmin.id ? '编辑' : '添加'}管理员`"
    :submit="submitAdminForm"
    @open="onAdminFormOpen"
    @close="onAdminFormClose"
  >
    <el-form
      ref="formRef"
      label-width="100px"
      :model="formAdmin"
      :rules="formRules"
      v-loading="formLoading"
    >
      <el-form-item
        label="管理员账号"
        required
        prop="account"
      >
        <el-input v-model="formAdmin.account" />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        required
        prop="pwd"
      >
        <el-input v-model="formAdmin.pwd" />
      </el-form-item>
      <el-form-item
        label="确认密码"
        required
        prop="conf_pwd"
      >
        <el-input v-model="formAdmin.conf_pwd" />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        required
        prop="real_name"
      >
        <el-input v-model="formAdmin.real_name" />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        required
        prop="roles"
      >
        <el-select
          multiple
          clearable
          v-model="formAdmin.roles"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-radio-group
          v-model="formAdmin.status"
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
    </el-form>
  </DialogFormIndex>
</template>

<script lang='ts' setup>
import { Admin, IOption } from '@/api/types/admin'
import {
  onActivated,
  onBeforeMount, onBeforeUnmount,
  onBeforeUpdate, onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked, onRenderTriggered, onUnmounted,
  onUpdated,
  PropType,
  ref
} from 'vue'
import DialogFormIndex from '@/components/dialog-form/AppDialogForm.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { createAdmin, editAdmin, getRoleTypes } from '@/api/admin'

const props = defineProps({
  admin: {
    type: Object as (PropType<Admin>),
    default: null
  }
})
const emit = defineEmits(['success'])
const formRef = ref<FormInstance>()
const formLoading = ref(false)
const formAdmin = ref({
  id: -1,
  account: '',
  pwd: '',
  conf_pwd: '',
  real_name: '',
  roles: [] as number[],
  status: 0
})
const formRules: FormRules = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}

const roles = ref<IOption[]>()
// todo 直接修改formAdmin的值，form来不及渲染，reset无效
const onAdminFormOpen = async () => {
  formLoading.value = true
  roles.value = await getRoleTypes().finally(() => { formLoading.value = false })
  if (props.admin) {
    formAdmin.value = {
      id: props.admin.id,
      account: props.admin.account,
      pwd: '',
      conf_pwd: '',
      status: props.admin.status as number,
      real_name: props.admin.real_name,
      roles: transformRoles(props.admin.roles, roles.value)
    }
  }
}
const transformRoles = (roles: string, roleOptions: IOption[]) => {
  const roleIds = [] as number[]
  const roleLabels = roles.split(',')
  roleLabels.forEach(item => {
    const roleId = roleOptions.find(roleOptionItem => roleOptionItem.label === item)?.value
    if (roleId) roleIds.push(roleId)
  })
  return roleIds
}
const onAdminFormClose = () => {
  // emit('update:admin', null)
  formRef.value?.clearValidate()
  formRef.value?.resetFields()
}

const submitAdminForm = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return
  if (formAdmin.value.id > 0) {
    await editAdmin(formAdmin.value)
  } else {
    await createAdmin(formAdmin.value)
  }
  ElMessage.success('操作成功')
  emit('success')
}

onBeforeMount(() => { console.log('onBeforeMount') })
onMounted(() => { console.log('onMounted') })
onBeforeUpdate(() => { console.log('onBeforeUpdate') })
onUpdated(() => { console.log('onUpdated') })
onBeforeUnmount(() => { console.log('onBeforeUnmount') })
onUnmounted(() => { console.log('onUnmounted') })
onErrorCaptured(() => { console.log('onErrorCaptured') })
onRenderTracked(() => { console.log('onRenderTracked') })
onRenderTriggered(() => { console.log('onRenderTriggered') })
onActivated(() => { console.log('onActivated') })
onDeactivated(() => { console.log('onDeactivated') })
</script>

<style lang='scss' scoped>

</style>
