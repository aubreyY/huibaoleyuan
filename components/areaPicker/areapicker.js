// components/site/site.js

import {
  common
} from '../../base/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: Object,
      value: {}
    },
    multiIndex: {
      type: Object,
      value: [0, 0, 0, 0],
    },
    multiArray: {
      type: Object,
      value: [
        [],
        [],
        [],
        []
      ],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
  ready() {
    common.area_list().then(res => {
      this.setData({
        'multiArray[0]': res
      });

      if (this.data.address) {
        // this.initPicker('11','1101','110106','110106009'); 
        this.initPicker(this.data.address.province, this.data.address.city, this.data.address.county, this.data.address.town);
      } else {
        this.seleamin(0, 0);
      }

    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 地址有值
    initPicker(id1, id2, id3, id4) {
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      var ind1, ind2, ind3, ind4;
      data.multiArray[0].forEach((item, i) => {
        if (item.areaid == id1) {
          ind1 = i;
        }
      });

      common.area_list({
          provinceid: id1
        }).then(res => {
          res.forEach((item, i) => {
            if (item.areaid == id2) {
              ind2 = i;
            }
          })
          this.setData({
            'multiArray[1]': res,
            'multiIndex[0]': ind1
          })
        }).then(() => {
          //城市
          return common.area_list({
            provinceid: id1,
            cityid: id2,
          });
        }).then(res => {
          res.forEach((item, i) => {
            if (item.areaid == id3) {
              ind3 = i;
            }
          })
          this.setData({
            'multiArray[2]': res,
            'multiIndex[1]': ind2,
            'multiIndex[2]': ind3
          })
        }).then(() => {
          //乡镇
          return common.area_list({
            provinceid: id1,
            cityid: id2,
            countyid: id3
          });
        })
        .then(res => {
          res.forEach((item, i) => {
            if (item.areaid == id4) {
              ind4 = i;
            }
          })
          this.setData({
            'multiArray[3]': res,
            // 'multiIndex[2]': ind3,
            'multiIndex[3]': ind4
          })
        })
    },
    //点击完成时事件
    bindMultiPickerChange: function (e) {},
    //滑动时事件
    bindMultiPickerColumnChange: function (e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var lineIndex = e.detail.column; //列索引
      var lineVal = e.detail.value; //该列的位置值
      this.seleamin(lineIndex, lineVal)
    },
    seleamin(lineIndex, lineVal) {
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[lineIndex] = lineVal;
      if (lineIndex == 0) {
        common.area_list({
          provinceid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid
        }).then(res => {
          this.setData({
            'multiArray[1]': res,
            'multiIndex[0]': data.multiIndex[lineIndex]
          })
        }).then(() => {
          return common.area_list({
            provinceid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid,
            cityid: data.multiArray[lineIndex + 1][data.multiIndex[lineIndex + 1]].areaid,
          });
        }).then(res => {
          this.setData({
            'multiArray[2]': res,
            'multiIndex[1]': 0,
            'multiIndex[2]': 0,
          })
        }).then(() => {
          return common.area_list({
            provinceid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid,
            cityid: data.multiArray[lineIndex + 1][data.multiIndex[lineIndex + 1]].areaid,
            countyid: data.multiArray[lineIndex + 2][data.multiIndex[lineIndex + 2]].areaid,
          });
        }).then(res => {
          this.setData({
            'multiArray[3]': res,
            'multiIndex[3]': 0
          })
        }).then(() => {
          this.getVal();
        })


      }
      if (lineIndex == 1) {
        common.area_list({
          provinceid: data.multiArray[0][data.multiIndex[0]].areaid,
          cityid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid,
        }).then(res => {
          this.setData({
            'multiArray[2]': res,
            'multiIndex[1]': data.multiIndex[lineIndex],
            'multiIndex[2]': 0,
          })
        }).then(() => {
          return common.area_list({
            provinceid: data.multiArray[0][data.multiIndex[0]].areaid,
            cityid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid,
            countyid: data.multiArray[lineIndex + 1][data.multiIndex[lineIndex + 1]].areaid,
          })
        }).then(res => {
          this.setData({
            'multiArray[3]': res,
            'multiIndex[3]': 0
          })
        }).then(() => {
          this.getVal();
        })
      }
      if (lineIndex == 2) {
        common.area_list({
          provinceid: data.multiArray[0][data.multiIndex[0]].areaid,
          cityid: data.multiArray[1][data.multiIndex[1]].areaid,
          countyid: data.multiArray[lineIndex][data.multiIndex[lineIndex]].areaid,
        }).then(res => {
          this.setData({
            'multiArray[3]': res,
            'multiIndex[2]': data.multiIndex[lineIndex],
            'multiIndex[3]': 0
          })
        }).then(() => {
          this.getVal();
        })

      }

      if (lineIndex == 3) {
        this.setData({
          'multiIndex[3]': data.multiIndex[lineIndex]
        })
        this.getVal();
      }
    },

    getVal() {
      var province = this.data.multiArray[0][this.data.multiIndex[0]];
      var city = this.data.multiArray[1][this.data.multiIndex[1]];
      var county = this.data.multiArray[2][this.data.multiIndex[2]];
      var town = this.data.multiArray[3][this.data.multiIndex[3]];
      var obj = {
        province,
        city,
        county,
        town
      }

      this.triggerEvent("callback", obj); //回调

    }

  },


})