<template>
  <PageContainer>
    <el-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        inline
        @submit.prevent="requestAdmins"
        :disabled="adminsLoading"
      >
        <el-form-item label="状态">
          <el-select
            v-model="queryForm.status"
            @change="changeStatus"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input
            placeholder="请输入身份昵称"
            v-model="queryForm.name"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            native-type="submit"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <el-button
          type="primary"
          @click="openAdminForm(null)"
        >
          添加管理员
        </el-button>
      </template>
      <el-table
        :data="admins"
        v-loading="adminsLoading"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="real_name"
          label="姓名"
        />
        <el-table-column
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="roles"
          label="身份"
        />
        <el-table-column
          prop="status"
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="requestChangeAdminStatus(scope.row)"
              :loading="scope.row.statusLoading"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="openAdminForm(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除管理员？"
              @confirm="requestDeleteAdmin(scope.row.id)"
            >
              <template #reference>
                <el-button
                  type="text"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination-index
        v-model:cur-page="queryForm.page"
        v-model:limit="queryForm.limit"
        :total="adminsCount"
        :query-method="requestAdmins"
        :disabled="adminsLoading"
      />
    </el-card>
  </PageContainer>
  <AdminForm
    v-model="adminDialogVisible"
    v-model:admin="curAdmin"
    @success="requestAdmins"
  />
</template>

<script lang='ts' setup>
import { changeAdminStatus, deleteAdmin, getAdmins } from '@/api/admin'
import { onMounted, reactive, ref } from 'vue'
import { Admin } from '@/api/types/admin'
import PageContainer from '@/components/page-container/PageContainer.vue'
import PaginationIndex from '@/components/pagination/PaginationIndex.vue'
import { ElMessage } from 'element-plus'
import AdminForm from '@/views/settings/permission/admin/AdminForm.vue'

const queryForm = reactive({
  page: 1,
  limit: 10,
  status: undefined,
  name: '',
  roles: ''
})
const admins = ref<Admin[]>([])
const adminsCount = ref(0)
const adminsLoading = ref(true)

const requestAdmins = () => {
  adminsLoading.value = true
  getAdmins(queryForm).then(rsp => {
    admins.value = rsp.list
    adminsCount.value = rsp.count
    admins.value.forEach(item => {
      item.statusLoading = false
    })
  }).finally(() => {
    adminsLoading.value = false
  })
}

const requestDeleteAdmin = async (id: number) => {
  await deleteAdmin(id)
  ElMessage.success('删除成功')
  requestAdmins()
}

const requestChangeAdminStatus = async (admin: Admin) => {
  admin.statusLoading = true
  await changeAdminStatus(admin)
    .finally(() => {
      admin.statusLoading = false
    })
  ElMessage.success('操作成功')
}

const changeStatus = () => {
  console.log(queryForm.status)
  console.log(typeof queryForm.status)
}

// 数据加载最好放这里？TODO
onMounted(() => {
  requestAdmins()
})

const adminDialogVisible = ref(false)
const curAdmin = ref<Admin>()
const openAdminForm = (admin: Admin) => {
  curAdmin.value = admin
  adminDialogVisible.value = true
}
// getRoles().then(rsp => {
//   console.log(rsp)
// })
// getAdmin().then(rsp => {
//   console.log(rsp)
// })
</script>

<style lang='scss' scoped>
</style>
