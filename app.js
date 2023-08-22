// app.js
App({
  globalData: {
    screenWidth: 375,
    statusBarHeight: 20,
    screenHeight: 667
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.screenHeight = res.screenHeight
         }
    })
  }
})
