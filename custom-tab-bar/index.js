Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#007AFF',
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页'
      },
      {
        pagePath: '/pages/message/message',
        text: '消息'
      },
      {
        pagePath: '/pages/note/note',
        text: '笔记'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我'
      }
    ]
  },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const url = this.data.list[index].pagePath
      wx.switchTab({ url })
    }
  }
})
