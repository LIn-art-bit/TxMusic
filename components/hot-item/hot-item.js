// components/hot-item/hot-item.js
Component({
  properties: {
    hotMusic: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    menuClick() {
      const id = this.properties.hotMusic.id
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=menu&id=${id}`,
      })
    }
  }
})
