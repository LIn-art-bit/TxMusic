import {
  rankStore
} from "../../stores/rank-store"
import {
  recommendStore
} from "../../stores/recomend-store"
import {
  playStore
} from "../../stores/play-store"
import {
  getRecomend
} from "../../services/music"
Page({
  data: {
    songInfo: {},
    type: ''
  },
  onLoad(options) {
    this.setData({type: options.type})
    if (options.type === 'ranking') {
      const key = options.key
      // console.log(key)
      rankStore.onState(key, this.handleSong)
    } else if (options.type === 'recommend') {
      recommendStore.onState('recommendList', this.handleSong)
    } else if (options.type === 'menu') {
      const id = options.id
      this.fetchMenuInfo(id)
    }
  },
  handleSong(value) {
    if(value !== undefined) this.setData({songInfo: value})
  },
  itemClick(options) {
    playStore.setState("playSongList", this.data.songInfo.tracks)
    playStore.setState("playSongIndex", options.currentTarget.dataset.index)
  },
  async fetchMenuInfo(id) {
    const res = await getRecomend(id)
    this.setData({songInfo: res.data.playlist})
  }
})