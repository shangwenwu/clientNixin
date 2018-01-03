//index.js

var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    star:1
  },

  onReady:function(){
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo
        })
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })

    // this.login();
    this.saveProduct();
  },

  saveProduct:function(){
    wx.request({
      url: config.service.saveProduct,
      data: {user:'9999',name:'8888'},
      method:'post',
      success(result) {
        util.showSuccess('数据写入成功')
        console.log(result);
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  },



  /**
   * 添加产品 添加产品动态
   */
  addProduct() {
    wx.navigateTo({
      url: '../addpro/index'
    })
  },


  /**
   * 产品详情介绍
   */  
  goDetail() {
    wx.navigateTo({
      url: '../detail/index'
    })
  }
})
