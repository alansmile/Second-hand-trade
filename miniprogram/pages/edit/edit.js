const db = wx.cloud.database();
const app = getApp();
const config = require("../../config.js");
Page({

      /**
       * 页面的初始数据
       */
      data: {
            ids: -1,
            wxnum: '',
            qqnum: '',
            email: '',
            checked:false,
            campus: JSON.parse(config.data).campus,
      },
      onChange(event) {
            if(event.detail==true){
                  wx.requestSubscribeMessage({
                        tmplIds: ['6DGzsKqipoPxClnbkvwnxY9GqdXoLordLRdWTjJN1F0','XXmEjf37meLWQaEsOX6qkkufcVH-YKAL3cHyY9Lru0Q'], //这里填入我们生成的模板id
                        success(res) {          
                              console.log('授权成功', res)
                        },
                        fail(res) {
                              console.log('授权失败', res)
                        }
                  })
            }
            this.setData({
              checked: event.detail,
            });
          },
      choose(e) {
            let that = this;
            that.setData({
                  ids: e.detail.value
            })
            //下面这种办法无法修改页面数据
            /* this.data.ids = e.detail.value;*/
      },
      onLoad() {
            this.getdetail();
      },
      getdetail() {
            let that = this;
            db.collection('user').where({
                  _openid: app.openid
            }).get({
                  success: function(res) {
                        let info = res.data[0];
                        that.setData({
                              phone: info.phone,
                              qqnum: info.qqnum,
                              wxnum: info.wxnum,
                              email: info.email,
                              ids: info.campus.id,
                              _id: info._id
                        })
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                        let e = setTimeout(
                              wx.navigateBack({}), 2000
                        )
                  }
            })
      },
      
      wxInput(e) {
            this.data.wxnum = e.detail.value;
      },
      phoneInput(e) {
            this.data.phone = e.detail.value;
      },
      emInput(e) {
            this.data.email = e.detail.value;
      },
      GetUserInfo () {
            let that = this;
            //校检校区
            let ids = that.data.ids;
            let campus = that.data.campus;
            if (ids == -1) {
                  wx.showToast({
                        title: '请先获取您的校区',
                        icon: 'none',
                        duration: 2000
                  });
                  return false;
            }
            //校检邮箱
            let email = that.data.email;
            if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email))) {
                  wx.showToast({
                        title: '请输入正确的邮箱',
                        icon: 'none',
                        duration: 2000
                  });
                  return false;
            }
            //校检微信号
            let wxnum = that.data.wxnum;
            if (wxnum === '') {
                  wx.showToast({
                        title: '请输入正确微信号',
                        icon: 'none',
                        duration: 2000
                  }); 
                  return false;
            }
            //校检电话号码
            let phone = that.data.phone;
            if (phone === '') {
                  wx.showToast({
                        title: '请输入电话号码',
                        icon: 'none',
                        duration: 2000
                  });
                  return false;
            }
            wx.showLoading({
                  title: '正在提交',
            })
            db.collection('user').doc(that.data._id).update({
                  data: {
                        phone: that.data.phone,
                        campus: that.data.campus[that.data.ids],
                        qqnum: that.data.qqnum,
                        email: that.data.email,
                        wxnum: that.data.wxnum,
                        updatedat: new Date().getTime(),
                  },
                  success: function(res) {
                        console.log(res)
                        db.collection('user').doc(that.data._id).get({
                              success: function(res) {
                                    app.userinfo = res.data;
                                    app.openid = res.data._openid;
                                    wx.hideLoading();
                                    wx.showToast({
                                          title: '修改成功',
                                          icon: 'success'
                                    })
                              },
                        })
                  },
                  fail() {
                        wx.hideLoading();
                        wx.showToast({
                              title: '注册失败，请重新提交',
                              icon: 'none',
                        })
                  }
            })
      },
})