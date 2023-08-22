// pages/main-music/main-music.js
import {
  getSwipe,
  getMenu,
} from "../../services/music"
import {
  recommendStore
} from "../../stores/recomend-store"
import {
  rankStore
} from "../../stores/rank-store"
import {
  playStore
} from "../../stores/play-store"
Page({
  data: {
    banners: [],
    bannerHeigt: 0,
    recommendList: [],
    hotList:[],
    recommendMenu: [],
    screenWidth: 375,
    //榜单数据
    rankInfo: {}
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
    // 点击歌曲item
    itemClick(options) {
      playStore.setState("playSongList", this.data.recommendList)
      playStore.setState("playSongIndex", options.currentTarget.dataset.index)
    },
  recommendClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  onLoad() {
    this.fetchSwipe()
    this.fetchHot()
    recommendStore.dispatch("fetchRecommend")
    recommendStore.onState("recommendList", (value) => {
      if(value !== undefined)
      this.setData({
        recommendList: value?.tracks?.slice(0, 6)
      })
    })
    rankStore.dispatch("fetchRank")
    rankStore.onState("newRank", (value) => {
      const newRank = {...this.data.rankInfo, newRank: value}
      this.setData({rankInfo: newRank})
    })
    rankStore.onState("orginRank", (value) => {
      const newRank = {...this.data.rankInfo, orginRank: value}
      this.setData({rankInfo: newRank})
    })
    rankStore.onState("upRank", (value) => {
      const newRank = {...this.data.rankInfo, upRank: value}
      this.setData({rankInfo: newRank})
    })
    //获取屏幕宽度
    const app = getApp()
    this.setData({ screenWidth: app.globalData.screenWidth })
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
    getMenu().then((res) => {
      this.setData({
        hotList: res.data.playlists.slice(0, 6)
      })
    })
    getMenu("华语").then((res) => {
      this.setData({
        recommendMenu: res.data.playlists.slice(0, 6)
      })
    })
  },
})