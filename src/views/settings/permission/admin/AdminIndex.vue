<template>
  <el-space
    direction="vertical"
  >
    <el-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        inline
        @submit.prevent="requestAdmins"
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
        <el-button type="primary">
          添加管理员
        </el-button>
      </template>
      <el-table
        :data="admins"
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
        />
        <el-table-column
          label="操作"
        >
          <template #default>
            <el-button
              type="text"
            >
              编辑
            </el-button>
            <el-button
              type="text"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination-index
        v-model:cur-page="queryForm.page"
        v-model:limit="queryForm.limit"
        :total="adminCount"
        :query-method="requestAdmins"
      />
    </el-card>
  </el-space>
</template>

<script lang='ts' setup>
import { getAdmins } from '@/api/admin'
import { onMounted, reactive, ref } from 'vue'
import { Admin } from '@/api/types/admin'
import PaginationIndex from '@/components/page/PaginationIndex.vue'

const queryForm = reactive({
  page: 1,
  limit: 10,
  status: '' as (0 | 1 | ''),
  name: '',
  roles: ''
})
const admins = ref<Admin[]>([])
const adminCount = ref(0)
const requestAdmins = () => {
  getAdmins(queryForm).then(rsp => {
    admins.value = rsp.list
    adminCount.value = rsp.count
  })
}

const changeStatus = () => {
  console.log(queryForm.status)
  console.log(typeof queryForm.status)
}

// 数据加载最好放这里？TODO
onMounted(() => {
  requestAdmins()
})
</script>

<style lang='scss' scoped>
.el-space {
  width: 100%;
}

.el-pagination {
  justify-content: end;
  margin-top: 8px;
}

:deep(.el-space__item) {
  width: 100%;
}
</style>
