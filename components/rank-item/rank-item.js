
Component({

  properties: {
    rankInfo: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: "newRank"
    }
  },
  data: {

  },
  methods: {
    rankClick() {
      const key = this.properties.key
      // console.log(this.properties.rankInfo)
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=ranking&key=${key}`,
      })
    }
  }
})
