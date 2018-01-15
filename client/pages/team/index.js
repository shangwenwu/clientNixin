// pages/team/index.js
// var WxParse = require('../wxParse/wxParse.js');
var data = require('./data.js');

let util = require('../../utils/util.js')
let config = require('../../config')
let category = config.category;


Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabState:1,
      userInfo:{},
      teamInfo:{},

      productListData:[],//团队产品列表


      pickingState:{
        pickingInfo: [],
        canCreate: [],
        canCreateName: [],
        canCreateNameIndex: 0,
        dialogCover: false,
        pickingData: {},
      },

      
      

      //tabState:1,
      //scrollLeft: 0,
      //分拣配送数据
      // showPorduct:false,//楼号牌已到室户
      // currentProductIndex:0,

      // productData:data.productData,
      // community:{
      //   current:[0,0],
      //   currentPosition:'',
      //   data: data.areaData
      // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data[0]
        });
        that.getProductListData();
      }
    })
  },


  changeState: function (e) {
    let state = e.currentTarget.dataset.state;
    this.setData({
      tabState: state
    })
    //采摘
    if (state == 2) {
        this.queryPickingInfo();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // this.getCurrentPosition();
  },

  /**
   * 获取产品列表
   * 没有加入团队，只显示自己的产品
   * 加入团队时，显示团队中成员的所有产品
   */
  getProductListData:function(){
    var that = this;
    if (this.data.userInfo.team_id){
    }else{
      this.setData({
        productListData: util.getCurrentCategory(that.data.userInfo.product_id, that.data.userInfo.id, that.getRowsInfo)
      });
    }
  },

  /**
   * 查找产品的缩略图 及 预售情况 及价格
   */
  getRowsInfo: function (userId, id) {
    let that = this;
    wx.request({
      url: config.service.queryUserOneProductList,
      data: { product_id: id, supply_id: userId },
      method: 'post',
      success(result) {
        let data = result.data.data;
        
        that.data.productListData.some((item, index) => {
          if (item.category_id == id) {
            item.images = data[0].images;
            item.count = data.length;
            item.photo = that.data.userInfo.photo;
            item.userId = that.data.userInfo.id;
            that.setData({
              productListData: that.data.productListData
            });
            return true;
          }
        });

      },
      fail(error) {
        util.showModel('消息', '行数据查找失败')
      }
    });
    this.getProSales(userId, id);
  },
  /**
   * 获取产品的预售情况
   */
  getProSales: function (supply_id, product_id){
    //先查找当前产品是否为预售中
    let that = this;
    let params = {
      product_id: product_id,
      supply_id: supply_id
    };
    wx.request({
      url: config.service.querySalesInfo,
      data: params,
      method: 'post',
      success(result) {
        let data = result.data.data;
        that.data.productListData.some((item, index) => {
          if (item.category_id == product_id) {
            item.price = data.length ? data[0].price : '生长期' ;
            that.setData({
              productListData: that.data.productListData
            });
            return true;
          }
        });
      },
      fail(error) {
        util.showModel('消息', '产品是否为预售中，查寻失败！')
      }
    });
  },




  

  //保存 采摘信息
  insertPickingInfo:function(data){
    let that = this;
    data.images = data.pickingimages.toString();
    delete data.pickingimages;
    wx.request({
      url: config.service.insertPickingInfo,
      data: that.data.pickingState.pickingData,
      method: 'post',
      success(result) {
        if (result.data.data.insertId){
            that.setData({
              pickingState: Object.assign(that.data.pickingState, { pickingData: {} }),
            })
            that.queryPickingInfo();
            that.changeDialogCover();
        }
      },
      fail(error) {
        util.showModel('消息', '增加采摘接口错误！')
      }
    });

    

  },
  //删除 采摘信息
  deletePickingInfo: function () { },
  //查询 采摘信息
  queryPickingInfo: function () {
    let that = this;
    let ids = this.data.userInfo.product_id.split('-');
    let arr = util.getCurrentCategory(this.data.userInfo.product_id);
    let canCreateName = [];
    arr.forEach(item=>{
      canCreateName.push(item.name);
    });

    that.setData({
      pickingState: Object.assign(this.data.pickingState, { canCreate: arr, canCreateName: canCreateName, pickingData:Object.assign(this.data.pickingState.pickingData, { product_id: arr[0].category_id })})
    });

    wx.request({
      url: config.service.queryPickingInfo,
      data: { supply_id: this.data.userInfo.id, product_id:'0,3,0'},
      method: 'post',
      success(result) {
        let data = result.data.data;

        if(data.length){
          let pickingInfo = [];
          data.map(function(item){
            pickingInfo.push(item)
            let i = ids.indexOf(item.product_id);
            if(i != -1){
                ids.splice(i,1);
            };
          });

          if(ids.length > 1){
              var str = '';
              ids.map((row,index)=>{
                str += index ? ('-'+row) : row;
              });
              ids = str;
          }else{
            ids = ids[0];
          }

          let arr = util.getCurrentCategory(ids);
          let canCreateName = [];
          arr.forEach(item => {
            canCreateName.push(item.name);
          });
          that.setData({
            pickingState: Object.assign(that.data.pickingState, { pickingInfo: pickingInfo, canCreate: arr, canCreateName: canCreateName, pickingData: Object.assign(that.data.pickingState.pickingData, { product_id: arr.length ? arr[0].category_id : '' })}),
          });

        }

        console.log(that.data.pickingState);
      },
      fail(error) {
        util.showModel('消息', '查询采摘接口错误！')
      }
    });
    //根据teamID 查找团队的其它成员的采摘信息
    //this.data.userInfo.team_id
  },
  
  //点击创建采摘活动按钮触发
  changeDialogCover: function () {
    this.setData({
      pickingState: Object.assign(this.data.pickingState, { dialogCover: !this.data.pickingState.dialogCover })
    });
  },
  //保存采摘信息 
  savePickingData(event) {
      var temp = {};
      if (event.currentTarget.dataset.attr == 'product_id'){
        this.data.pickingState.pickingData[event.currentTarget.dataset.attr] = this.data.pickingState.canCreate[event.detail.value].category_id;
        this.data.pickingState.canCreateNameIndex = event.detail.value;
      }else{
        this.data.pickingState.pickingData[event.currentTarget.dataset.attr] = event.detail.value;
      }
      
      this.setData({
        pickingState: Object.assign(this.data.pickingState, { canCreateNameIndex: this.data.pickingState.canCreateNameIndex, pickingData: this.data.pickingState.pickingData })
      })
      
  },
  /**
   * 选择产品图片
   */
  getPickingImg: function (event) {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.pickingState.pickingData.pickingimages = res.tempFilePaths
        that.setData({
          pickingState: that.data.pickingState
        });
      }
    })
  },
  //保存产品预售信息
  savePicking:function(){
    var data = this.data.pickingState.pickingData;
    data.supply_id = this.data.userInfo.id;
    if (data.description && data.pickingimages && data.product_id && data.title){
      this.insertPickingInfo(data);
    }else{
      util.showModel('消息', '信息不完整！')
    }
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
  
  },





















  //设置 分拣 数据
  setasdfaf:function(){
    //已经有了自己的团队
    if (res.data[0].team_id) {

      res.data[0].leader = false;

      var isOrder = that.data.productData.some((row, index) => { //检验订单中有没有当前用户的订单
        if (row.member.name == res.data[0].nick_name) {
          var temp = that.data.productData.splice(index, 1);
          that.data.productData.splice(0, 0, temp[0]);
          that.setData({
            productData: that.data.productData,
            userInfo: res.data[0]
          })
          return true;
        }
        return false;
      });

      if (res.data[0].leader) { //如果是团队leader时，在分拣列表最前边可以检验当前的分配情况是否完成
        that.data.productData.splice(0, 0, {
          leader: true,
          member: {
            name: res.data[0].nick_name,
            photo: res.data[0].photo
          }
        })
        that.setData({
          productData: that.data.productData
        })
      }

      //当前用户还没有收到订单
      if (res.data[0].leader && isOrder) { //如果是团队创建人并且他还有订单时
        that.setData({
          currentProductIndex: 1
        })
      } else if ((res.data[0].leader && !isOrder) || isOrder) { //如果是团队创建人并且他没有订单时  或者 当前用户没有订单时
        that.setData({
          currentProductIndex: 0
        })
      } else {
        that.setData({ //当前用户没有订单也不是团队创建人时
          currentProductIndex: 'false'
        })
      }

    } else {
    }
  },

  changeProduct(event) {
    this.clearFlag();
    this.setData({
      currentProductIndex: event.currentTarget.dataset.index,
      community: Object.assign(this.data.community, { current: [0, 0] }),
      showPorduct: false
    })
  },
  clearFlag() {
    var eachFlag = function (arr) {
      arr.map((row, index) => {
        row.flag = false;
        if (row.children) {
          eachFlag(row.children);
        }
      });
    }
    eachFlag(this.data.community.data);
  },
  getCurrentPosition(flag) {
    var str = '',
      current = this.data.community.current,
      data = this.data.community.data[current[0]];
    for (let i = 1; i < current.length; i++) {
      data = data.children[current[i]];
      if (data.value) {
        str += data.value;
      } else {
        if (flag) {
          data.flag = true;
        }
        str += data.num + '室';
      }
    }

    this.setData({
      community: Object.assign(this.data.community, { currentPosition: str })
    })
  },
  changeCurrent: function (event) {
    var val = event.currentTarget.dataset.index,
      showPorduct = event.currentTarget.dataset.showporduct;
    var backVal = this.data.showPorduct;
    (!!showPorduct != this.data.showPorduct) && this.setData({ showPorduct: !!showPorduct });

    if (typeof val == 'string') {
      if (val == 'back') {
        if (!backVal) {
          var arr = this.data.community.current.splice(0, this.data.community.current.length - 1);
          this.setData({
            community: Object.assign(this.data.community, { current: arr })
          })
          this.getCurrentPosition();
        }
      } else {
        var arr = val.split('_');
        this.data.community.current.splice(arr[0], 1, Number(arr[1]));
        if (showPorduct) {
          this.showPro();
        } else {
          this.data.community.current.push(0);
        }
        this.setData({
          community: Object.assign(this.data.community, { current: this.data.community.current })
        })
        this.getCurrentPosition();
      }
    } else if (typeof val == 'number') {
      this.setData({
        community: Object.assign(this.data.community, { current: [val, 0] })
      });
      this.getCurrentPosition();
    }
  },

  showPro() {
  },

  finishPro() {
    this.getCurrentPosition(true);
  },

  tapMove: function (e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 10
    })
  },
  scroll: function (e) {
    this.setData({
      scrollLeft: e.detail.scrollLeft
    })
  }







})