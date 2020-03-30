<template>
  <div class="StatisticalReports">
    <div class="title">
      <div class="title_1">报表统计</div>
    </div>
    <div class="searchst">
      <div class="stationst">
        <el-select v-model="value" filterable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 日报表 -->
      <div class="timest" v-if="this.value=='日报表'">
        <div class="date">
          <el-date-picker v-model="inputs.start" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="inputs.end" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <!-- 月报表 -->
      <div class="timest" v-else>
        <div class="date">
          <el-date-picker v-model="inputs.start" type="month" value-format="yyyy-MM"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="inputs.end" type="month" value-format="yyyy-MM"></el-date-picker>
        </div>
      </div>
      <div class="botst">
        <el-button type="danger" round @click="dataTotal">搜索</el-button>
      </div>
    </div>
    <div class="contentst">
      <div class="show1">
        <div class="train">
          <div class="title_2">
            <p>列车数量</p>
          </div>
          <div id="trainnum"></div>
        </div>
        <div class="car">
          <div class="title_2">
            <p>车辆数量</p>
          </div>
          <div id="carnum"></div>
        </div>
      </div>
      <div class="show2">
        <div class="axle">
          <div class="title_2">
            <p>车轴数</p>
          </div>
          <div id="axlenum"></div>
        </div>
        <div class="thermal">
          <div class="title_2">
            <p>热轴</p>
          </div>
          <div id="thermalnum"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "日报表"
        },
        {
          value: "选项2",
          label: "月报表"
        }
      ],
      inputs: {
        start: "2018-2-1",
        end: "2019-2-28"
      },
      value: "日报表",
      //每个图表的xy轴
      zlabel: [],
      //上行
      top: {
        train: [],
        car: [],
        axle: []
      },

      //下行
      bottom: {
        train: [],
        car: [],
        axle: []
      },

      //热轴
      tlabel:[],
      thermal: {
        jre: [],
        qre: [],
        wre: []
      }
    };
  },
  created() {},
  mounted() {
    this.trainNum();
    this.carNum();
    this.axleNum();
    this.thermalNum();
    this.dataTotal();
  },
  methods: {
    trainNum() {
      var myChart = echarts.init(document.getElementById("trainnum"));
      var option = {
        xAxis: [
          {
            data: this.zlabel,
            axisLabel: {
              interval: 0,
              show: false
            }
          },
          {
            data: this.zlabel,
            axisLabel: {
              interval: 0,
              show: true
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            type: "value",
            show: true
          },
          {
            gridIndex: 1,
            show: false
          }
        ],
        grid: [
          {
            width: "80%",
            left: "14%",
            top: "20%",
            bottom: "25%"
          },
          {
            left: "13.3%",
            width: "80%",
            bottom: "25%"
          }
        ],
        tooltip: {
          show: true,
          //带线
          trigger: "axis"
        },
        legend: {
          data: ["上行", "下行"],
          top: "2%",
          left: "2%",
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10
        },
        series: [
          {
            type: "bar",
            name: "上行",
            barWidth: "20%",
            data: this.top.train,
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#37FFF9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 222, 215, 0.2)" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            type: "bar",
            name: "下行",
            barWidth: "20%",
            data: this.bottom.train,
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF5624" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 86, 36, 0.2)" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    carNum() {
      var myChart = echarts.init(document.getElementById("carnum"));
      var option = {
        legend: {
          data: ["上行", "下行"],
          top: "5%",
          right: 0,
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          containLabel: true,
          left: "10%",
          right: 0,
          bottom: "15%",
          top: "5%"
        },
        tooltip: {
          show: true,
          //不带横线
          trigger: "item"
        },
        xAxis: {
          axisLabel: {
            show: false,
            formatter: function(v) {
              return v;
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            data: this.zlabel,
            axisLabel: {
              fontSize: "45%",
              color: "#000"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            show: false,
            data: this.zlabel,
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            name: "上行",
            stack: "2",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(v) {
                  return v.value;
                },
                textStyle: {
                  color: "#fff",
                  fontSize: "40%"
                }
              }
            },
            legendHoverLink: false,
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: [20, 0, 0, 20],
                color: "#F76F34"
              }
            },
            data: this.top.car
          },
          {
            type: "bar",
            name: "下行",
            stack: "2",
            legendHoverLink: false,
            barWidth: "50%",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(v) {
                  return v.value;
                },
                textStyle: {
                  color: "#fff",
                  fontSize: "40%"
                }
              }
            },
            itemStyle: {
              barBorderRadius: 10,
              normal: {
                barBorderRadius: [0, 20, 20, 0],
                color: "#3393E2"
              }
            },
            data: this.bottom.car
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    axleNum() {
      var myChart = echarts.init(document.getElementById("axlenum"));
      var option = {
        grid: {
          left: "6%",
          right: "10%",
          top: "8%",
          bottom: "15%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "axis"
        },
        legend: {
          show: false,
          x: "center",
          y: "35",
          icon: "stack",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#000"
          },
          data: ["已采纳", "已发布"]
        },
        xAxis: [
          {
            type: "category",
            name: "探测站",
            boundaryGap: true,
            axisLabel: {
              color: "#000"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#000"
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#CFCFCF"
              }
            },
            data: this.zlabel
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#000"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#CFCFCF"
              }
            }
          }
        ],
        series: [
          {
            // name: '已采纳',
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#C23531",
                lineStyle: {
                  color: "#C23531",
                  width: 1
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            data: this.top.axle
          },
          {
            // name: '已发布',
            type: "line",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#324857",
                lineStyle: {
                  color: "#324857",
                  width: 1
                }
              }
            },
            data: this.bottom.axle
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    thermalNum() {
      var myChart = echarts.init(document.getElementById("thermalnum"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["激热轴", "强热轴", "微热轴"],
          top: "3%",
          right: "1%"
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        dataZoom: [
          {
            type: "inside", //详细配置可见echarts官网
            yAxisIndex: [0]
          }
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#9D9D9D"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#CFCFCF"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#9D9D9D"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#CFCFCF"
              }
            },
            axisTick: {
              show: false
            },
            data: this.tlabel
          }
        ],
        series: [
          {
            name: "激热轴",
            type: "bar",
            barGap: "50%",
            stack: "total",
            barWidth: "50%",
            data: this.thermal.jre
          },
          {
            name: "强热轴",
            type: "bar",
            //堆叠与重叠
            barGap: "50%",
            stack: "total",
            barWidth: "50%",
            data: this.thermal.qre
          },
          {
            name: "微热轴",
            type: "bar",
            barGap: "50%",
            stack: "total",
            barWidth: "50%",
            data: this.thermal.wre
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    dataTotal() {
      var self = this;
      self.$http
        .get(this.baseUrl + "/dayRpt", {
          params: {
            start: self.inputs.start,
            end: self.inputs.end
          }
        })
        .then(function(response) {
          var res = response.data;
          self.zlabel = res.tczlist;
          //列车数量
          self.top.train = res.sxsj.COUNT_TRAIN;
          self.bottom.train = res.xxsj.COUNT_TRAIN;

          //车辆数量
          self.top.car = res.sxsj.COUNT_CAR;
          self.bottom.car = res.xxsj.COUNT_CAR;

          //车轴数
          self.top.axle = res.sxsj.COUNT_AXLE;
          self.bottom.axle = res.xxsj.COUNT_AXLE;

          //热轴数
          var a = [];
          for(var i=0;i<res.tczlist.length;i++){
            a.push(res.tczlist[i]+"上行")
          }
          for( i=0;i<res.tczlist.length;i++){
            a.push(res.tczlist[i]+"下行")
          }
          //合并数组concat
          self.tlabel = a;
          // console.log(self.tlabel)
          self.thermal.jre = res.sxsj.COUNT_JRE.concat(res.xxsj.COUNT_JRE);
          self.thermal.qre = res.sxsj.COUNT_QRE.concat(res.xxsj.COUNT_QRE);
          self.thermal.wre = res.sxsj.COUNT_WRE.concat(res.xxsj.COUNT_WRE);

          console.log(self.thermal.jre);
          console.log(self.thermal.qre);
          console.log(self.thermal.wre);
          self.trainNum();
          self.carNum();
          self.axleNum();
          self.thermalNum();
        });
    }
  }
};
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
.searchst {
  width: 98%;
  height: 2.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .stationst {
    width: 15%;
    height: inherit;
    float: left;
    line-height: 2.3rem;
  }
  .timest {
    width: 50%;
    float: left;
    line-height: 2.3rem;
    .date {
      width: 22%;
      height: 1rem;
      float: left;
    }
    .text {
      width: 4%;
      float: left;
      margin-top: 0.1rem;
      height: 2rem;
      font-size: 0.5rem;
      color: #036fb8;
    }
  }
  .botst {
    width: 10%;
    float: left;
    line-height: 2.3rem;
    margin-left: -13rem;
  }
}
.contentst {
  width: 98%;
  height: 25.5rem;
  margin-top: 1%;
  transform: translate(1%, 0);
  // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .title_2 {
    width: 95%;
    height: 2rem;
    transform: translate(2.5%, 0);
    border-bottom: 3px solid #fafafa;
    p {
      font-size: 0.5rem;
      text-align: left;
      padding-left: 1%;
      padding-top: 4%;
    }
  }
  .show1 {
    height: 12.4rem;
    // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    .train {
      width: 49.5%;
      height: inherit;
      background-color: #ffffff;
      position: absolute;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      #trainnum {
        width: 95%;
        height: 11rem;
      }
    }
    .car {
      width: 49.5%;
      height: inherit;
      background-color: #ffffff;
      position: absolute;
      margin-left: 50.5%;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      #carnum {
        width: 95%;
        height: 11rem;
      }
    }
  }
  .show2 {
    height: 12.4rem;
    margin-top: 1%;
    // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    .axle {
      width: 49.5%;
      height: inherit;
      background-color: #ffffff;
      position: absolute;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      #axlenum {
        width: 95%;
        height: 11rem;
      }
    }
    .thermal {
      width: 49.5%;
      height: inherit;
      background-color: #ffffff;
      position: absolute;
      margin-left: 50.5%;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
      #thermalnum {
        width: 95%;
        height: 11rem;
      }
    }
  }
}
</style>
