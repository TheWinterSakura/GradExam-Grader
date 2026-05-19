Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#4F6EF7',
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/static/tabbar/home.png',
        selectedIconPath: '/static/tabbar/home.png'
      },
      {
        pagePath: '/pages/message/message',
        text: '消息',
        iconPath: '/static/tabbar/message.png',
        selectedIconPath: '/static/tabbar/message.png'
      },
      {
        pagePath: '/pages/note/note',
        text: '课程',
        iconPath: '/static/tabbar/note.png',
        selectedIconPath: '/static/tabbar/note.png'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我',
        iconPath: '/static/tabbar/mine.png',
        selectedIconPath: '/static/tabbar/mine.png'
      }
    ]
  },
  attached() {
    this.updateSelected()
    // 监听页面通知更新选中状态
    const self = this
    uni.$on('tabBarSelected', function(index) {
      self.setData({ selected: index })
    })
  },
  detached() {
    uni.$off('tabBarSelected')
  },
  methods: {
    updateSelected() {
      const pages = getCurrentPages()
      if (pages.length === 0) return
      const currentPage = pages[pages.length - 1]
      const route = '/' + currentPage.route
      const index = this.data.list.findIndex(item => item.pagePath === route)
      if (index !== -1) {
        this.setData({ selected: index })
      }
    },
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const url = this.data.list[index].pagePath
      this.setData({ selected: index })
      wx.switchTab({ url })
    }
  }
})
