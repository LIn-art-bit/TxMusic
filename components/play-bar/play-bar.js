import {
  playStore
} from "../../stores/play-store"
Component({
  properties: {
  },
  created() {
    playStore.onStates(["songInfo", "play"], ({songInfo, play}) => {
      if(songInfo !== undefined)   this.setData({currentsong: songInfo})
      if(play !== undefined) this.setData({currentplay: play})
    })
  },
  data: {
    currentsong: {},
    currentplay: true
  },
  methods: {
    playClick() {
      playStore.dispatch("playClick")
    },
    // headClick() {
    //   const id = this.data.currentsong.id
    //   console.log(this.data.currentsong)
    //   wx.navigateTo({
    //     url: `/pages/music-player/music-player`,
    //   })
    // }
  }
})
