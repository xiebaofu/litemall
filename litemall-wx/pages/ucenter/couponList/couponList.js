var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    couponList: [],
    status: 0,
    page: 1,
    size: 10,
    count: 0,
    scrollTop: 0,
    showPage: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCouponList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.nextPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getCouponList: function() {

    let that = this;
    /*that.setData({
      scrollTop: 0,
      showPage: false,
      couponList: []
    });*/
    // 页面渲染完成
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });

    util.request(api.CouponMyList, {
      status: that.data.status,
      page: that.data.page,
      size: that.data.size
    }).then(function(res) {
      if (res.errno === 0) {        
        console.info(res.data);        
        let _couponList = that.data.couponList;
        _couponList=_couponList.concat(res.data.data);
        console.info(_couponList);
        that.setData({
          scrollTop: 0,
          couponList: _couponList,
          showPage: true,
          count: res.data.count
        });
      }
      wx.hideToast();
    });

  },
  goExchange: function() {
    wx.showToast({
      title: '目前不支持',
      icon: 'none',
      duration: 2000
    });
  },
  goUse: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },
  nextPage: function(event) {   
    console.info("nextPage...."); 
    var that = this;
    /*if (this.data.page > that.data.count / that.data.size) {
      return true;
    }*/
    console.info("nextPage....");
    that.setData({
      page: that.data.page + 1
    });
    console.info(that.data.page);
    this.getCouponList();

  },
  prevPage: function(event) {
    if (this.data.page <= 1) {
      return false;
    }

    var that = this;
    that.setData({
      page: that.data.page - 1
    });
    this.getCouponList();
  },
  switchTab: function(e) {

    this.setData({
      couponList: [],
      status: e.currentTarget.dataset.index,
      page: 1,
      size: 10,
      count: 0,
      scrollTop: 0,
      showPage: false
    });

    this.getCouponList();
  },
})