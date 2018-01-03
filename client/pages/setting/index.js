// pages/setting/index.js

var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    supplier: {
      name: '',
      address: '',
      mobile: '',
      num: ''
    },
    imgUrl: [],
    uploadUrl: config.service.uploadUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },


  saveData(event) {
    if (event.detail.value != this.data.name) {
      var temp = {};
      temp[event.currentTarget.dataset.attr] = event.currentTarget.dataset.attr == 'num' ? event.detail.value + 20 : event.detail.value;
      this.setData({
        supplier: Object.assign(this.data.supplier, temp)
      })
    };
  },

  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 9,
      // sizeType: ['compressed'],
      // sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths
        filePath.map(function (imgPath) {
          // 上传图片
          wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: imgPath,
            name: 'file',

            success: function (res) {
              util.showSuccess('上传图片成功')
              res = JSON.parse(res.data)
              that.data.imgUrl.push(res.data.imgUrl)
              that.setData({
                imgUrl: that.data.imgUrl
              })
            },

            fail: function (e) {
              util.showModel('上传图片失败')
            }
          })
        });

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
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