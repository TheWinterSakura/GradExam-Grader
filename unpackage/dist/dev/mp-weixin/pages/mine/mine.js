"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        name: "李老师",
        role: "考研辅导教师"
      },
      stats: {
        total: 156,
        completed: 128,
        pending: 28
      }
    };
  },
  methods: {
    goToPage(type) {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    },
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已退出",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($data.userInfo.name),
    c: common_vendor.t($data.userInfo.role),
    d: common_vendor.t($data.stats.total),
    e: common_vendor.t($data.stats.completed),
    f: common_vendor.t($data.stats.pending),
    g: common_vendor.o(($event) => $options.goToPage("history"), "73"),
    h: common_vendor.o(($event) => $options.goToPage("settings"), "5c"),
    i: common_vendor.o(($event) => $options.goToPage("about"), "24"),
    j: common_vendor.o((...args) => $options.logout && $options.logout(...args), "fb")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
