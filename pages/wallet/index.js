const app = getApp()

Page({
  onReady: function () {
    //获得my_modal组件
    this.my_modal = this.selectComponent(".my_modal")
  },
  showModal: function () {
    this.my_modal.showModal()
  }
})