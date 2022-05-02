<template>
  <PageContainer>
    <el-card>
      <template #header>
        <el-button @click="pageBack">
          <el-icon>
            <Back />
          </el-icon>
          返回
        </el-button>
      </template>
      <el-form
        label-width="100px"
      >
        <el-form-item
          label="商品名称"
        >
          <el-input />
        </el-form-item>
        <el-form-item
          label="规格模板"
        >
          123
        </el-form-item>
        <el-form-item
          label="商品详情"
        >
          <AppEditor
            ref="editorRef"
          />
        </el-form-item>
        <el-form-item
          label="活动优先级"
        >
          <AppDraggable
            v-model="activities"
          >
            <el-tag
              v-for="activity in activities"
              :key="activity.name"
              :type="activity.type"
              effect="dark"
            >
              {{ activity.name }}
            </el-tag>
          </AppDraggable>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="test"
          >
            测试
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </PageContainer>
</template>

<script lang='ts' setup>
import PageContainer from '@/components/page-container/AppPageContainer.vue'
import { Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import AppEditor from '@/components/editor/AppEditor.vue'
import { ref } from 'vue'
import AppDraggable from '@/components/draggable/AppDraggable.vue'

const router = useRouter()
const pageBack = () => {
  router.back()
}

const editorRef = ref<InstanceType<typeof AppEditor>>()
const test = () => {
  editorRef.value.valueHtml = '<p>点击设置内容</p>'
}

const activities = ref([
  {
    type: 'danger',
    name: '砍价'
  },
  {
    type: 'warning',
    name: '活动'
  },
  {
    type: 'info',
    name: '秒杀'
  },
  {
    type: 'success',
    name: '拼团'
  }
])
</script>

<style lang='scss' scoped>

</style>
