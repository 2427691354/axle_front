<template>
  <div class="MaintenanceReminder">
    <!-- 标题 -->
    <div class="title">
      <div class="title_1">维护提醒</div>
    </div>
    <!-- 主体 -->
    <div class="content_2">
      <!-- 导航栏 -->
      <div class="navs">
        <Tabs v-model="activeName">
          <TabPane label="里程提醒"
                   name="first">
            <div class="CumulativeReminder">
              <!-- 搜索里程维护阈值 -->
              <div class="search_2">
                <span>修护里程维护阈值</span>
                <div class="box">
                  <el-input v-model="yuzhi"></el-input>
                </div>
                <div class="bot_2">
                  <el-button type="danger"
                             round
                             @click="mRemind">搜索</el-button>
                </div>
              </div>
              <!-- 表格 -->
              <div class="table_2">
                <el-table :data="carData"
                          style="width: 100%"
                          height="18.6rem">
                  <el-table-column prop="number"
                                   label="车厢编号"></el-table-column>
                  <el-table-column prop="mileage"
                                   label="累计里程"></el-table-column>
                  <el-table-column prop="operation"
                                   label="操作">
                    <template slot-scope="scope">
                      <el-button type="text"
                                 @click="deleteRow(scope.$index, scope.row)">维护</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="botton_1">
                  <el-button type="danger"
                             @click="deleteAll">全部维护</el-button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane label="热轴提醒"
                   name="second">
            <div class="HotShaftReminder">
              <div class="table_3">
                <el-table :data="tableData"
                          style="width: 100%">
                  <el-table-column prop="time"
                                   label="过车时间"></el-table-column>
                  <el-table-column prop="detection"
                                   label="探测点"></el-table-column>
                  <el-table-column prop="car"
                                   label="序号（车号）"></el-table-column>
                  <el-table-column prop="type"
                                   label="车型"></el-table-column>
                  <el-table-column prop="num"
                                   label="辆数"></el-table-column>
                  <el-table-column prop="axle"
                                   label="轴数"></el-table-column>
                  <el-table-column prop="speed"
                                   label="车速"></el-table-column>
                  <el-table-column prop="tem"
                                   label="环温"></el-table-column>
                  <el-table-column prop="left"
                                   label="左平均温升"></el-table-column>
                  <el-table-column prop="right"
                                   label="右平均温升"></el-table-column>
                  <el-table-column prop="info"
                                   label="报警信息"></el-table-column>
                </el-table>
              </div>
            </div>
          </TabPane>
          <TabPane label="车次温升提醒"
                   name="third">
            <div class="TrainNumTempRiseReminder">
              <!-- 搜索框等 -->
              <div class="search_3">
                <span>温升阈值</span>
                <div class="tem">
                  <el-input v-model="inputs.temnum"
                            placeholder="请输入内容"></el-input>
                </div>
                <span>达到次数</span>
                <div class="nums">
                  <el-input v-model="inputs.numbers"
                            placeholder="请输入内容"></el-input>
                </div>
                <div class="bot_3">
                  <el-button type="danger"
                             round
                             @click="mRemind">搜索</el-button>
                </div>
              </div>
              <!-- 图表区 -->
              <div class="content_1">
                <!-- 词云 -->
                <div id="wordCloud"></div>
                <!-- 折线图 -->
                <div id="temChart"></div>
              </div>
            </div>
          </TabPane>
          <TabPane label="车辆温升提醒"
                   name="fourth">
            <div class="VehicleTempRiseReminder">
              <!-- 搜索框等 -->
              <div class="search_4">
                <span>温升阈值</span>
                <div class="tem">
                  <el-input v-model="inputs.temnum"
                            placeholder="请输入内容"></el-input>
                </div>
                <span>达到次数</span>
                <div class="nums">
                  <el-input v-model="inputs.numbers"
                            placeholder="请输入内容"></el-input>
                </div>
                <div class="bot_3">
                  <el-button type="danger"
                             round
                             @click="mRemind">搜索</el-button>
                </div>
                <div class="select_1">
                  <el-select v-model="carvalue"
                             placeholder="车型选择">
                    <el-option v-for="item in caroptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 主体 -->
              <div class="content_3">
                <!-- 表格 -->
                <div class="table_4">
                  <el-table :data="tableData2"
                            height="75%"
                            border
                            style="width: 100%"
                            @row-click="openlines">
                    <el-table-column prop="carnumber"
                                     label="车厢编号"></el-table-column>
                  </el-table>
                </div>
                <!-- 折现图 -->
                <div id="lineChart_1"></div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first',
      //阈值
      yuzhi: '',
      //里程提醒表法
      carData: [],
      //热轴提醒表格数据
      tableData: [
        {
          time: '2016-05-02',
          detection: '田柳下行',
          car: '07557',
          type: '货车',
          num: '56辆',
          axle: '230轴',
          speed: '46Km/h',
          tem: '40.3℃',
          left: '40.3℃',
          right: '40.3℃',
          info: '微热'
        }
      ],
      inputs: {
        //温升阈值
        temnum: '',
        //达到次数
        numbers: ''
      },
      //词云数据
      focusonInfo: [],
      //车辆温升下拉数据
      caroptions: [
        {
          value: '全部车型',
          label: '全部车型'
        },
        {
          value: 'C62G',
          label: 'C62G'
        },
        {
          value: 'C64',
          label: 'C64'
        },
        {
          value: 'C64K',
          label: 'C64K'
        },
        {
          value: 'G17BK',
          label: 'G17BK'
        },
        {
          value: 'C70',
          label: 'C70'
        },
        {
          value: 'C77',
          label: 'C77'
        },
        {
          value: 'C70E',
          label: 'C70E'
        },
        {
          value: 'G17K',
          label: 'G17K'
        },
        {
          value: 'GN70',
          label: 'GN70'
        },
        {
          value: 'GH70G',
          label: 'GH70G'
        },
        {
          value: 'K13k',
          label: 'K13k'
        },
        {
          value: 'N17k',
          label: 'N17k'
        },
        {
          value: 'N',
          label: 'N'
        },
        {
          value: 'CX64',
          label: 'CX64'
        },
        {
          value: 'G60K',
          label: 'G60K'
        }
      ],
      //车型选择
      carvalue: '',
      //车次温升提醒折线图数据
      //标签
      tlabels: [],
      //图例名称
      tlegend: [],
      tseries: [],

      //车辆温升表格数据
      tableInline: '',
      tableData2: [],
      //车辆温升折线图
      //标签
      clabels: [],
      cseries: [],
      clegend: [],

      wordvalue: ''
    }
  },
  watch: {
    carvalue: {
      //深度监听，可监听到对象、数组的变化
      handler () {
        if (this.carvalue == '' || this.carvalue == '全部车型') {
          this.mRemind()
        } else {
          this.selectcar()
        }
      },
      deep: true
    },
    wordvalue: {
      handler () {
        if (this.wordvalue == '') {
          this.mRemind()
        } else {
          this.focusOn()
        }
      },
      deep: true
    }
  },
  mounted () {
    //搜索按钮点击更新数据
    this.mRemind()
    // this.focusOn();
    // this.lineTem();
    // this.lineTem2();
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    mRemind () {
      // this.$alert("修改成功").then(() => {
      var self = this
      self.$http.get(this.baseUrl + '/systemvalue').then(function (response) {
        var res = response.data
        //如果值为空则引入后台数据，改变则按输入值来查询
        if (
          self.inputs.temnum == '' ||
          self.inputs.numbers == '' ||
          self.yuzhi == ''
        ) {
          self.inputs.temnum = res.wsYz
          self.inputs.numbers = res.lxcs
          self.yuzhi = res.lcYz
        }
        self.$alert('修改成功').then(() => {
          self.$http
            .get(self.baseUrl + '/updateLcYz', {
              params: {
                lcyz: self.yuzhi,
                lxcs: self.inputs.numbers,
                wsyz: self.inputs.temnum
              }
            })
            .then(function (response) {
              var res = response.data
              if (res == 1) {
                //表格数据
                self.$http
                  .get(self.baseUrl + '/mileageRemind', {
                    params: {
                      currentPage: 1,
                      size: 20
                    }
                  })
                  .then(function (response) {
                    var res = response.data
                    var dd = []
                    self.carData = dd
                    for (var i = 0; i < res.length; i++) {
                      dd.push({
                        number: res[i].clxxChdd,
                        mileage: res[i].mileage + 'km'
                      })
                    }
                    // console.log(res);
                  })

                //词云
                self.$http
                  .get(self.baseUrl + '/TempRiseReMind')
                  .then(function (response) {
                    var res = response.data
                    // console.log(res2);
                    self.focusonInfo = []
                    for (var i = 0; i < res.length; i++) {
                      self.focusonInfo.push({
                        name: res[i].CLXX_CHDD,
                        value: Math.random() * 3000
                      })
                    }
                    self.wordvalue = self.focusonInfo[0].name
                    // console.log(self.focusonInfo);
                    self.focusOn()
                    if (self.focusonInfo[0].name != '') {
                      //车次温升折线图
                      self.$http
                        .get(self.baseUrl + '/findWsBhByCh', {
                          params: {
                            //词云第一个值
                            clxx_ch: self.focusonInfo[0].name
                          }
                        })
                        .then(function (response) {
                          var res = response.data
                          self.tlabels = res[0].mclist.split(',')
                          self.tlegend = []
                          self.tseries = []
                          for (var i = 0; i < res.length; i++) {
                            self.tseries.push(
                              {
                                name: res[i].ZXXX_ZW + '轴',
                                type: 'line',
                                data: res[i].zzwlist.split(','),
                                lineStyle: {
                                  normal: {
                                    width: 2,
                                    color: '#54DAC2',
                                    shadowColor: 'rgba(245,128,128, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                  }
                                },
                                symbol: 'emptyCircle',
                                symbolSize: 8,
                                itemStyle: {
                                  normal: {
                                    color: '#54DAC2'
                                  }
                                },
                                smooth: false
                              },
                              {
                                name: res[i].ZXXX_ZW + '轴',
                                type: 'line',
                                symbol: 'emptyCircle',
                                symbolSize: 8,
                                data: res[i].yzwlist.split(','),
                                lineStyle: {
                                  normal: {
                                    width: 2,
                                    color: '#F9A589',
                                    shadowColor: 'rgba(249,165,137, 0.5)',
                                    shadowBlur: 8,
                                    shadowOffsetY: 5
                                  }
                                },
                                itemStyle: {
                                  normal: {
                                    color: '#F9A589'
                                  }
                                },
                                smooth: false
                              }
                            )
                            self.tlegend.push(res[i].ZXXX_ZW + '轴')
                          }
                          self.lineTem()
                        })
                    }
                  })

                //车辆温升表格
                self.$http
                  .get(self.baseUrl + '/TempRiseReMind2')
                  .then(function (response) {
                    var res = response.data
                    self.tableData2 = []
                    for (var i = 0; i < res.length; i++) {
                      self.tableData2.push({
                        carnumber: res[i].LCXX_CH.split(',')
                      })
                    }

                    console.log(self.tableData2[0].carnumber[0])
                    //车辆温升折线图
                    self.$http
                      .get(self.baseUrl + '/findWsBhByCh2', {
                        params: {
                          clxx_ch: self.tableData2[0].carnumber[0]
                        }
                      })
                      .then(function (response) {
                        var res = response.data
                        self.tableInline = self.tableData2[0].carnumber[0]
                        self.clabels = res[0].gcsjlist.split(',')
                        self.clegend = []
                        self.cseries = []
                        for (var i = 0; i < res.length; i++) {
                          self.cseries.push(
                            {
                              name: res[i].ZXXX_ZW + '轴',
                              type: 'line',
                              data: res[i].zzwlist.split(','),
                              lineStyle: {
                                normal: {
                                  width: 2,
                                  color: '#54DAC2',
                                  shadowColor: 'rgba(245,128,128, 0.5)',
                                  shadowBlur: 10,
                                  shadowOffsetY: 7
                                }
                              },
                              symbol: 'emptyCircle',
                              symbolSize: 8,
                              itemStyle: {
                                normal: {
                                  color: '#54DAC2'
                                }
                              },
                              smooth: false
                            },
                            {
                              name: res[i].ZXXX_ZW + '轴',
                              type: 'line',
                              symbol: 'emptyCircle',
                              symbolSize: 8,
                              data: res[i].yzwlist.split(','),
                              lineStyle: {
                                normal: {
                                  width: 2,
                                  color: '#F9A589',
                                  shadowColor: 'rgba(249,165,137, 0.5)',
                                  shadowBlur: 8,
                                  shadowOffsetY: 5
                                }
                              },
                              itemStyle: {
                                normal: {
                                  color: '#F9A589'
                                }
                              },
                              smooth: false
                            }
                          )
                          self.clegend.push(res[i].ZXXX_ZW + '轴')
                        }
                        self.lineTem2()
                      })
                  })
              }
            })
        })
      })
      // })
    },
    //车辆温升下拉框点击更新表格数据
    selectcar () {
      //车辆温升表格选择车型
      var self = this
      // console.log(self.carvalue)
      self.$http
        .get(self.baseUrl + '/TempRiseReMind2', {
          params: {
            cx: self.carvalue
          }
        })
        .then(function (response) {
          var res = response.data
          self.tableData2 = []
          for (var i = 0; i < res.length; i++) {
            self.tableData2.push({
              carnumber: res[i].LCXX_CH.split(',')
            })
          }
          // console.log(self.carData);
        })
    },
    //点击维护
    deleteRow (index) {
      //删除
      this.carData.splice(index, 1)
      // console.log(index);
    },
    //点击全部维护
    deleteAll () {
      this.carData = []
    },
    //词云
    focusOn () {
      var myChart = echarts.init(document.getElementById('wordCloud'))
      var option = {
        title: {
          text: '重点观察对象',
          x: 'center',
          top: '20',
          textStyle: {
            // color: "#FFF",
            fontSize: '80%'
          }
        },
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            //maskImage: maskImage,
            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,
            sizeRange: [16, 60],
            rotation: 45,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textPadding: 0,
            // rotationStep: 45,
            // gridSize: 8,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                  // Random color
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.focusonInfo
          }
        ]
      }
      myChart.setOption(option)
      // console.log(this.focusonInfo);
      var self = this
      myChart.on('click', function (param) {
        if (param.name == undefined) {
          self.wordvalue = this.focusonInfo[0].name
        } else {
          self.wordvalue = param.name
        }
        console.log(self.wordvalue)
        self.$http
          .get(self.baseUrl + '/findWsBhByCh', {
            params: {
              clxx_ch: param.name
            }
          })
          .then(function (response) {
            var res = response.data
            self.tlabels = res[0].mclist.split(',')
            self.tlegend = []
            self.tseries = []
            for (var i = 0; i < res.length; i++) {
              self.tseries.push(
                {
                  name: res[i].ZXXX_ZW + '轴',
                  type: 'line',
                  data: res[i].zzwlist.split(','),
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#54DAC2',
                      shadowColor: 'rgba(245,128,128, 0.5)',
                      shadowBlur: 10,
                      shadowOffsetY: 7
                    }
                  },
                  symbol: 'emptyCircle',
                  symbolSize: 8,
                  itemStyle: {
                    normal: {
                      color: '#54DAC2'
                    }
                  },
                  smooth: false
                },
                {
                  name: res[i].ZXXX_ZW + '轴',
                  type: 'line',
                  symbol: 'emptyCircle',
                  symbolSize: 8,
                  data: res[i].yzwlist.split(','),
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#F9A589',
                      shadowColor: 'rgba(249,165,137, 0.5)',
                      shadowBlur: 8,
                      shadowOffsetY: 5
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#F9A589'
                    }
                  },
                  smooth: false
                }
              )
              self.tlegend.push(res[i].ZXXX_ZW + '轴')
            }
            self.lineTem()
          })
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    //车次温升折线图
    lineTem () {
      var myChart = echarts.init(document.getElementById('temChart'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10%',
          right: '5%',
          selectedMode: 'single',
          data: this.tlegend
        },
        grid: {
          top: '20%',
          left: '8%',
          right: '5%',
          bottom: '30%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.tlabels,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#DDD'
            }
          },
          axisLabel: {
            interval: 0 //全部显示
          }
        },
        yAxis: {
          type: 'value',
          name: '温升|绿-右温升(' + this.wordvalue + ')',
          splitLine: {
            lineStyle: {
              color: '#DDD'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          }
        },
        series: this.tseries
      }
      myChart.setOption(option)
      // console.log(this.wordvalue);
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    //车辆温升折线图
    lineTem2 () {
      var myChart = echarts.init(document.getElementById('lineChart_1'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10%',
          right: '5%',
          selectedMode: 'single',
          data: this.clegend
        },
        grid: {
          top: '20%',
          left: '8%',
          right: '5%',
          bottom: '30%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.clabels,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#DDD'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '温升|绿-右温升(' + this.tableInline + ')',
          splitLine: {
            lineStyle: {
              color: '#DDD'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          }
        },
        series: this.cseries
      }
      myChart.setOption(option)
      // console.log(this.clegend[0]);
      // console.log(this.clegend);
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    //点击表格触发折线图数据更新
    openlines (row) {
      this.tableInline = row.carnumber[0]
      //  console.log(this.tableInline);
      var self = this
      self.$http
        .get(self.baseUrl + '/findWsBhByCh2', {
          params: {
            clxx_ch: row.carnumber[0]
          }
        })
        .then(function (response) {
          var res = response.data
          // console.log(res);
          self.clabels = res[0].gcsjlist.split(',')
          self.clegend = []
          self.cseries = []
          for (var i = 0; i < res.length; i++) {
            self.cseries.push(
              {
                name: res[i].ZXXX_ZW + '轴',
                type: 'line',
                data: res[i].zzwlist.split(','),
                lineStyle: {
                  normal: {
                    width: 2,
                    color: '#54DAC2',
                    shadowColor: 'rgba(245,128,128, 0.5)',
                    shadowBlur: 10,
                    shadowOffsetY: 7
                  }
                },
                symbol: 'emptyCircle',
                symbolSize: 8,
                itemStyle: {
                  normal: {
                    color: '#54DAC2'
                  }
                },
                smooth: false
              },
              {
                name: res[i].ZXXX_ZW + '轴',
                type: 'line',
                symbol: 'emptyCircle',
                symbolSize: 8,
                data: res[i].yzwlist.split(','),
                lineStyle: {
                  normal: {
                    width: 2,
                    color: '#F9A589',
                    shadowColor: 'rgba(249,165,137, 0.5)',
                    shadowBlur: 8,
                    shadowOffsetY: 5
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F9A589'
                  }
                },
                smooth: false
              }
            )
            self.clegend.push(res[i].ZXXX_ZW + '轴')
          }
          console.log(self.cseries)
          self.lineTem2()
        })
      row.carnumber[0] = ''
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 1.5rem;
  background-color: #ffffff;
  margin-top: -0.3%;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .title_1 {
    font-size: 0.6rem;
    font-weight: 600;
    text-align: left;
    padding-top: 0.7%;
    padding-left: 2%;
  }
}
.content_2 {
  width: 96%;
  height: 28.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(2%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .navs {
    width: 96%;
    height: 27.3rem;
    transform: translate(2%, 0);
  }
}
.CumulativeReminder {
  height: 25rem;
  .search_2 {
    width: 96%;
    transform: translate(2%, 0);
    height: 2rem;
    box-shadow: 1px 1px 6px 1px rgba(15, 6, 14, 0.15);
    span {
      width: 12%;
      height: inherit;
      font-size: 0.5rem;
      padding-top: 1.5%;
      padding-left: 2%;
      float: left;
    }
    .box {
      width: 20%;
      padding-top: 1%;
      margin-left: -2%;
      float: left;
    }
    .bot_2 {
      width: 6%;
      padding-top: 1.2%;
      float: left;
    }
  }
  .table_2 {
    width: 96%;
    height: 21rem;
    transform: translate(2%, 0);
    margin-top: 0.8%;
    .botton_1 {
      width: 10%;
      // height: 2rem;
      position: absolute;
      margin-top: 3%;
    }
  }
}
.HotShaftReminder {
  height: 25rem;
  .table_3 {
    width: 96%;
    transform: translate(2%, 0);
  }
}
.TrainNumTempRiseReminder {
  width: 96%;
  height: 25rem;
  transform: translate(2%, 0);
  .search_3 {
    height: 2rem;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    //   margin-top: -1%;
    span {
      width: 10%;
      height: inherit;
      font-size: 0.5rem;
      padding-top: 1.5%;
      padding-left: 1%;
      float: left;
    }

    .tem {
      width: 10%;
      padding-top: 1%;
      margin-left: -1%;
      float: left;
    }
    .nums {
      width: 10%;
      padding-top: 1%;
      margin-left: -1%;
      float: left;
    }

    .bot_3 {
      width: 6%;
      padding-top: 1.2%;
      margin-left: 2%;
      float: left;
    }
  }
  .content_1 {
    height: 22rem;
    margin-top: 0.8%;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    #wordCloud {
      width: 40%;
      height: inherit;
      // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      position: absolute;
    }
    #temChart {
      width: 60%;
      height: inherit;
      // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      position: absolute;
      margin-left: 40%;
    }
  }
}
.VehicleTempRiseReminder {
  width: 96%;
  height: 25rem;
  transform: translate(2%, 0);
  // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  background-color: #ffffff;
  .search_4 {
    height: 2rem;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    span {
      width: 10%;
      height: inherit;
      font-size: 0.5rem;
      padding-top: 1.5%;
      padding-left: 1%;
      float: left;
    }

    .tem {
      width: 10%;
      padding-top: 1%;
      margin-left: -1%;
      float: left;
    }
    .nums {
      width: 10%;
      padding-top: 1%;
      margin-left: -1%;
      float: left;
    }

    .bot_3 {
      width: 6%;
      padding-top: 1.2%;
      margin-left: 2%;
      float: left;
    }
    .select_1 {
      width: 20%;
      padding-top: 1%;
      margin-left: 2%;
      float: left;
    }
  }
  .content_3 {
    height: 22rem;
    margin-top: 0.8%;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    .table_4 {
      width: 20%;
      height: inherit;
      position: absolute;
      margin-left: 1%;
      padding-top: 3%;
    }
    #lineChart_1 {
      width: 80%;
      height: inherit;
      margin-left: 20%;
      position: absolute;
    }
  }
}
</style>
