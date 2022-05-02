<template>
  <PageContainer>
    <el-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        inline
        @submit.prevent="requestRoles"
        :disabled="rolesLoading"
      >
        <el-form-item label="状态">
          <el-select
            v-model="queryForm.status"
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
        <el-form-item label="身份昵称">
          <el-input
            placeholder="请输入身份昵称"
            v-model="queryForm.role_name"
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
          @click="roleFormVisible = true"
        >
          添加角色
        </el-button>
      </template>
      <el-table
        :data="roles"
        v-loading="rolesLoading"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="role_name"
          label="身份昵称"
        />
        <el-table-column
          prop="rules"
          label="权限"
        >
          <template #default="scope">
            <div
              class="text-nowrap"
              :title="scope.row.rules"
            >
              {{ scope.row.rules }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="requestChangeRowStatus(scope.row)"
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
              @click="openRoleForm(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除角色？"
              @confirm="requestDeleteRole(scope.row.id)"
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
        v-model:page="queryForm.page"
        v-model:limit="queryForm.limit"
        :total="rolesCount"
        :query-method="requestRoles"
        :disabled="rolesLoading"
      />
    </el-card>
  </PageContainer>
  <RoleForm
    v-model="roleFormVisible"
    v-model:role-id="editRoleId"
    @success="requestRoles"
  />
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue'
import { getRoles } from '@/api/role'
import { Role } from '@/api/types/role'
import PageContainer from '@/components/page-container/AppPageContainer.vue'
import PaginationIndex from '@/components/pagination/AppPagination.vue'
import RoleForm from './RoleForm.vue'

const queryForm = reactive({
  page: 1,
  limit: 10,
  status: undefined,
  role_name: ''
})

const rolesLoading = ref(false)
const roles = ref<Role[]>()
const rolesCount = ref(0)
const requestRoles = () => {
  rolesLoading.value = true
  getRoles(queryForm).then(rsp => {
    roles.value = rsp.list
    rolesCount.value = rsp.count
  }).finally(() => {
    rolesLoading.value = false
  })
}

const editRoleId = ref(0)
const roleFormVisible = ref(false)
const openRoleForm = (roleId: number) => {
  editRoleId.value = roleId
  roleFormVisible.value = true
}

const requestChangeRowStatus = (role: Role) => {}

const requestDeleteRole = (id: number) => {}

onMounted(() => {
  requestRoles()
})

</script>

<style lang='scss' scoped>

.text-nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
