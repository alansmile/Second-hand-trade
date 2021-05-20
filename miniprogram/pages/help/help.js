var app = getApp();
var db = wx.cloud.database();

Page({
      /**
       * 页面的初始数据
       */
      data: {
            list: [{
                        title: '该程序收费吗？',
                        id: 0,
                        des: ['本程序是完全的公益项目，永久承诺不收取任何中介费，您可以随心所欲的发布自己的闲置物品和购买。如过您觉得本小程序不错，欢迎各位支持打赏我们，请我们喝阔落。'],
                        check: true,
                  }, {
                        title: '该程序是做什么的？',
                        id: 1,
                        des: ['本程序主要是方便重庆大学城市科技学院的同学发布自己不要了的二手书籍或者物品。',
                              '如果您是其它学校的同学，可以访问【关于程序】页面，根据说明给自己学校也部署一个'
                        ],
                        check: false,
                  },
                  {
                        title: '为什么要留下联系方式？',
                        id: 2,
                        des: ['本程序交易完全由交易双方沟通。', '除非程序出现问题导致交易故障，平台不参与任何交易'],
                        check: false,
                  }, {
                        title: '小程序发现异常（bug）怎么办？',
                        id: 3,
                        des: ['点击客服加群或关注公众号反馈，我们会有专人为您服务。您还可以向我们提出意见或者建议，我们会争取将小程序做得更好！！！希望我们能够一起打造一个完美的二手交易平台。'],
                        check: false,
                  },
            ]
      },
      onReady() {},

      show(e) {
            var that = this;
            let ite = e.currentTarget.dataset.show;
            let list = that.data.list;
            if (!ite.check) {
                  list[ite.id].check = true;
            } else {
                  list[ite.id].check = false;
            }
            that.setData({
                  list: list
            })
      },
      //跳转页面
      go(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      onLoad() {

      },

})