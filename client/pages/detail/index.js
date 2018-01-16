// pages/detail/index.js
let util = require('../../utils/util.js')
let config = require('../../config');
let category = config.category;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    proId:'',
    userId:'',
    dataLogs:[],
    userInfo:{},
    dialogCover:false,
    price:'200元/斤',
    weight:'',
    salesStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ proId: options.proId, userId: options.userId })
    this.getRowsInfo(options.userId, options.proId);
    this.getUserInfo(options.userId, options.proId);
  },
  /**
   * 获取 产品追溯信息时间骤详情信息
   * 参数 用户id 产品id
   */
  getRowsInfo: function (userId, id) {
    let that = this;
    wx.request({
      url: config.service.queryUserOneProductList,
      data: { product_id: id, supply_id: userId, desc:true },
      method: 'post',
      success(result) {
        result.data.data.forEach(row=>{
          row.monthDay = util.formatTime(new Date(row.create_time),'m/d');
          row.year = util.formatTime(new Date(row.create_time), 'Y');
          if (row.images){
            row.images = row.images.split(',');
          }else{
            row.images = [];
          }
        });
        that.setData({
          dataLogs: result.data.data
        });
      },
      fail(error) {
        util.showModel('消息', '行数据查找失败')
      }
    });
  },
  getUserInfo: function (userId, proId){
    let that = this;
    wx.request({
      url: config.service.findUserInfo,
      data: { id: userId},
      method: 'post',
      success(result) {
        let data = result.data.data[0];
        data.productName = that.getProductName(proId);
        that.setData({
          userInfo:data
        });
      },
      fail(error) {
        util.showModel('消息', '用户信息查找失败！')
      }
    });
  },
  //根据产品ID列表 得到产品名称
  getProductName: function (product_id) {
      let pro = product_id.split(',');
      return category[2][pro[0]][pro[1]][pro[2]];
  },
  /**
   * 删除预售信息 结束销售
   */
  deleteSalesInfo : function(){
    let that = this;
    let params = {
      product_id: this.data.proId,
      supply_id: this.data.userId
    };
    wx.request({
      url: config.service.deleteSalesInfo,
      data: params,
      method: 'post',
      success(result) {
        if (result.data.data.affectedRows) {
          that.showDialog();
          that.changeSalesStatus();
        };
      },
      fail(error) {
        util.showModel('消息', '产品预售信息删除失败！')
      }
    });
  },
  /**
   * 增加预售信息 开始销售
   */
  insertSalesInfo:function(){
    let that = this;
    if (this.data.salesStatus) { //销售中时 触发 结束销售
      this.deleteSalesInfo();
      return;
    }
    if (!this.data.weight || !this.data.price){
      util.showModel('消息', '请输入预计出售斤秤！');
      return;
    }
    let params = {
      product_id: this.data.proId,
      supply_id: this.data.userId,
      weight:this.data.weight,
      price:this.data.price
    };
    wx.request({
      url: config.service.insertSalesInfo,
      data: params,
      method: 'post',
      success(result) {
        if(result.data.data.affectedRows){
          that.showDialog();
          that.changeSalesStatus();
        };
      },
      fail(error) {
        util.showModel('消息', '用户信息查找失败！')
      }
    });
  }, 
  //获取 预计出售斤秤
  changeWeight:function(event){
    this.setData({
      weight: event.detail.value
    });
  },
  //改变预售状态
  changeSalesStatus: function () {
    this.setData({
      salesStatus: !this.data.salesStatus
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    this.dialog = this.selectComponent("#dialog");
  },
  //点击预售按钮触发
  showDialog() {
    this.dialog.showOrHideDialog();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //先查找当前产品是否为预售中
      let that = this;
      let params = {
        product_id: this.data.proId,
        supply_id: this.data.userId
      };
      wx.request({
        url: config.service.querySalesInfo,
        data: params,
        method: 'post',
        success(result) {
          if (result.data.data.length){
            that.changeSalesStatus();
          }
        },
        fail(error) {
          util.showModel('消息', '产品是否为预售中，查寻失败！')
        }
      });
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
  
  },

  onGoBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})