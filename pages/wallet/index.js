const app = getApp()

Page({
  onReady: function () {
    this.my_modal = this.selectComponent(".my_modal")
  },
  showModal: function () {
    this.my_modal.showModal()
  },
  prompt_hide: function () {
    this.my_modal.prompt_hide()
  }
})