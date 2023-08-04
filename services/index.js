class TxRequest {
  constructor(baseUrl, timeOut) {
    this.baseUrl = baseUrl
    this.timeOut = timeOut
  }
  request(options) {
    return new Promise((resolve, reject) => {
      const { url } = options
      wx.request({
        ...options,
        url: this.baseUrl + url,
        timeOut: this.timeOut,
        success: (res) => {
          resolve(res)
        },
        fail: reject
      })
    })
  }
  get(options) {
    return this.request({
      ...options,
      method: "get"
    })
  }
  post(options) {
    return this.request({
      ...options,
      method: "post"
    })
  }
}
// http://codercba.com:9002
export default new TxRequest("http://123.207.32.32:9002", 6000)