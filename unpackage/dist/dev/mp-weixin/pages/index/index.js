"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      filterStatus: "",
      assignmentList: [
        {
          id: 1,
          title: "高等数学第一章习题",
          studentName: "张三",
          submitTime: "2024-01-15 10:30",
          subject: "数学",
          status: "pending",
          statusText: "待批改"
        },
        {
          id: 2,
          title: "英语阅读理解练习",
          studentName: "李四",
          submitTime: "2024-01-14 15:20",
          subject: "英语",
          status: "completed",
          statusText: "已批改",
          score: "85"
        },
        {
          id: 3,
          title: "政治马克思主义原理",
          studentName: "王五",
          submitTime: "2024-01-13 09:15",
          subject: "政治",
          status: "pending",
          statusText: "待批改"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      if (this.filterStatus === "") {
        return this.assignmentList;
      }
      return this.assignmentList.filter((item) => item.status === this.filterStatus);
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    }, 1e3);
  },
  methods: {
    goToDetail(item) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${item.id}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  _easycom_uni_badge2();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  _easycom_uni_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.filterStatus === "" ? 1 : "",
    b: common_vendor.o(($event) => $data.filterStatus = "", "41"),
    c: $data.filterStatus === "pending" ? 1 : "",
    d: common_vendor.o(($event) => $data.filterStatus = "pending", "2e"),
    e: $data.filterStatus === "completed" ? 1 : "",
    f: common_vendor.o(($event) => $data.filterStatus = "completed", "07"),
    g: common_vendor.f($options.filteredList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.title),
        b: "1cf27b2a-0-" + i0,
        c: common_vendor.p({
          text: item.statusText,
          type: item.status === "completed" ? "success" : "warning"
        }),
        d: common_vendor.t(item.studentName),
        e: common_vendor.t(item.submitTime),
        f: common_vendor.t(item.subject),
        g: item.score
      }, item.score ? {
        h: common_vendor.t(item.score)
      } : {}, {
        i: item.id,
        j: common_vendor.o(($event) => $options.goToDetail(item), item.id)
      });
    }),
    h: $options.filteredList.length === 0
  }, $options.filteredList.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
