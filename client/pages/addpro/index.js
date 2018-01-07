// pages/addpro/index.js

// 1,4,6
// 0,1
// 1,1,4
// 2,1,4,6

var util = require('../../utils/util.js')
var config = require('../../config')
let category = config.category;



Page({
  /**
   * 页面的初始数据
   */  
  data: {
    userId:'',
    multiArrayVal: [category[0], category[1][0], category[2][0][0]],
    multiIndexVal: [0, 0, 0],
    multiArray: [category[0], category[1][0], category[2][0][0]],
    multiIndex: [0, 0, 0],
    product_id:'', //产品ID列表
    productList:[],
    currentProductId:'',
    currentProductName:'',
    temp_product_id:'',//未保存之前 记录新添加的产品ID
    images:[],//产品图片
    description:''//添加产品记录描述
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.product_id){
        let tempArr = this.getCurrentCategory(options.product_id);
        this.setData({
          userId:options.userId,
          product_id: options.product_id,
          productList: tempArr,
          currentProductId: tempArr[0] ? tempArr[0].category_id : [],
          currentProductName: tempArr[0] ? tempArr[0].name : []
        });
    }else{
      this.setData({
        userId: options.userId
      });
    }
  },
  //点击产品tab选项卡时重置产品id name
  changeCurrentProduct(event){
    this.setData({
      currentProductId: event.currentTarget.dataset.proid,
      currentProductName: event.currentTarget.dataset.proname,
      images:[],
      description:''
    });
  },
  //根据产品ID列表 得到当前对应的产品名称
  getCurrentCategory:function(product_id){
    if (!product_id) return [];
    let categoryList = [];
    product_id.split('-').forEach(ids=>{
      let pro = ids.split(',');
      categoryList.push({
        category_id:ids,
        name:category[2][pro[0]][pro[1]][pro[2]]
      });
    });
    return categoryList;
  },
  //选择产品时设置 当前选中的产品 临时 存在 temp_product_id 中
  updateProductId: function (productId){
    if (this.data.product_id.indexOf(productId)!=-1){
      util.showSuccess('该产品已经存在')
      return;
    }
    this.setData({
      temp_product_id: productId
    });
    
  },
  //点击保存按钮时保存产品到用户信息，并生成一条初始的产品信息
  saveProductID:function(){
    //INPUT 有问题....
    //当前ID存在时，保存数据到产品追溯信息表
    if(this.data.currentProductId){
      if (!this.data.images.length && !this.data.description) {
        util.showModel('消息','请记录产品信息！')
        return;
      }
      var params = {
        product_id: this.data.currentProductId,
        supply_id: this.data.userId,
        description: this.data.description,
        images: this.data.images.toString()
      };
      this.insertTraceInfo(params);
      return;
    }
    if (!this.data.temp_product_id) {
      util.showModel('消息', '请选择产品！')
      return;
    }
    //判断该产品是否已经存在
    this.updateProductId(this.data.temp_product_id);
    if (!this.data.images.length) {
      util.showModel('消息', '请选择产品图片！')
      return;
    }
    let productId = this.data.temp_product_id;
    this.data.product_id = this.data.product_id ? (productId + '-' + this.data.product_id) : productId;
    let that = this;
    let tempArr = this.getCurrentCategory(this.data.product_id);
    let currentProductName = tempArr[0] ? tempArr[0].name : [];
    this.setData({
      product_id: this.data.product_id,
      productList: tempArr,
      currentProductId: tempArr[0] ? tempArr[0].category_id : [],
      currentProductName: currentProductName
    });
    wx.request({
      url: config.service.addProductId,
      data: {
        product_id: this.data.product_id,
        id: this.data.userId
      },
      method: 'post',
      success(result) {
        console.log('添加产品ID到用户表：', result);
        //产品信息表里，插入一条信息 userId  this.data.product_id info
        var params = {
          product_id: productId,
          supply_id: that.data.userId,
          description: util.formatTime(new Date(), 'Y-m-d') + '开始记录' + currentProductName + '产品可追溯信息，让农产品更有价值，更有温度的产品详情信息；泥信，傻傻的相信农民的利益一定会最大化，来自田地的一封信！',
          images: that.data.images.toString()
        };
        that.insertTraceInfo(params);
      },
      fail(error) {
        util.showModel('添加产品失败！', error)
      }
    });
  },
  //写入到产品追溯信息表
  insertTraceInfo:function(params){
    let that = this;
    wx.request({
      url: config.service.insertTraceInfo,
      data: params,
      method: 'post',
      success(result) {
        console.log('添加追溯信息成功：',result);
        that.setData({
          description:'',
          images:[]
        });
        util.showSuccess('信息已添加成功！')
      },
      fail(error) {
        util.showModel('添加产品追溯信息失败！', error)
      }
    })
  },
  //选择产品时，点击确定时触发
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value,
      multiIndexVal: e.detail.value,
      multiArrayVal: this.data.multiArray
    })
    this.updateProductId(String(e.detail.value));
  },
  //滑动产品列表时触发
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) { 
          case 0:
            data.multiArray[1] = category[1][0];
            data.multiArray[2] = category[2][0][0];
            break;
          case 1:
            data.multiArray[1] = category[1][1];
            data.multiArray[2] = category[2][1][0];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = category[2][0][0];
                break;
              case 1:
                data.multiArray[2] = category[2][0][1];
                break;
              case 2:
                data.multiArray[2] = category[2][0][2];
                break;
              case 3:
                data.multiArray[2] = category[2][0][3];
                break;
              case 4:
                data.multiArray[2] = category[2][0][4];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = category[2][1][0];
                break;
              case 1:
                data.multiArray[2] = category[2][1][1];
                break;
              case 2:
                data.multiArray[2] = category[2][1][2];
                break;
              case 3:
                data.multiArray[2] = category[2][1][3];
                break;
              case 4:
                data.multiArray[2] = category[2][1][4];
                break;
              case 5:
                data.multiArray[2] = category[2][1][5];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
   * 选择产品图片
   */
  getProductImg:function(event){
    var that = this;
    var count = this.data.currentProductId ? 9 : 1;
    wx.chooseImage({
      count: count, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          images: res.tempFilePaths
        });
      }
    })
  },
  /**
   * 获取产品的描述信息
   */
  setDescription(e){
    this.setData({
      description: e.detail.value
    });
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