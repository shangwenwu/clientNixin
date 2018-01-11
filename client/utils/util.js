let config = require('../config')
let category = config.category;

//根据产品ID列表 得到当前对应的产品名称
const getCurrentCategory = function (product_id, userId, callback) {
  if (!product_id) return [];
  let categoryList = [];
  product_id.split('-').forEach(ids => {
    callback && callback(userId, ids);
    let pro = ids.split(',');
    categoryList.push({
      category_id: ids,
      name: category[2][pro[0]][pro[1]][pro[2]]
    });
  });
  return categoryList;
}


const formatTime = (date,rule) => {
  const year = date.getFullYear()
  if (rule == 'Y') {
    return year;
  }
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (rule == 'm/d') {
    return [month, day].map(formatNumber).join('/');
  }
  if (rule == 'm-d') {
    return [month, day].map(formatNumber).join('-');
  }
  if(rule == 'Y-m-d'){
    return [year, month, day].map(formatNumber).join('-');
  }else if (rule == 'Y-m-d H:m:s') {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }else if (rule == 'Y/m/d') {
    return [year, month, day].map(formatNumber).join('/');
  }else if (rule == 'H:m:s') {
    return [hour, minute, second].map(formatNumber).join(':');
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: typeof content == 'string' ? content : JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, getCurrentCategory }
