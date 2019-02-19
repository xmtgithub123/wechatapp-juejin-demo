class API {
  constructor() {
    API.instance = wx.request
  }
  _api(url, type, data) {
    wx.showNavigationBarLoading()

    return new Promise((resolve, reject) => {
      API.instance({
        url,
        method: type,
        data,
        success(res) {
          wx.hideNavigationBarLoading()
          resolve(res)
        },
        fail() {
          wx.hideNavigationBarLoading()
          reject()
        }
      })
    })
  }
  get(url,data) {
    return this._api(url,'GET',data)
  } 
  post(url, data, contentType) {
    return this._api(url, data, 'POST', contentType)
  }
}
module.exports = API