"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      assignmentId: "",
      assignment: {
        studentName: "张三",
        title: "高等数学第一章习题",
        content: "1. 求函数 f(x) = x² + 2x + 1 的导数\n2. 计算极限 lim(x→0) (sin x)/x\n3. 求不定积分 ∫x²dx"
      },
      score: "",
      comment: "",
      quickComments: [
        "解题思路清晰",
        "计算准确",
        "需要加强基础",
        "步骤完整",
        "有待提高",
        "优秀",
        "格式规范",
        "注意细节"
      ]
    };
  },
  onLoad(options) {
    if (options.id) {
      this.assignmentId = options.id;
    }
  },
  methods: {
    addQuickComment(tag) {
      if (this.comment) {
        this.comment += "；" + tag;
      } else {
        this.comment = tag;
      }
    },
    cancel() {
      common_vendor.index.navigateBack();
    },
    submit() {
      if (!this.score) {
        common_vendor.index.showToast({
          title: "请输入分数",
          icon: "none"
        });
        return;
      }
      if (!this.comment) {
        common_vendor.index.showToast({
          title: "请输入批改意见",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "确认提交批改结果？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "提交成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.navigateBack({
                delta: 2
              });
            }, 1500);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.assignment.studentName),
    b: common_vendor.t($data.assignment.title),
    c: common_vendor.t($data.assignment.content),
    d: $data.score,
    e: common_vendor.o(($event) => $data.score = $event.detail.value, "f1"),
    f: $data.comment,
    g: common_vendor.o(($event) => $data.comment = $event.detail.value, "eb"),
    h: common_vendor.t($data.comment.length),
    i: common_vendor.f($data.quickComments, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: common_vendor.o(($event) => $options.addQuickComment(tag), index)
      };
    }),
    j: common_vendor.o((...args) => $options.cancel && $options.cancel(...args), "f0"),
    k: common_vendor.o((...args) => $options.submit && $options.submit(...args), "7d")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-90506370"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/grading/grading.js.map
