import { defineStore } from 'pinia';
import api from '@/api/index';

// 默认竞赛列表store
export const useCompetitionsStore = defineStore('competitions', {
  state: () => ({
    competitionsInfo: [],
    searchCompetitionsInfo: [],
    totalCompetitions: '',
    currentPage: 1,
    pageSize: 10,
    keyword: '',
    category: '',
    competition_level: '',
  }),
  getters: {},
  actions: {
    // handleTableChange 处理表格页码变化
    handleTableChange1(page, size) {
      this.currentPage = page;
      this.pageSize = size;
      const params = {
        page: this.currentPage,
        pageSize: this.pageSize,
      };
      this.getCompetitions1(params);
    },

    handleTableChange2(page, size) {
      this.currentPage = page;
      this.pageSize = size;
      const params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
      };
      this.getCompetitions2(params);
    },

    // 获取竞赛列表
    async getCompetitions1(data) {
      const res = await api.listCompetitions(data);
      if (res.data.RTN_CODE === '01') {
        this.competitionsInfo = res.data.data;
        this.totalCompetitions = Number(res.data.total);
      }
    },

    // 模糊搜索竞赛
    searchCompetitions1() {
      console.log(this.keyword, 123);
      const params = {
        keyword: this.keyword,
      };
      this.getCompetitions2(params);
    },

    async getCompetitions2(data) {
      const res = await api.searchByKeyword(data);
      if (res.data.RTN_CODE === '01') {
        this.searchCompetitionsInfo = res.data.data;
      }
    },

    // 按类查询竞赛
    searchCompetitions2() {
      console.log(this.category, 123);
      const params = {
        category: this.category,
        competition_level: this.competition_level,
      };
      this.getCompetitions3(params);
    },


    async getCompetitions3(data) {
      const res = await api.searchByCategory(data);
      if (res.data.RTN_CODE === '01') {
        this.competitionsInfo = res.data.data;
      }
    },
  },
});

// 提交竞赛信息
export const useSubmitStore = defineStore('submit', {
  state: () => ({
    visible: false,
    competitionInfo: {},
    award_level: '',
    member_sequence: '',
  }),
  getters: {},
  actions: {
    // 处理选择
    handleSelect(record) {
      console.log(123);
      this.competitionInfo = record;
      console.log(this.competitionInfo);
      this.visible = true;
    },

    // 提交竞赛信息
    translate() {
      const formdata = new FormData();
      formdata.append('competition_id', this.competitionInfo.score_id);
      formdata.append('award_level', this.award_level);
      formdata.append('member_sequence', this.member_sequence);
      this.submitCompetition(formdata);
    },

    async submitCompetition(data) {
      const res = await api.submitCompetition(data);
      console.log(res.data);
      if (res.data.RTN_CODE === '01') {
        this.closeModal();
      }
    },

    // 关闭弹窗
    closeModal() {
      this.visible = false;
      this.competitionInfo = {};
    },
  },
});
