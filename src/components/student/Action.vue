<script setup>
import { ref, watch } from 'vue';
import { useSubmitStore } from '@/store/index';

const submitStore = useSubmitStore();

const award_level = ref();
const member_sequence = ref();

const options1 = ref([
  {
    label: '特等奖',
    value: '特等奖',
  },
  {
    label: '一等奖',
    value: '一等奖',
  },
  {
    label: '二等奖',
    value: '二等奖',
  },
  {
    label: '三等奖',
    value: '三等奖',
  },
]);

const options2 = ref([
  {
    label: '个人',
    value: '个人',
  },
  {
    label: '序列1',
    value: '序列1',
  },
  {
    label: '序列2',
    value: '序列2',
  },
  {
    label: '其他成员',
    value: '其他成员',
  },
]);

// 关闭弹窗
const closeModal = () => {
  submitStore.closeModal();
};

// 提交表单
const handleSubmit = (awardLevel, memberSequence) => {
  submitStore.award_level = awardLevel;
  submitStore.member_sequence = memberSequence;
  // 调用store的translate方法提交数据
  submitStore.translate();
  // 提交成功后关闭弹窗
  award_level.value = '';
  member_sequence.value = '';
};
</script>

<template>
  <!-- 遮罩层 -->
  <div
    class="mask"
    v-if="submitStore.visible"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 100,
      animation: 'fadeIn 0.3s ease-in-out',
    }"
    @click="closeModal"
  >
    <!-- 弹窗容器 -->
    <div
      class="action-container"
      :style="{
        width: '30%',
        minWidth: '400px',
        maxWidth: '500px',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s ease-out',
        position: 'relative',
      }"
      @click.stop
    >
      <!-- 标题区域 -->
      <div :style="{
        textAlign: 'center',
        marginBottom: '24px',
      }">
        <h3 :style="{
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
        }">
          填写获奖信息
        </h3>
      </div>

      <!-- 表单区域 -->
      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '30px',
      }">
        <!-- 获奖等级选择 -->
        <div :style="{
          width: '100%',
        }">
          <label :style="{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#666',
          }">
            获奖等级
          </label>
          <a-select
            v-model:value="award_level"
            :allowClear="true"
            placeholder="请选择获奖等级"
            :style="{
              width: '100%',
            }"
            :options="options1"
          />
        </div>

        <!-- 成员序列选择 -->
        <div :style="{
          width: '100%',
        }">
          <label :style="{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#666',
          }">
            成员序列
          </label>
          <a-select
            v-model:value="member_sequence"
            :allowClear="true"
            placeholder="请选择成员序列"
            :style="{
              width: '100%',
            }"
            :options="options2"
          />
        </div>
      </div>

      <!-- 按钮区域 -->
      <div :style="{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        paddingTop: '20px',
        borderTop: '1px solid #f0f0f0',
      }">
        <a-button @click="closeModal">取消</a-button>
        <a-button type="primary" @click="handleSubmit(award_level, member_sequence)">提交</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>