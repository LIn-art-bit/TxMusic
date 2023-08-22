import {
  getMenu,
  getMenuTag
} from "../../services/music"
Page({
  data: {
    allSongMenu: []
  },
  onLoad(options) {
    this.fetchAllList()
  },
  async fetchAllList() {
    const res = await getMenuTag()
    const tags = res.data.tags
    // console.log(tags)
    //获取所有tags的promise
    let allPromise = []
    for (const tag of tags) {
      const promise = getMenu(tag.name)
      allPromise.push(promise)
    }
    Promise.all(allPromise).then((res) => {
      for (const item of res) {
        item.data.playlists.splice(0, 40)
      }
      this.setData({
        allSongMenu: res
      })
    })
  }
})