if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-c97cb896"], ["__file", "E:/uniappRepository/AssignmentGrading/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _sfc_main$4 = {
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
        uni.stopPullDownRefresh();
        uni.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    },
    methods: {
      goToDetail(item) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${item.id}`
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "filter-bar" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $data.filterStatus = "")
          },
          " 全部 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "pending" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $data.filterStatus = "pending")
          },
          " 待批改 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "completed" }]),
            onClick: _cache[2] || (_cache[2] = ($event) => $data.filterStatus = "completed")
          },
          " 已批改 ",
          2
          /* CLASS */
        )
      ]),
      vue.createElementVNode("view", { class: "assignment-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.filteredList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "assignment-item",
              key: item.id,
              onClick: ($event) => $options.goToDetail(item)
            }, [
              vue.createElementVNode("view", { class: "item-header" }, [
                vue.createElementVNode(
                  "text",
                  { class: "title" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_uni_badge, {
                  text: item.statusText,
                  type: item.status === "completed" ? "success" : "warning"
                }, null, 8, ["text", "type"])
              ]),
              vue.createElementVNode("view", { class: "item-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "info-text" },
                  "学生：" + vue.toDisplayString(item.studentName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "info-text" },
                  "提交时间：" + vue.toDisplayString(item.submitTime),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "item-footer" }, [
                vue.createElementVNode(
                  "text",
                  { class: "subject" },
                  vue.toDisplayString(item.subject),
                  1
                  /* TEXT */
                ),
                item.score ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "score"
                  },
                  "得分：" + vue.toDisplayString(item.score),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      $options.filteredList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-text" }, "暂无作业")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/uniappRepository/AssignmentGrading/pages/index/index.vue"]]);
  const _sfc_main$3 = {
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
        uni.showToast({
          title: "预览文件：" + file.name,
          icon: "none"
        });
      },
      goToGrading() {
        uni.navigateTo({
          url: `/pages/grading/grading?id=${this.assignmentId}`
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "detail-card" }, [
        vue.createElementVNode("view", { class: "card-header" }, [
          vue.createElementVNode(
            "text",
            { class: "card-title" },
            vue.toDisplayString($data.assignment.title),
            1
            /* TEXT */
          ),
          vue.createVNode(_component_uni_badge, {
            text: $data.assignment.statusText,
            type: $data.assignment.status === "completed" ? "success" : "warning"
          }, null, 8, ["text", "type"])
        ]),
        vue.createElementVNode("view", { class: "info-section" }, [
          vue.createElementVNode("view", { class: "info-row" }, [
            vue.createElementVNode("text", { class: "label" }, "学生姓名："),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.assignment.studentName),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "info-row" }, [
            vue.createElementVNode("text", { class: "label" }, "科目："),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.assignment.subject),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "info-row" }, [
            vue.createElementVNode("text", { class: "label" }, "提交时间："),
            vue.createElementVNode(
              "text",
              { class: "value" },
              vue.toDisplayString($data.assignment.submitTime),
              1
              /* TEXT */
            )
          ]),
          $data.assignment.score ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "info-row"
          }, [
            vue.createElementVNode("text", { class: "label" }, "得分："),
            vue.createElementVNode(
              "text",
              { class: "value score" },
              vue.toDisplayString($data.assignment.score),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createElementVNode("view", { class: "content-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "作业内容"),
        vue.createElementVNode(
          "view",
          { class: "content-text" },
          vue.toDisplayString($data.assignment.content),
          1
          /* TEXT */
        )
      ]),
      $data.assignment.attachments && $data.assignment.attachments.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "content-card"
      }, [
        vue.createElementVNode("view", { class: "section-title" }, "附件"),
        vue.createElementVNode("view", { class: "attachment-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.assignment.attachments, (file, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "attachment-item",
                key: index
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "attachment-name" },
                  vue.toDisplayString(file.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", {
                  class: "attachment-btn",
                  onClick: ($event) => $options.previewFile(file)
                }, "查看", 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $data.assignment.comment ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "content-card"
      }, [
        vue.createElementVNode("view", { class: "section-title" }, "批改意见"),
        vue.createElementVNode(
          "view",
          { class: "comment-text" },
          vue.toDisplayString($data.assignment.comment),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true),
      $data.assignment.status === "pending" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "action-bar"
      }, [
        vue.createElementVNode("button", {
          class: "action-btn primary",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goToGrading && $options.goToGrading(...args))
        }, "开始批改")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-eca06f3c"], ["__file", "E:/uniappRepository/AssignmentGrading/pages/detail/detail.vue"]]);
  const _sfc_main$2 = {
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
        uni.navigateBack();
      },
      submit() {
        if (!this.score) {
          uni.showToast({
            title: "请输入分数",
            icon: "none"
          });
          return;
        }
        if (!this.comment) {
          uni.showToast({
            title: "请输入批改意见",
            icon: "none"
          });
          return;
        }
        uni.showModal({
          title: "提示",
          content: "确认提交批改结果？",
          success: (res) => {
            if (res.confirm) {
              uni.showToast({
                title: "提交成功",
                icon: "success"
              });
              setTimeout(() => {
                uni.navigateBack({
                  delta: 2
                });
              }, 1500);
            }
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "info-card" }, [
        vue.createElementVNode(
          "text",
          { class: "student-name" },
          vue.toDisplayString($data.assignment.studentName),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "assignment-title" },
          vue.toDisplayString($data.assignment.title),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "content-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "作业内容"),
        vue.createElementVNode(
          "view",
          { class: "content-preview" },
          vue.toDisplayString($data.assignment.content),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "grading-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "评分"),
        vue.createElementVNode("view", { class: "score-input-wrapper" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "score-input",
              type: "digit",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.score = $event),
              placeholder: "请输入分数"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.score]
          ]),
          vue.createElementVNode("text", { class: "score-unit" }, "分")
        ])
      ]),
      vue.createElementVNode("view", { class: "grading-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "批改意见"),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "comment-input",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.comment = $event),
            placeholder: "请输入批改意见...",
            maxlength: "500"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.comment]
        ]),
        vue.createElementVNode(
          "view",
          { class: "char-count" },
          vue.toDisplayString($data.comment.length) + "/500",
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "grading-card" }, [
        vue.createElementVNode("view", { class: "section-title" }, "快捷评语"),
        vue.createElementVNode("view", { class: "quick-comments" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.quickComments, (tag, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "comment-tag",
                key: index,
                onClick: ($event) => $options.addQuickComment(tag)
              }, vue.toDisplayString(tag), 9, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "action-bar" }, [
        vue.createElementVNode("button", {
          class: "action-btn cancel",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.cancel && $options.cancel(...args))
        }, "取消"),
        vue.createElementVNode("button", {
          class: "action-btn primary",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.submit && $options.submit(...args))
        }, "提交批改")
      ])
    ]);
  }
  const PagesGradingGrading = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-90506370"], ["__file", "E:/uniappRepository/AssignmentGrading/pages/grading/grading.vue"]]);
  const _imports_0 = "/static/logo.png";
  const _sfc_main$1 = {
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
        uni.showToast({
          title: "功能开发中",
          icon: "none"
        });
      },
      logout() {
        uni.showModal({
          title: "提示",
          content: "确认退出登录？",
          success: (res) => {
            if (res.confirm) {
              uni.showToast({
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
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "user-card" }, [
        vue.createElementVNode("image", {
          class: "avatar",
          src: _imports_0,
          mode: "aspectFill"
        }),
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode(
            "text",
            { class: "username" },
            vue.toDisplayString($data.userInfo.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "user-role" },
            vue.toDisplayString($data.userInfo.role),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "stats-card" }, [
        vue.createElementVNode("view", { class: "stat-item" }, [
          vue.createElementVNode(
            "text",
            { class: "stat-number" },
            vue.toDisplayString($data.stats.total),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "stat-label" }, "总作业数")
        ]),
        vue.createElementVNode("view", { class: "stat-divider" }),
        vue.createElementVNode("view", { class: "stat-item" }, [
          vue.createElementVNode(
            "text",
            { class: "stat-number" },
            vue.toDisplayString($data.stats.completed),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "stat-label" }, "已批改")
        ]),
        vue.createElementVNode("view", { class: "stat-divider" }),
        vue.createElementVNode("view", { class: "stat-item" }, [
          vue.createElementVNode(
            "text",
            { class: "stat-number" },
            vue.toDisplayString($data.stats.pending),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "stat-label" }, "待批改")
        ])
      ]),
      vue.createElementVNode("view", { class: "menu-list" }, [
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("history"))
        }, [
          vue.createElementVNode("view", { class: "menu-left" }, [
            vue.createElementVNode("text", { class: "menu-icon" }, "📝"),
            vue.createElementVNode("text", { class: "menu-title" }, "批改历史")
          ]),
          vue.createElementVNode("text", { class: "menu-arrow" }, "›")
        ]),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage("settings"))
        }, [
          vue.createElementVNode("view", { class: "menu-left" }, [
            vue.createElementVNode("text", { class: "menu-icon" }, "⚙️"),
            vue.createElementVNode("text", { class: "menu-title" }, "设置")
          ]),
          vue.createElementVNode("text", { class: "menu-arrow" }, "›")
        ]),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.goToPage("about"))
        }, [
          vue.createElementVNode("view", { class: "menu-left" }, [
            vue.createElementVNode("text", { class: "menu-icon" }, "ℹ️"),
            vue.createElementVNode("text", { class: "menu-title" }, "关于")
          ]),
          vue.createElementVNode("text", { class: "menu-arrow" }, "›")
        ])
      ]),
      vue.createElementVNode("view", { class: "logout-section" }, [
        vue.createElementVNode("button", {
          class: "logout-btn",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.logout && $options.logout(...args))
        }, "退出登录")
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "E:/uniappRepository/AssignmentGrading/pages/mine/mine.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/grading/grading", PagesGradingGrading);
  __definePage("pages/mine/mine", PagesMineMine);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "考研作业批改系统启动");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/uniappRepository/AssignmentGrading/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
