// pages/feidian/feidian.js
const systeminfo = getApp().globalData.systeminfo
const config = getApp().globalData.config
const utils = require('../../utils/util.js')
const API = require('../../api/api.js')
const api = new API()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    COUNT: 30,
    recommendList:[],//swiper 数据源
    scrollTop:0,
    swiperHeight:'auto',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init()
  },
  init() {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.initSwiper()
    this.getHotRecommendList()
    this.pinListRecommend(true)
  },
  initSwiper(){
    console.log(systeminfo)
    this.setData({
      swiperHeight: `${(systeminfo.windowWidth || systeminfo.screenWidth) / 375 * 135 }px`
    })
  },
  getHotRecommendList(){
    let that = this
    const auth = this.data.auth
    const data = {
      uid: auth.uid,
      device_id: auth.clientId,
      client_id: auth.client_id,
      token: auth.token,
      src: 'web',
    }
    api.get(`${config.shortMsgMsRequestUrl}/getHotRecommendList`, data).then((res)=> {
      console.log(res)
      let data = res.data
      if(data.s == 1) {
        that.setData({
          recommendList:data.d.list || []
        })
      }
    })
    .catch((err)=>{
      wx.showToast({
        title: '网路开小差，请稍后再试',
        icon: 'none',
      })
    })
  },
  pinListRecommend(reload){
    let that = this
    const auth = this.data.auth
    const data = {
      uid: auth.uid,
      device_id: auth.clientId,
      token: auth.token,
      src: 'web',
      limit: this.data.COUNT,
      before: '',
    }
    api.get(`${config.shortMsgMsRequestUrl}/pinList/recommend`, data).then((res) => {
      console.log(res)
      let data = res.data
      if(data.s === 1) {
        that.setData({
          list: data.d.list || []
        })
      }
    }).catch((err)=> {

    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})