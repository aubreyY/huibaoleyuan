var app = getApp();


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Boolean,
      value: false
    },
    xscroll: {
      type: Boolean,
      value: false
    },
    rowNum: {
      type: Number,
      value: 3
    },
    xIndex: {
      type: Number,
      value: 0,
    },
    menuConfig: {
      type: Object,
      value: [{
          name: "全部",
          state: true
        },
        {
          name: "租供中",
          state: false
        }, {
          name: "待发货",
          state: false
        }, {
          name: "已发货",
          state: false
        }
      ]
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    dist: 0, //距离
    sumDist: 0, //总距离
    gdw: 0,
    w: 200, //每列宽
    left: 0, //定位left 
    index: 0, //索引
    scrollCm: 0, //xscroll开启 滚动的距离
    startX: 0,
    endX: 0,
    anmin: "all 0.2s ease-in-out" //是否动画
  },
  ready() {
    var ms = 750 / this.data.rowNum;
    var left = 750 * 0.05 * 2;

    this.setData({
      index: this.data.xIndex,
      dist: ms,
      w: ms - left,
      gdw: ms - left,
      left: left / 2,
      sumDist: this.data.xIndex * ms
    });
    this.cutMenu(this.data.index);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cutMenu(index) {
      var arr = this.data.menuConfig;
      arr.forEach(element => {
        element.state = false;
      });
      arr[index].state = true;
      this.setData({
        menuConfig: arr
      });
    },
    satrt(e) {
      this.setData({
        endX: 0,
        anmin: "none",
        startX: e.changedTouches[0].pageX
      });
    },
    move(e) {
      let m = e.changedTouches[0].pageX - this.data.startX;
      var num = this.data.index;
      this.setData({
        sumDist: num * this.data.dist + -m
      });
    },
    end(e) {
      var num = this.data.index;
      this.setData({
        endX: e.changedTouches[0].pageX,
        anmin: "all 0.2s ease-in-out",
      });
      let lop = this.data.endX - this.data.startX;
      if (lop > 100) {
        //上一个
        if (num > 0) {
          num--;
          this.run(num, true);
          return;
        } else {
          num = 0;
        }

      }
      if (lop < -100) {
        // next
        if (num < this.data.menuConfig.length - 1) {
          num++;
          this.run(num, true);
          return;
        } else {
          num = this.data.menuConfig.length - 1;

        }
      }
      this.run(num, false);
    },
    run(num, type) {
      var index = num;
      this.setData({
        index: index,
        sumDist: index * this.data.dist
      });

      if (type) {
        this.cutMenu(this.data.index)
        this.triggerEvent("callback", {
          index: index
        }); //回调
      }

      if (this.data.xscroll) {
        // if (this.data.index >= 3) {
        //   this.setData({
        //     scrollCm: (this.data.index - 2) * this.data.dist
        //   })
        // } else {
        //   this.setData({
        //     scrollCm: 0
        //   })
        // }

        if (this.data.index >= 3) {
          if (this.data.index >= this.data.rowNum - 4) {
            this.setData({
              scrollCm: (this.data.rowNum - 4) * this.data.dist
            })
          } else {
            this.setData({
              scrollCm: (this.data.index - 2) * this.data.dist
            })
          }

        } else {
          this.setData({
            scrollCm: 0
          })
        }


      }

      



    },
    selects(e) {
      var index = e.currentTarget.dataset.index;
      this.run(index, true);
    }

  }
})