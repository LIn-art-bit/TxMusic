import { getMvUrl, getMvInfo, getRelateMv } from "../../services/detail-video"

Page({
  data: {
    id: 0,
    mvUrl: "",
    mvInfo: {}
  },
  onLoad(options) {
    this.setData({id: options.id})
    this.fetchMvUrl()
    this.fetchRelateMv()
    this.fetchMvInfo()
  },
  async fetchMvUrl() {
    const res  = await getMvUrl(this.data.id)
    this.setData({
      mvUrl: res.data.data.url
    })
  },
  async fetchMvInfo() {
    const res = await getMvInfo(this.data.id)
    this.setData({
      mvInfo: res.data.data
    })
  },
  async fetchRelateMv() {
    const res = await getRelateMv(this.data.id)
    console.log(res.data)
  }
})