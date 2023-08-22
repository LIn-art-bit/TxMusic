Component({
  properties: {
    recommend: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    musicClick() {
      const id = this.properties.recommend.id
      this.triggerEvent('itemClick')
      wx.navigateTo({
        url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
      })
    }
  }
})
