Component({
  properties: {
    itemInfo: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 1
    }
  },

  data: {

  },
  methods: {
    songClick() {
      this.triggerEvent("itemClick")
      const id = this.properties.itemInfo.id
      wx.navigateTo({
        url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
      })
    }
  }
})