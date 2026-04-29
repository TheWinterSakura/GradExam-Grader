"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      assignmentId: "",
      assignment: {
        id: 1,
        title: "高等数学第一章习题",
        studentName: "张三",
        subject: "数学",
        submitTime: "2024-01-15 10:30",
        status: "pending",
        statusText: "待批改",
        content: "1. 求函数 f(x) = x² + 2x + 1 的导数\n2. 计算极限 lim(x→0) (sin x)/x\n3. 求不定积分 ∫x²dx",
        attachments: [
          { name: "作业答案.pdf", url: "" },
          { name: "解题过程.jpg", url: "" }
        ]
      }
    };
  },
  onLoad(options) {
    if (options.id) {
      this.assignmentId = options.id;
    }
  },
  methods: {
    previewFile(file) {
      common_vendor.index.showToast({
        title: "预览文件：" + file.name,
        icon: "none"
      });
    },
    goToGrading() {
      common_vendor.index.navigateTo({
        url: `/pages/grading/grading?id=${this.assignmentId}`
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
    a: common_vendor.t($data.assignment.title),
    b: common_vendor.p({
      text: $data.assignment.statusText,
      type: $data.assignment.status === "completed" ? "success" : "warning"
    }),
    c: common_vendor.t($data.assignment.studentName),
    d: common_vendor.t($data.assignment.subject),
    e: common_vendor.t($data.assignment.submitTime),
    f: $data.assignment.score
  }, $data.assignment.score ? {
    g: common_vendor.t($data.assignment.score)
  } : {}, {
    h: common_vendor.t($data.assignment.content),
    i: $data.assignment.attachments && $data.assignment.attachments.length > 0
  }, $data.assignment.attachments && $data.assignment.attachments.length > 0 ? {
    j: common_vendor.f($data.assignment.attachments, (file, index, i0) => {
      return {
        a: common_vendor.t(file.name),
        b: common_vendor.o(($event) => $options.previewFile(file), index),
        c: index
      };
    })
  } : {}, {
    k: $data.assignment.comment
  }, $data.assignment.comment ? {
    l: common_vendor.t($data.assignment.comment)
  } : {}, {
    m: $data.assignment.status === "pending"
  }, $data.assignment.status === "pending" ? {
    n: common_vendor.o((...args) => $options.goToGrading && $options.goToGrading(...args), "94")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
