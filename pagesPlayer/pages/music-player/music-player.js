import {
  playStore,
  audioContext
} from "../../stores/play-store"
import { throttle } from "underscore"
Page({
  data: {
    ids: 0,
    songInfo: {},
    lyric: [],
    statusBarHeight: 20,
    title: ["歌曲", "歌词"],
    currentIndex: 0, //当前歌词索引
    contentHeight: 0,
    currentPage: 0,
    currentTime: 0,
    durationTime: 0,
    play: true, // 控制播放
    playType: 0, // 播放形式 0顺序 1循环 2 随机
    sliderValue: 0, //播放进度
    isSliderChange: false,
    lyricScrollTop: 0,
    playSongList: [],
    playSongIndex: 0,
  },
  onLoad(options) {
    // 播放当前歌曲
    this.data.ids = options.id
    playStore.dispatch("handlePlay", this.data.ids)
    // 获取当前播放歌曲信息
    playStore.onStates(["playSongList","playSongIndex", "songInfo", "lyric", "durationTime", "currentTime", "sliderValue", "lyricScrollTop", "currentIndex", "play", "playType"], this.getCurrentPlay)
    playStore.dispatch("playMusicWithSongId", this.data.ids)
    // 动态计算导航和内容高度
    const app = getApp()
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight
    })
    this.setData({
      contentHeight: app.globalData.screenHeight - this.data.statusBarHeight - 44
    })
  },
  // 获取当前播放歌曲信息
  getCurrentPlay({playSongList, 
    playSongIndex, 
    songInfo, 
    lyric,
    play,
    currentTime,
    sliderValue,
    lyricScrollTop,
    currentIndex,
    playType,
    durationTime}) {
    if (playSongList !== undefined) {
        if(this.setData!== undefined) this.setData({ playSongList })
    }
    if (playSongIndex !== undefined) {
      if(this.setData!== undefined) this.setData({ playSongIndex })
    }
    if (songInfo !== undefined) {
      if(this.setData!== undefined) this.setData({ songInfo })
    }
    if (lyric !== undefined) {
      if(this.setData!==undefined) this.setData({ lyric })
    }
    if (durationTime !== undefined) {
      if(this.setData!== undefined) this.setData({ durationTime })
    }
    if (currentTime !== undefined) {
      if(this.setData!== undefined) this.setData({ currentTime })
    }
    if (sliderValue !== undefined) {
      if(this.setData!== undefined) this.setData({ sliderValue })
    }
    if (lyricScrollTop !== undefined) {
      if(this.setData!== undefined) this.setData({ lyricScrollTop })
    }
    if (currentIndex !== undefined) {
      if(this.setData!== undefined) this.setData({ currentIndex })
    }
    if (play !== undefined) {
      if(this.setData!== undefined) this.setData({ play })
    }
    if (playType !== undefined) {
      if(this.setData!== undefined) this.setData({ playType })
    }
  },
  // 返回
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 下一首
  playNext() {
    playStore.dispatch("playNext")
  },
  // 上一首
  playLast() {
    playStore.dispatch("playLast")
  },
  // 暂停/播放
  playClick() {
    playStore.dispatch("playClick")
  },
  changePlay() {
    playStore.dispatch("playChange")
  },
  siwperChange(event) {
    const index = event.detail.current
    this.setData({
      currentPage: index,
    })
  },
  sliderChange: throttle(function (event) {
    const value = event.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000) // 只能通过seek改变播放器时间
    this.setData({
      currentTime
    })
    // 当点击跳动时，后面歌曲还没缓存到，先进行个暂停
      audioContext.onWaiting(() => {
        audioContext.pause()
      })
      audioContext.onCanplay(() => {
        if(!this.data.play) return
        audioContext.play()
      })
  }, 100),
  titleClick(event) {
    this.setData({
      currentPage: event.currentTarget.dataset.index
    })
  },
})