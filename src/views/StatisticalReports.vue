<template>
  <div class="StatisticalReports">
    <div class="title">
      <div class="title_1">报表统计</div>
    </div>
    <div class="searchst">
      <div class="station">
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="time">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="value1"
                        type="daterange"
                        range-separator="--"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="bot">
        <el-button size="small"
                   type="danger"
                   round>搜索</el-button>
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
  data () {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: "",
    };
  },
  created () { },
  mounted () {
    this.trainNum();
    this.carNum();
    this.axleNum();
    this.thermalNum();
  },
  methods: {
    trainNum () {
      var myChart = echarts.init(document.getElementById("trainnum"));
      var option = {
        xAxis: [
          {
            data: [
              "羊口",
              "田柳",
              "华泰",
              "寿光",
              "大家洼",
              "昌邑",
              "菜州",
              "招远",
              "平度"
            ],
            axisLabel: {
              interval: 0,
              show: false
            }
          },
          {
            data: [
              "羊口",
              "田柳",
              "华泰",
              "寿光",
              "大家洼",
              "昌邑",
              "菜州",
              "招远",
              "平度"
            ],
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
            data: [0, 4000, 1000, 3200, 5200, 5100, 5000, 5100, 5000],
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
            data: [0, 4200, 1000, 3500, 5100, 5100, 5100, 5100, 5000],
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
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    carNum () {
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
          backgroundColor: "#fff",
          borderColor: "#ddd",
          borderWidth: 1,
          textStyle: {
            color: "#3c3c3c",
            fontSize: 16
          },
          formatter: function (p) {
            return p.seriesName + "<br>" + "车辆数量：" + p.value;
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)"
        },
        xAxis: {
          axisLabel: {
            show: false,
            formatter: function (v) {
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
            data: [
              "羊口",
              "田柳",
              "华泰",
              "寿光",
              "大家洼",
              "昌邑",
              "菜州",
              "招远",
              "平度"
            ],
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
            data: [
              "羊口",
              "田柳",
              "华泰",
              "寿光",
              "大家洼",
              "昌邑",
              "菜州",
              "招远",
              "平度"
            ],
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
                formatter: function (v) {
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
            data: [
              0,
              189331,
              45548,
              149146,
              267008,
              258993,
              259347,
              256044,
              257194
            ]
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
                formatter: function (v) {
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
            data: [
              0,
              192271,
              45988,
              155904,
              266782,
              255037,
              257646,
              257053,
              257625
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    axleNum () {
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
          trigger: "item"
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
            data: [
              "羊口",
              "田柳",
              "华泰",
              "寿光",
              "大家洼",
              "昌邑",
              "菜州",
              "招远",
              "平度"
            ]
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
            data: [
              0,
              780000,
              200000,
              600000,
              1100000,
              1051000,
              1040000,
              1040000,
              1040000
            ]
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
            data: [
              0,
              800000,
              200000,
              610000,
              1100000,
              1031000,
              1040000,
              1040000,
              1040000
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    thermalNum () {
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
            data: [
              "羊口上行",
              "华泰上行",
              "大家洼上行",
              "菜州上行",
              "平度上行",
              "田柳下行",
              "寿光下行",
              "昌邑下行",
              "招远下行"
            ]
          }
        ],
        series: [
          {
            name: "激热轴",
            type: "bar",
            stack: "广",
            data: [1, 0, 0, 0, 0, 1, 0, 0, 0]
          },
          {
            name: "强热轴",
            type: "bar",
            data: [0, 0, 1, 0, 0, 0, 0, 1, 0]
          },
          {
            name: "微热轴",
            type: "bar",
            stack: "广",
            data: [6, 5, 3, 7, 1, 6, 5, 3, 7]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
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
  height: 2rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .station {
    float: left;
    line-height: 1.8rem;
    margin-left: 20px;
  }
  .time {
    line-height: 1.8rem;
    float: left;
    margin-left: 20px;
  }
  .bot {
    float: left;
    line-height: 1.8rem;
    margin-left: 20px;
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
