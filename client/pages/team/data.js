var productData = [
  {
    name: '西红柿',
    sales: '186斤',
    flag: false,
    member: {
      name: '王五',
      photo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1946928627,855910382&fm=27&gp=011.jpg',
      userId: 9
    }
  }, {
    name: '土豆',
    sales: '100斤',
    flag: false,
    member: {
      name: '攀岩人',
      photo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=866999120,2686226874&fm=27&gp=0.jpg',
      userId: 12
    }
  },
  {
    name: '青椒',
    sales: '500斤',
    flag: false,
    member: {
      name: '张三',
      photo: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=20561818,1110986003&fm=27&gp=0.jpg',
      userId: 11
    }
  }, {
    name: '黄瓜',
    sales: '224斤',
    flag: false,
    member: {
      name: '李四',
      photo: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1421227023,3425195951&fm=27&gp=0.jpg',
      userId: 10
    }
  }, {
    name: '豇豆',
    sales: '897斤',
    flag: false,
    member: {
      name: '马六',
      photo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3977898697,431463935&fm=27&gp=0.jpg',
      userId: 8
    }
  }, {
    name: '油麦',
    sales: '628斤',
    flag: false,
    member: {
      name: '李白',
      photo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3548819412,514148939&fm=27&gp=0.jpg',
      userId: 7
    }
  }
];

var areaData = [
  {
    value: '莲花池南里小区',
    flag: true,
    children: [
      {
        value: '1号楼',
        flag: false,
        children: [
          {
            value: '1层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }, { num: 6, flag: false }, { num: 7, flag: false }, { num: 8, flag: false }]
          }, {
            value: '2层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }, { num: 6, flag: false }, { num: 7, flag: false }, { num: 8, flag: false }]
          }, {
            value: '3层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }, { num: 6, flag: false }, { num: 7, flag: false }, { num: 8, flag: false }]
          }
        ]
      },
      {
        value: '2号楼',
        flag: false,
        children: [
          {
            value: '1层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }]
          }, {
            value: '2层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }]
          }, {
            value: '3层',
            flag: false,
            children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }, { num: 4, flag: false }, { num: 5, flag: false }]
          }
        ]
      }
    ]
  },
  {
    value: '莲怡园小区',
    flag: false,
    children: [
      {
        value: '1号楼',
        flag: false,
        children: [
          {
            value: '1单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          },
          {
            value: '2单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          }
        ]
      },
      {
        value: '2号楼',
        flag: false,
        children: [
          {
            value: '1单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          },
          {
            value: '2单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          },
          {
            value: '3单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          }
        ]
      },
      {
        value: '3号楼',
        flag: false,
        children: [
          {
            value: '1单元',
            flag: false,
            children: [
              {
                value: '1层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '2层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }, {
                value: '3层',
                flag: false,
                children: [{ num: 1, flag: false }, { num: 2, flag: false }, { num: 3, flag: false }]
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = {
  areaData: areaData,
  productData: productData
}