<script setup>
import { ref, computed, onMounted, toRaw } from 'vue';
import { useCompetitionsStore, useSubmitStore } from '@/store/index';

const submitStore = useSubmitStore();
const competitionsStore = useCompetitionsStore();

// 分页配置
const paginationConfig1 = computed(() => ({
  current: competitionsStore.currentPage,
  pageSize: competitionsStore.pageSize,
  total: competitionsStore.totalCompetitions,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '40'],
  locale: {
    items_per_page: '/页',
  },
  showTotal: (total) => `共 ${total} 条数据`,
}));

const paginationConfig2 = computed(() => ({
  total: competitionsStore.searchCompetitionsInfo.length,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '40'],
  locale: {
    items_per_page: '/页',
  },
  showTotal: (total) => `共 ${total} 条数据`,
}));

// 处理分页
const handleTableChange1 = (pagination) => {
  competitionsStore.handleTableChange1(pagination.current, pagination.pageSize);
};

onMounted(() => {
  competitionsStore.handleTableChange1(1, 10);
});

// 处理选择
const handleSelect = (record) => {
  submitStore.handleSelect(toRaw(record));
};

const columns = [
  {
    title: '序号',
    dataIndex: 'score_id',
    key: 'score_id',
    width: 100,
    align: 'center',
  },
  {
    title: '竞赛项目',
    dataIndex: 'competition_level',
    key: 'competition_level',
    align: 'center',
  },
  {
    title: '最高级别',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
  },
  {
    title: '等级',
    dataIndex: 'jsxm',
    key: 'jsxm',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
];
</script>
<template>
  <div style="margin-top: 20px;">
    <a-table
      v-show="!competitionsStore.keyword"
      :columns="columns"
      :data-source="competitionsStore.competitionsInfo"
      :pagination="paginationConfig1"
      @change="handleTableChange1"
    >
      <!-- <template #headerCell="{ column }"></template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button
              type="primary"
              size="small"
              @click="handleSelect(toRaw(record))"
            >
              选择
            </a-button>
          </span>
        </template>
      </template>
    </a-table>

    <a-table
      v-show="competitionsStore.keyword"
      :columns="columns"
      :data-source="competitionsStore.searchCompetitionsInfo"
      :pagination="paginationConfig2"
    >
      <!-- <template #headerCell="{ column }"></template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button
              type="primary"
              size="small"
              @click="handleSelect(toRaw(record))"
            >
              选择
            </a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>