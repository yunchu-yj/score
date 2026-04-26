<script setup>
import { ref, watch } from 'vue';
import { useCompetitionsStore } from '@/store/index';

const competitionsStore = useCompetitionsStore();

const jingsai = ref();
const level1 = ref();
const level2 = ref();

// 防抖定时器
let debounceTimer = null;

// 模糊搜索竞赛
const onSearch = () => {
  competitionsStore.keyword = jingsai.value;
  console.log(competitionsStore.keyword);
  competitionsStore.searchCompetitions1();
};

// 带防抖的搜索函数
const debouncedSearch = () => {
  // 清除之前的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    onSearch();
  }, 500);
};

// 实时监听jingsai变化
watch(() => jingsai.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    debouncedSearch();
  }
});

//监听level1变化
watch(() => level1.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    competitionsStore.category = newVal;
    console.log(competitionsStore.category);
    competitionsStore.searchCompetitions2();
  }
});

//监听level2变化
watch(() => level2.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    competitionsStore.competition_level = newVal;
    console.log(competitionsStore.competition_level);
    competitionsStore.searchCompetitions2();
  }
});

const options1 = ref([
  {
    label: '国家级',
    value: '国家级',
  },
  {
    label: '省级',
    value: '省级',
  },
  {
    label: '校级',
    value: '校级',
  },
  {
    label:'院级',
    value:'院级',
  }
]);

const options2 = ref([
  {
    label: 'A类',
    value: 'A',
  },
  {
    label: 'B类',
    value: 'B',
  },
  {
    label: 'C类',
    value: 'C',
  },
  {
    label: 'D类',
    value: 'D', 
  },
]);



</script>
<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'spaceBetween',
      border: '1px solid #bfbfbf',
      padding: '20px',
      borderRadius: '5px',
    }"
  >
    <div
      class="flexContent1"
      :style="{
        flex: 2,
        width: '300px',
      }"
    >
      <a-input-search
        v-model:value="jingsai"
        placeholder="需要查询的竞赛"
        :style="{
          width: '300px',
        }"
        @search="onSearch"
      />
    </div>

    <div
      class="flexContent2"
      :style="{
        flex: 2,
        width: '300px',
        display: 'flex',
        justifyContent: 'spaceBetween',
      }"
    >
      <div :style="{
        flex: 1,
        textAlign: 'center',
      }">
        <a-select
          v-model:value="level1"
          :allowClear="true"
          placeholder="请选择竞赛级别"
          :style="{
            width: '80%',
          }"
          :options="options1"
        />
      </div>
      <div :style="{
        flex: 1,
        textAlign: 'center',
      }">
        <a-select
          v-model:value="level2"
          :allowClear="true"
          placeholder="请选择竞赛等级"
          :style="{
            width: '80%',
          }"
          :options="options2"
        />
      </div>
    </div>

    <div
      class="flexContent3"
      :style="{
        flex: 1,
        textAlign: 'center',
      }"
    >
      <a-button
        type="primary"
      >
        我的竞赛综测
      </a-button>
    </div>
  </div>
</template>