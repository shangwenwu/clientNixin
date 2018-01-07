let util = require('../../utils/util.js')
let config = require('../../config')
let category = config.category;

Page({
  data: {
    userInfo: {},
    star:1,
    isExist:false,
    userId:'',
    productRows:[],
    product_id:''
  },
  //拼接用户信息参数
  getParams:function(res){
    let address = res.country + ' ' + res.province + ' ' + res.city;
    let params = {
      nick_name: res.nickName,
      photo: res.avatarUrl,
      address: address
    }
    return params;
  },
  /**
   * 根据用户查询 supply_id:this.data.userId  product_id:ids
   * 获得产品首次添加时的图片
   * 获得产品的记录条数
   */
  getRowsInfo:  function (userId,id){
     let that = this;
      wx.request({
        url: config.service.queryUserOneProductList,
        data: { product_id: id, supply_id: userId },
        method: 'post',
        success(result) {
          let data = result.data.data;
          that.data.productRows.some((item,index)=>{
            if (item.category_id == id){
              item.images = data[0].images;
              item.count = data.length;
              that.setData({
                productRows: that.data.productRows
              });
              return true;
            }
          });
        },
        fail(error) {
          util.showModel('消息', '行数据查找失败')
        }
      });
  },
  
  //根据产品ID列表 得到当前对应的产品名称
  getCurrentCategory: function (product_id, userId) {
    if (!product_id) return [];
    let categoryList = [];
    product_id.split('-').forEach(ids => { 
      this.getRowsInfo(userId, ids);
      let pro = ids.split(',');
      categoryList.push({
        category_id: ids,
        name: category[2][pro[0]][pro[1]][pro[2]]
      });
    });
    return categoryList;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    if(this.data.userInfo.nickName){
      this.findUserName(this.data.userInfo.nickName, {}, this);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(){
    this.getWxUserInfo();
  },
  /**
   * 获取微信用户信息
   */
  getWxUserInfo:function(){
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
        let params = that.getParams(res.userInfo);
        !that.isExist && that.findUserName(params.nick_name, params, that);
      }
    });
  },
  /**
   * 查找用户是否被保存
   */
  findUserName: function (nickName, params, that){
    wx.request({
      url: config.service.findUserName,
      data: { nick_name: nickName},
      method: 'post',
      success(result) {
        if(result.data.data.length){
          let product_ids = result.data.data[0].product_id;
          let userId = result.data.data[0].id;
          that.setData({
            isExist: true,
            userId:userId,
            product_id: product_ids,
            productRows: that.getCurrentCategory(product_ids, userId)
          })
        }else{
          //保存用户信息
          that.saveUserInfo(params);
        }
      },
      fail(error) {
        util.showModel('查找用户失败', error)
      }
    })
  },
  /**
   * 保存用户信息
   */
  saveUserInfo: function (params){
    let that = this;
    wx.request({
      url: config.service.saveUserInfo,
      data: params,
      method: 'post',
      success(result) {
        util.showSuccess('保存用户成功')
        that.setData({
          userId: result.data.data,
        })
      },
      fail(error) {
        util.showModel('保存用户失败', error)
      }
    })
  },
  /**
   * 添加产品 添加产品动态
   */
  addProduct() {
    let that = this;
    wx.navigateTo({
      url: '../addpro/index?userId=' + that.data.userId + '&product_id=' + that.data.product_id
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
