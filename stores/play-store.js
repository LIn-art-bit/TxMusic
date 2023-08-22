import {
  HYEventStore
} from "hy-event-store"
import {
  getMusicDetail,
  getlyric
} from "../services/music-player"
import {
  formatLyric
} from "../utils/formatLyric"
export const audioContext = wx.createInnerAudioContext()
export const playStore = new HYEventStore({
  state: {
    playSongList: [],
    playSongIndex: 0,
    currentTime: 0,
    currentIndex: 0, //歌词索引
    sliderValue: 0,
    lyricScrollTop: 0, // 歌词偏移量
    ids: 0,
    playType: 0,
    songInfo: {},
    lyric: [],
    durationTime: 0,
    play: true, // 控制播放
  },
  actions: {
     playMusicWithSongId(ctx, ids) {
      ctx.ids = ids
      ctx.currentTime = 0   
      ctx.sliderValue = 0   
      ctx.lyricScrollTop = 0   
      ctx.play = true
      getMusicDetail(ids).then((res) => {
        ctx.songInfo = res.data.songs[0]
        ctx.durationTime = ctx.songInfo.dt
      })
      getlyric(ids).then((res) => {
        let lyric = formatLyric(res.data.lrc.lyric)
        lyric = lyric.filter((item) => {
          return item.text !== ""
        })
        ctx.lyric = lyric
      })
    },
    playNext(ctx) {
      let index = ctx.playSongIndex
      switch (ctx.playType) {
        case 0:
          index++
          if (index >= ctx.playSongList.length) index = 0
          break;
        case 1:
          break;
        case 2:
          index = Math.floor(Math.random() * ctx.playSongList.length)
      }
      ctx.playSongIndex = index
      console.log()
      this.dispatch("handlePlay", ctx.playSongList[index].id)
      this.dispatch("playMusicWithSongId", ctx.playSongList[index].id)
    },
    playLast(ctx) {
      let index = ctx.playSongIndex
      switch (ctx.playType) {
        case 0:
          index--
          if (index >= ctx.playSongList.length) index = ctx.playSongList.length - 1
          break;
        case 1:
          break;
        case 2:
          index = Math.floor(Math.random() * ctx.playSongList.length)
      }
      ctx.playSongIndex = index
      this.dispatch("handlePlay", ctx.playSongList[index].id)
      this.dispatch("playMusicWithSongId", ctx.playSongList[index].id)
    },
    handlePlay(ctx, id) {
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      audioContext.onTimeUpdate(() => {
        this.dispatch("handleUpdate")
      })
      audioContext.onEnded(() => {
        this.dispatch("playNext")
      })
    },
    // 更新歌词索引
    handleUpdate(ctx) {
      const currentTime = audioContext.currentTime * 1000
      ctx.currentTime = currentTime
      const sliderValue = currentTime / ctx.durationTime * 100
      ctx.sliderValue = sliderValue
      // 歌词匹配
      if (!ctx.lyric.length) return
      let index = ctx.lyric.length - 1
      for (let i = 0; i < ctx.lyric.length; i++) {
        if (currentTime < ctx.lyric[i].time) {
          index = i - 1
          break
        }
      }
      ctx.currentIndex = index,
      ctx.lyricScrollTop = index * 60
    },
    // 控制播放/暂停
    playClick(ctx) {
      ctx.play = !ctx.play
      if (ctx.play) audioContext.play()
      else audioContext.pause()
    },
    // 播放模式
    playChange(ctx) {
      let playType = ctx.playType
       playType++
      if (playType > 2) ctx.playType = 0
      else ctx.playType = playType
    }
  }
})