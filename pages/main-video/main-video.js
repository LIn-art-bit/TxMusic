// pages/main-video/main-video.js
import TxRequest from "../../services/index"
import { getVideoList } from "../../services/video"
Page({
  data: {
    videoList: [],
    limit: 20,
    offSet: 0,
    hasMore: true,
    id: 0
  },
  onLoad() {
   this.fetchVideoList()
  },
  onReachBottom() {
    if(!this.data.hasMore) return
    this.fetchVideoList()
  },
 async onPullDownRefresh() {
   this.setData({
     videoList: []
   })
   this.data.offSet = 0
   this.data.hasMore = true
   await this.fetchVideoList()
   console.log("停止刷新")
   wx.stopPullDownRefresh()
  },
  //发送网络请求的方法
  async fetchVideoList () {
    const res = await  getVideoList(this.data.limit, this.data.offSet)
    const newList = [...this.data.videoList, ...res.data.data]
    this.setData({
      videoList: newList
    })
    this.data.offSet = this.data.videoList.length
    this.data.hasMore = res.data.hasMore
  },
  //监听Item的点击
  videoItemClick(event) {
    this.data.id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/packageVideo/pages/detail-video/detail-video?id=${this.data.id}`,
    }) 
  }
})