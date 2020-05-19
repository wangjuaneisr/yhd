// pages/Lottery.js
import UT from '../../utils/util'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    ifIpx:app.globalData.isIphoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let me = this;

    wx.onAccelerometerChange((res)=>{

      if (!me.isShow) {
        return
      }

      if(res.x > 1 || res.y > 1 || res.z >1){

        me.setData({
          isShow:false
        });

        wx.showToast({
          title: '摇成功啦～',
          icon: 'success',
          duration: 1000,
          success:()=>{
            //摇奖成功一次后，停止重力感应
            wx.stopAccelerometer();

            setTimeout(()=>{

              //todo 请求摇奖次数查询接口， 返回次数超过0次，isShow=true，否则为false

              if(me.data.isShow){
                //todo 刷新页面，检查是否还有摇奖机会
                wx.startAccelerometer();
              }
            },2000)//2秒不能重复摇奖
          }
        })




      }

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

    let me  = this;

    // UT.throttle(function () {
    //
    // })



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
