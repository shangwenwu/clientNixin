/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://www.nixin8.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        saveUserInfo: `${host}/saveUserInfo`,
        updateUserInfo: `${host}/updateUserInfo`,
        // saveProduct: `${host}/saveProduct`,
        findUserInfo: `${host}/findUserName`,
        addProductId: `${host}/addProductId`,

        insertTraceInfo: `${host}/insertTraceInfo`,
        queryUserOneProductList: `${host}/queryUserOneProductList`,


        //保存 预计销售产品
        insertSalesInfo: `${host}/insertSalesInfo`,
        //删除 预计销售产品
        deleteSalesInfo: `${host}/deleteSalesInfo`,
        //查询 预计销售产品
        querySalesInfo: `${host}/querySalesInfo`,


        //保存 采摘信息
        insertPickingInfo: `${host}/insertPickingInfo`,
        //删除 采摘信息
        deletePickingInfo: `${host}/deletePickingInfo`,
        //查询 采摘信息
        queryPickingInfo: `${host}/queryPickingInfo`,


        //保存 创建团队信息
        insertTeamInfo: `${host}/insertTeamInfo`,
        //删除 团队信息
        deleteTeamInfo: `${host}/deleteTeamInfo`,
        //查询 团队信息
        queryTeamInfo: `${host}/queryTeamInfo`,


        //保存 农户与团队关联信息
        insertSupplyTeamInfo: `${host}/insertSupplyTeamInfo`,
        //删除 关联信息
        deleteSupplyTeamInfo: `${host}/deleteSupplyTeamInfo`,
        //查询 关联信息
        querySupplyTeamInfo: `${host}/querySupplyTeamInfo`,




        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    },
    carType: [
      '选择车型',
      '微型面包车',
      '面包车',
      '大面包车',
      '商务车',
      '平顶金杯',
      '高顶金杯',
      '依维柯/全顺',
      '4米2箱货',
      '5米2箱货',
      '6米8箱货'],

    category : [
      ['蔬菜', '水果'],
      [
        ['叶菜类', '根茎类', '瓜类与茄果类', '鲜豆类', '菌类'],
        ['浆果类', '柑橘类', '核果类', '仁果类', '瓜类', '其他']
      ],
      [
        [
          ['白菜', '菠菜', '油菜', '卷心菜', '苋菜', '韭菜', '蒿菜', '香菜', '芥菜', '芥兰', '茴香', '蒜苗', '莴笋', '空心菜', '豌豆尖', '生菜', '白花菜', '青花菜', '油麦菜', '甘蓝', '小葱'],
          ['萝卜', '马铃薯', '藕', '甘薯', '山药', '芋头', '茭白', '苤蓝', '慈姑', '洋葱', '生姜', '大蒜', '蒜苔', '韭菜花', '大葱', '韭黄'],
          ['冬瓜', '南瓜', '西葫芦', '丝瓜', '黄瓜', '茄子', '西红柿', '苦瓜', '辣椒', '玉米', '小瓜'],
          ['毛豆', '豌豆', '蚕豆', '扁豆', '豇工', '四季豆'],
          ['香菇', '平菇', '金针菇', '木耳', '银耳', '杏鲍菇', '口蘑']
        ],
        [
          ['草莓', '蓝莓', '黑莓', '桑葚', '覆盆子', '葡萄', '青提', '红提', '水晶葡萄', '马奶子'],
          ['蜜橘', '砂糖橘', '金橘', '蜜柑', '甜橙', '脐橙', '西柚', '柚子', '葡萄柚', '柠檬', '文旦', '莱姆'],
          ['油桃', '蟠桃', '水蜜桃', '黄桃', '李子', '樱桃', '杏', '梅子', '杨梅', '西梅', '乌梅', '大枣', '沙枣', '海枣', '蜜枣', '橄榄', '荔枝', '龙眼（桂圆）', '槟榔'],
          ['红富士苹果', '红星苹果', '国光苹果', '秦冠苹果', '黄元帅苹果', '砂糖梨', '黄金梨', '莱阳梨', '香梨', '雪梨', '香蕉梨', '蛇果', '海棠果', '沙果', '柿子', '山竹', '黑布林', '枇杷', '杨桃', '山楂', '圣女果', '无花果', '白果', '罗汉果', '火龙果', '猕猴桃'],
          ['西瓜', '美人瓜', '甜瓜', '香瓜', '黄河蜜', '哈密瓜', '木瓜', '乳瓜'],
          ['菠萝', '芒果', '栗子', '椰子', '奇异果', '芭乐', '榴莲', '香蕉', '甘蔗', '百合', '莲子', '石榴', '核桃', '拐枣']
        ]
      ]
    ]

};

module.exports = config;
