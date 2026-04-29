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
  const _sfc_main$7 = {
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-c97cb896"], ["__file", "F:/Project/kaoyan/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
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
  const _sfc_main$6 = {
    data() {
      return {
        currentTab: "assignment",
        filterStatus: "",
        courseList: [
          {
            id: 1,
            name: "考研数学强化班",
            description: "高等数学、线性代数、概率论与数理统计",
            studentCount: 45,
            time: "周一、周三 19:00-21:00"
          },
          {
            id: 2,
            name: "考研英语冲刺班",
            description: "阅读理解、完形填空、翻译、写作",
            studentCount: 38,
            time: "周二、周四 19:00-21:00"
          },
          {
            id: 3,
            name: "考研政治精讲班",
            description: "马克思主义原理、毛概、近代史、思修",
            studentCount: 52,
            time: "周五 19:00-21:00"
          }
        ],
        assignmentList: [
          {
            id: 1,
            title: "高等数学第一章习题",
            studentName: "张三",
            submitTime: "2024-01-15 10:30",
            subject: "数学",
            status: "pending",
            statusText: "待完成"
          },
          {
            id: 2,
            title: "英语阅读理解练习",
            studentName: "李四",
            submitTime: "2024-01-14 15:20",
            subject: "英语",
            status: "completed",
            statusText: "已完成",
            score: "85"
          },
          {
            id: 3,
            title: "政治马克思主义原理",
            studentName: "王五",
            submitTime: "2024-01-13 09:15",
            subject: "政治",
            status: "pending",
            statusText: "待完成"
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
    onShow() {
      if (typeof this.$mp.page.getTabBar === "function" && this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected: 0
        });
      }
    },
    methods: {
      switchTopTab(tab) {
        this.currentTab = tab;
      },
      goToCourse(course) {
        uni.showToast({
          title: "进入课程：" + course.name,
          icon: "none"
        });
      },
      goToDetail(item) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${item.id}`
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top-tabs" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["top-tab-item", { "active": $data.currentTab === "course" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.switchTopTab("course"))
          },
          [
            vue.createElementVNode("text", { class: "top-tab-text" }, "我的课程")
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["top-tab-item", { "active": $data.currentTab === "assignment" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTopTab("assignment"))
          },
          [
            vue.createElementVNode("text", { class: "top-tab-text" }, "作业列表")
          ],
          2
          /* CLASS */
        )
      ]),
      $data.currentTab === "course" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "course-content"
      }, [
        vue.createElementVNode("view", { class: "course-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.courseList, (course) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "course-item",
                key: course.id,
                onClick: ($event) => $options.goToCourse(course)
              }, [
                vue.createElementVNode("view", { class: "course-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "course-name" },
                    vue.toDisplayString(course.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "student-count" },
                    vue.toDisplayString(course.studentCount) + "人",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "course-info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "course-desc" },
                    vue.toDisplayString(course.description),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "course-footer" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "course-time" },
                    vue.toDisplayString(course.time),
                    1
                    /* TEXT */
                  )
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        $data.courseList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "empty"
        }, [
          vue.createElementVNode("text", { class: "empty-text" }, "暂无课程")
        ])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      $data.currentTab === "assignment" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "assignment-content"
      }, [
        vue.createElementVNode("view", { class: "filter-bar" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => $data.filterStatus = "")
            },
            " 全部 ",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "pending" }]),
              onClick: _cache[3] || (_cache[3] = ($event) => $data.filterStatus = "pending")
            },
            " 待完成 ",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["filter-item", { "active": $data.filterStatus === "completed" }]),
              onClick: _cache[4] || (_cache[4] = ($event) => $data.filterStatus = "completed")
            },
            " 已完成 ",
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
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/Project/kaoyan/pages/index/index.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        messageList: [
          {
            id: 1,
            courseName: "考研数学强化班",
            assignmentName: "高等数学第二章习题",
            time: "2小时前",
            deadline: "2024-01-20 23:59",
            isNew: true
          },
          {
            id: 2,
            courseName: "考研英语冲刺班",
            assignmentName: "阅读理解专项训练",
            time: "5小时前",
            deadline: "2024-01-19 23:59",
            isNew: true
          },
          {
            id: 3,
            courseName: "考研政治精讲班",
            assignmentName: "毛概重点知识梳理",
            time: "昨天 14:30",
            deadline: "2024-01-18 23:59",
            isNew: false
          },
          {
            id: 4,
            courseName: "考研数学强化班",
            assignmentName: "线性代数综合练习",
            time: "昨天 09:15",
            deadline: "2024-01-17 23:59",
            isNew: false
          },
          {
            id: 5,
            courseName: "考研英语冲刺班",
            assignmentName: "写作模拟练习",
            time: "2天前",
            deadline: "2024-01-16 23:59",
            isNew: false
          }
        ]
      };
    },
    methods: {
      goToAssignment(msg) {
        uni.showToast({
          title: "查看作业：" + msg.assignmentName,
          icon: "none"
        });
      }
    },
    onLoad() {
    },
    onShow() {
      if (typeof this.$mp.page.getTabBar === "function" && this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected: 1
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "message-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.messageList, (msg) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "message-card",
              key: msg.id,
              onClick: ($event) => $options.goToAssignment(msg)
            }, [
              vue.createElementVNode("view", { class: "card-header" }, [
                vue.createElementVNode(
                  "view",
                  { class: "course-tag" },
                  vue.toDisplayString(msg.courseName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "time" },
                  vue.toDisplayString(msg.time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "card-content" }, [
                vue.createElementVNode("text", { class: "message-title" }, "发布新作业"),
                vue.createElementVNode(
                  "text",
                  { class: "assignment-name" },
                  vue.toDisplayString(msg.assignmentName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "card-footer" }, [
                vue.createElementVNode(
                  "text",
                  { class: "deadline" },
                  "截止时间：" + vue.toDisplayString(msg.deadline),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["status-badge", msg.isNew ? "new" : "read"])
                  },
                  vue.toDisplayString(msg.isNew ? "未读" : "已读"),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      $data.messageList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty"
      }, [
        vue.createElementVNode("text", { class: "empty-text" }, "暂无消息")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-4c1b26cf"], ["__file", "F:/Project/kaoyan/pages/message/message.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    onLoad() {
    },
    onShow() {
      if (typeof this.$mp.page.getTabBar === "function" && this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected: 2
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "笔记")
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("text", { class: "placeholder" }, "暂无笔记")
      ])
    ]);
  }
  const PagesNoteNote = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-f9d84dbe"], ["__file", "F:/Project/kaoyan/pages/note/note.vue"]]);
  const _imports_0 = "/static/logo.png";
  const _sfc_main$3 = {
    data() {
      return {
        userInfo: {
          name: "张三",
          studentId: "2024001",
          college: "软件学院",
          class: "2023级8班"
        },
        stats: {
          total: 156,
          completed: 128,
          pending: 28
        }
      };
    },
    onShow() {
      if (typeof this.$mp.page.getTabBar === "function" && this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected: 3
        });
      }
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
            "学号：" + vue.toDisplayString($data.userInfo.studentId),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "user-role" },
            vue.toDisplayString($data.userInfo.college),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "user-role" },
            vue.toDisplayString($data.userInfo.class),
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
          vue.createElementVNode("text", { class: "stat-label" }, "已完成")
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
          vue.createElementVNode("text", { class: "stat-label" }, "待完成")
        ])
      ]),
      vue.createElementVNode("view", { class: "menu-list" }, [
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("settings"))
        }, [
          vue.createElementVNode("view", { class: "menu-left" }, [
            vue.createElementVNode("text", { class: "menu-icon" }, "⚙️"),
            vue.createElementVNode("text", { class: "menu-title" }, "设置")
          ]),
          vue.createElementVNode("text", { class: "menu-arrow" }, "›")
        ]),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage("about"))
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
          onClick: _cache[2] || (_cache[2] = (...args) => $options.logout && $options.logout(...args))
        }, "退出登录")
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "F:/Project/kaoyan/pages/mine/mine.vue"]]);
  const _sfc_main$2 = {
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-eca06f3c"], ["__file", "F:/Project/kaoyan/pages/detail/detail.vue"]]);
  const _sfc_main$1 = {
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
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesGradingGrading = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-90506370"], ["__file", "F:/Project/kaoyan/pages/grading/grading.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/note/note", PagesNoteNote);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/grading/grading", PagesGradingGrading);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/Project/kaoyan/App.vue"]]);
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
