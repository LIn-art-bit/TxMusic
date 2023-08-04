// pages/main-music/main-music.js
import {
  getSwipe,
  getRecomend,
  getHotMusic
} from "../../services/music"
import {
  recommendStore
} from "../../stores/recomend-store"
Page({
  data: {
    banners: [],
    bannerHeigt: 150,
    recommendList: [],
    hotList:[]
  },
  imgLoad(event) {
    const query = wx.createSelectorQuery()
    query.select(".banner-img").boundingClientRect()
    query.exec((res) => {
      this.setData({
        bannerHeigt: res[0].height
      })
    })
  },
  moreClick() {
    wx.navigateTo({
      url: '/pages/more-detail/more-detail',
    })
  },
  onLoad() {
    this.fetchSwipe()
    this.fetchHot()
    // this.fetchRecommend()
    recommendStore.dispatch("fetchRecommend")
    recommendStore.onState("recommendList", (value) => {
      this.setData({
        recommendList: value.slice(0, 6)
      })
    })
  },
  onSearchClick() {
    console.log("搜索框")
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //网络请求
  async fetchSwipe() {
    const res = await getSwipe()
    this.setData({
      banners: res.data.banners
    })
  },
  async fetchHot() {
    const res = await getHotMusic()
    this.setData({
      hotList: res.data.playlists.slice(0, 6)
    })
    console.log(this.data.hotList)
  }
  // async fetchRecommend() {
  //   const res = await getRecomend(3778678)
  //   this.setData({
  //     recommendList: res.data.playlist.tracks.slice(0, 6)
  //   })
  //   console.log(this.data.recommendList)
  // }
})