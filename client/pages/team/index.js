// pages/team/index.js
// var WxParse = require('../wxParse/wxParse.js');
var data = require('./data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabState:1,
      userInfo:{},
      scrollLeft: 0,
      
      //分拣配送数据
      showPorduct:false,//楼号牌已到室户
      currentProductIndex:0,
      productData:data.productData,
      community:{
        current:[0,0],
        currentPosition:'',
        data: data.areaData
      }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,user={};
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {

        res.data.leader = true;
        
        var isOrder = that.data.productData.some((row, index) => {
          if (row.member.name == res.data.nickName) {
            var temp = that.data.productData.splice(index,1);
            that.data.productData.splice(0,0,temp[0]);
            that.setData({
              productData: that.data.productData,
              userInfo: res.data
            })
            return true;
          }
          return false;
        });

        if(res.data.leader){ //如果是团队leader
          that.data.productData.splice(0, 0, {
            leader:true,
            member:{
              name:res.data.nickName,
              photo:res.data.avatarUrl
            }
          })
          that.setData({
            productData: that.data.productData
          })
        }

        //当前用户还没有收到订单
        if (res.data.leader && isOrder){
          that.setData({
            currentProductIndex: 1
          })
        } else if (res.data.leader && !isOrder){
          that.setData({
            currentProductIndex: 0
          })
        }else{
          that.setData({
            currentProductIndex: 'false'
          })
        }
        

      }
    })
    
    

    this.getCurrentPosition();
  },

  changeProduct(event){
    this.clearFlag();
    this.setData({
      currentProductIndex : event.currentTarget.dataset.index,
      community: Object.assign(this.data.community, { current: [0, 0] }),
      showPorduct:false
    })
  },
  clearFlag(){
    var eachFlag = function(arr){
        arr.map((row,index)=>{
            row.flag = false;
            if(row.children){
              eachFlag(row.children);
            }
        });
    }
    eachFlag(this.data.community.data);
  },
  getCurrentPosition(flag){
    var str = '',
      current = this.data.community.current,
      data = this.data.community.data[current[0]];
    for (let i = 1; i < current.length; i++) {
      data = data.children[current[i]];
      if (data.value) {
        str += data.value;
      } else {
        if(flag){
          data.flag = true;
        }
        str += data.num + '室';
      }
    }

    this.setData({
      community: Object.assign(this.data.community, { currentPosition: str })
    })
  },
  changeCurrent:function(event){
    var val  = event.currentTarget.dataset.index,
      showPorduct = event.currentTarget.dataset.showporduct;
    var backVal = this.data.showPorduct;
    (!!showPorduct != this.data.showPorduct) && this.setData({showPorduct:!!showPorduct});

    console.log(val,88888);
    if (typeof val == 'string'){
        if (val == 'back'){
            if (!backVal){
                var arr = this.data.community.current.splice(0, this.data.community.current.length-1);
                this.setData({
                  community: Object.assign(this.data.community, { current: arr })
                })
                console.log('aaaaaaaaaa');
                this.getCurrentPosition();
            }
        }else{
            var arr = val.split('_');
            this.data.community.current.splice(arr[0], 1, Number(arr[1]));
            if (showPorduct) {
              this.showPro();
            }else{
              this.data.community.current.push(0);
            }
            this.setData({
              community: Object.assign(this.data.community, {current: this.data.community.current})
            })
            console.log('ooooooooooooooo');
              this.getCurrentPosition();
        }
    } else if (typeof val == 'number'){
       this.setData({
         community: Object.assign(this.data.community, {current: [val,0]})
       });
       console.log('ggggggggggggggggg');
       this.getCurrentPosition();
    }
  },

  showPro(){
    console.log(this.data.community.current);
  },

  finishPro(){
    console.log('666666666666');
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
  
  },


  changeState: function (e) {
    this.setData({
      tabState: e.currentTarget.dataset.state
    })
  }


})