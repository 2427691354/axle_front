<template>
  <div class="VehicleTemAnaysis">
    <div class="title">
      <div class="title_1">车型温升统计分析</div>
    </div>
    <!-- 时间搜索 -->
    <div class="search_7">
      <div class="time_4">
        <span>起止时间</span>
        <div class="date">
          <el-date-picker v-model="inputs.value1" type="date"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="inputs.value2" type="date"></el-date-picker>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="content_4">
      <!-- 车型温升统计分析柱形图 -->
      <div id="barcar"></div>

      <div class="cartem">
        <!-- 车型上行温升统计分析 -->
        <div id="toptem"></div>
        <!-- 车型下行温升统计分析 -->
        <div id="bottomtem"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      inputs: {
        value1: "2019-02-01",
        value2: "2019-02-28"
      },
      //标签
      labels: [],
      //左平均轴温
      avgz: [],
      //右均轴温
      avgy: [],
      //左方差
      fcz: [],
      //右方差
      fcy: [],

      //上行
      xlabels: [],
      tavgz: [],
      tavgy: [],
      tfcz: [],
      tfcy: [],

      //下行
      ylabels: [],
      bavgz: [],
      bavgy: [],
      bfcz: [],
      bfcy: []
    };
  },
  watch: {
    inputs: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        this.dataInfo();
      },
      deep: true
    }
  },
  mounted() {
    this.cartemBar();
    this.cartemTop();
    this.cartemBottom();
    //后台数据获取
    this.dataInfo();
  },
  methods: {
    cartemBar() {
      var myChart = echarts.init(document.getElementById("barcar"));
      var myData = this.labels;
      var option = {
        baseOption: {
          title: {
            text: "车型温升统计分析",
            top: "3%",
            left: "3%",
            textStyle: {
              color: "#000"
              // fontSize: 16
            }
          },
          legend: {
            data: ["左均轴温", "右均轴温", "左方差", "右方差"],
            top: 4,
            right: "2%",
            textStyle: {
              color: "#000"
            }
          },
          tooltip: {
            show: true,
            trigger: "axis",
            // formatter: '{b}<br/>{a}: {c}<br/>{d}:{e}',
            axisPointer: {
              type: "shadow"
            }
          },
          grid: [
            {
              show: false,
              left: "4%",
              top: 60,
              bottom: 40,
              containLabel: true,
              width: "48%"
            },
            {
              show: false,
              left: "50.5%",
              top: 80,
              bottom: 40,
              width: "0%"
            },
            {
              show: false,
              right: "4%",
              top: 60,
              bottom: 40,
              containLabel: true,
              width: "42%"
            }
          ],
          dataZoom: [
            {
              //滚动条缩放
              type: "slider",
              //控制两边
              yAxisIndex: [0, 2],
              filterMode: "empty",
              start: 0,
              end: 40
            },
            {
              //鼠标缩放
              type: "inside",
              yAxisIndex: [0, 2],
              filterMode: "empty",
              start: 0,
              end: 40
            }
          ],

          xAxis: [
            {
              type: "value",
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: "top",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#B2B2B2",
                  fontSize: 12
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#1F2022",
                  width: 1,
                  type: "solid"
                }
              }
            },
            {
              gridIndex: 1,
              show: false
            },
            {
              gridIndex: 2,
              type: "value",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: "top",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#B2B2B2",
                  fontSize: 12
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#1F2022",
                  width: 1,
                  type: "solid"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              inverse: true,
              // yAxisIndex: 0,
              position: "right",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                formatter: "{value}",
                margin: 30,
                textStyle: {
                  color: "#9D9EA0",
                  fontSize: 12
                }
              },
              data: myData
            },
            {
              gridIndex: 1,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                formatter: "{value}",
                // margin: 8,
                textStyle: {
                  color: "#9D9EA0",
                  fontSize: 12
                }
              },
              data: myData.map(function(value) {
                return {
                  value: value,
                  textStyle: {
                    align: "center"
                  }
                };
                // console.log(value);
              })
            },
            {
              gridIndex: 2,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#9D9EA0",
                  fontSize: 12
                }
              },
              data: myData
            }
          ],
          series: [
            {
              name: "左均轴温",
              type: "bar",
              barGap: 20,
              barWidth: "80%",
              stack: "广",
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  position: "left",
                  offset: [0, 0],
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#FD5916"
                }
              },
              data: this.avgz
            },
            {
              name: "左方差",
              type: "bar",
              barGap: 20,
              barWidth: "80%",
              stack: "广",
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  position: "left",
                  offset: [0, 0],
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#01A4F7"
                }
              },
              data: this.fcz
            },
            {
              name: "右均轴温",
              type: "bar",
              barGap: 20,
              barWidth: "80%",
              stack: "告",
              xAxisIndex: 2,
              yAxisIndex: 2,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  position: "right",
                  offset: [0, 0],
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#7E47FF"
                }
              },
              data: this.avgy
            },
            {
              name: "右方差",
              type: "bar",
              barGap: 20,
              barWidth: "80%",
              stack: "告",
              xAxisIndex: 2,
              yAxisIndex: 2,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  position: "right",
                  offset: [0, 0],
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#2EDDCD"
                }
              },
              data: this.fcy
            }
          ]
        }
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    cartemTop() {
      var myChart = echarts.init(document.getElementById("toptem"));
      var option = {
        title: {
          text: "车型上行温升统计分析",
          top: "3%",
          left: "3%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: [
          {
            x: "7%",
            y1: "7%",
            height: "30%",
            left: "12%",
            right: "12%",
            top: "15%"
          },

          {
            x: "7%",
            y2: "7%",
            height: "30%",
            left: "12%",
            right: "12%",
            bottom: "12%"
          }
        ],
        legend: {
          icon: "circle", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 15, // 设置宽度
          itemHeight: 15, // 设置高度
          itemGap: 10, // 设置间距
          top: "8%",
          left: "7%",
          data: ["左均温升", "右均温升", "左方差", "右方差"]
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0, //对应前面grid的索引位置（第一个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0, //全部显示
              rotate: -40,
              textStyle: {
                fontSize: "35%"
              }
            },
            data: this.xlabels
          },
          {
            type: "category",
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: -40,
              textStyle: {
                fontSize: "35%"
              }
            },
            data: this.xlabels
          }
        ],
        //y轴，不管有几个x轴，几个y轴，或者图，只要找到他对应的grid图的序号索引就可以精准匹配
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 15,
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            name: "左方差",
            //nameLocation:'end',
            splitLine: {
              show: false
            },
            nameLocation: "middle",
            nameTextStyle: {
              padding: 25
            },
            position: "right",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            min: 0,
            max: 15,
            gridIndex: 1,
            nameLocation: "middle",
            name: "右方差",
            nameTextStyle: {
              padding: 25
            },
            splitLine: {
              show: false
            },
            position: "left",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            gridIndex: 0,
            name: "左均温升",
            nameTextStyle: {
              padding: 25
            },
            position: "left",
            nameLocation: "middle",
            splitLine: {
              show: false
            },
            //nameLocation: 'start',//y轴name的位置
            //inverse: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12 //y轴坐标轴上的字体大小
              }
            }
          },
          {
            type: "value",
            gridIndex: 0,
            name: "右均温升",
            nameTextStyle: {
              padding: 25
            },
            nameLocation: "middle",
            position: "right",
            //nameLocation: 'start',//y轴name的位置
            //inverse: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12 //y轴坐标轴上的字体大小
              }
            }
          }
        ],
        series: [
          {
            name: "左均温升",
            // type:'bar',
            // name: "累产气量"
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 2,
            itemStyle: {
              normal: {
                color: "#f8f106"
              }
            },
            data: this.tavgz
          },
          {
            name: "右均温升",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 3,
            itemStyle: {
              normal: {
                color: "#fe7576"
              }
            },
            data: this.tavgy
          },
          {
            name: "左方差",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: "#A9B0D3"
              }
            },
            data: this.tfcz
          },
          {
            name: "右方差",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#4E74D5"
              }
            },
            data: this.tfcy
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    cartemBottom() {
      var myChart = echarts.init(document.getElementById("bottomtem"));
      var option = {
        title: {
          text: "车型下行温升统计分析",
          top: "3%",
          left: "3%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: [
          {
            x: "7%",
            y1: "7%",
            height: "32%",
            left: "12%",
            right: "12%",
            top: "15%"
          },

          {
            x: "7%",
            y2: "7%",
            height: "32%",
            left: "12%",
            right: "12%",
            bottom: "12%"
          }
        ],
        legend: {
          icon: "circle", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 15, // 设置宽度
          itemHeight: 15, // 设置高度
          itemGap: 10, // 设置间距
          top: "8%",
          left: "7%",
          data: ["左均温升", "右均温升", "左方差", "右方差"]
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0, //对应前面grid的索引位置（第一个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: -40,
              textStyle: {
                fontSize: "35%"
              }
            },
            data: this.ylabels
          },
          {
            type: "category",
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: -40,
              textStyle: {
                fontSize: "35%"
              }
            },
            data: this.ylabels
          }
        ],
        //y轴，不管有几个x轴，几个y轴，或者图，只要找到他对应的grid图的序号索引就可以精准匹配
        yAxis: [
          {
            type: "value",
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            name: "左方差",
            //nameLocation:'end',
            splitLine: {
              show: false
            },
            nameLocation: "middle",
            nameTextStyle: {
              padding: 25
            },
            position: "right",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            gridIndex: 1,
            nameLocation: "middle",
            name: "右方差",
            nameTextStyle: {
              padding: 25
            },
            splitLine: {
              show: false
            },
            position: "left",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            gridIndex: 0,
            name: "左均温升",
            nameTextStyle: {
              padding: 25
            },
            position: "left",
            nameLocation: "middle",
            splitLine: {
              show: false
            },
            //nameLocation: 'start',//y轴name的位置
            //inverse: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12 //y轴坐标轴上的字体大小
              }
            }
          },
          {
            type: "value",
            gridIndex: 0,
            name: "右均温升",
            nameTextStyle: {
              padding: 25
            },
            nameLocation: "middle",
            position: "right",
            //nameLocation: 'start',//y轴name的位置
            //inverse: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                fontSize: 12 //y轴坐标轴上的字体大小
              }
            }
          }
        ],

        series: [
          {
            name: "左均温升",
            // type:'bar',
            // name: "累产气量"
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 2,
            itemStyle: {
              normal: {
                color: "#f8f106"
              }
            },
            data: this.bavgz
          },
          {
            name: "右均温升",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 3,
            itemStyle: {
              normal: {
                color: "#fe7576"
              }
            },
            data: this.bavgy
          },
          {
            name: "左方差",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: "#A9B0D3"
              }
            },
            data: this.bfcz
          },
          {
            name: "右方差",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#4E74D5"
              }
            },
            data: this.bfcy
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    dataInfo() {
      var self = this;
      self.$http
        .get(this.baseUrl + "/TempRiseStatisticalAnalysis", {
          params: {
            s: self.inputs.value1,
            e: self.inputs.value2
          }
        })
        .then(function(response) {
          var res = response.data;
          //转换为字符串并以逗号分隔split(",")
          self.labels = res.CLXX_CXCHAR.split(",");
          self.avgz = res.avgz.split(",");
          self.avgy = res.avgy.split(",");
          self.fcz = res.fcz.split(",");
          self.fcy = res.fcy.split(",");
          console.log(self.labels);

          self.cartemBar();
        })
        .catch(function(error) {
          console.log(error);
        });

      self.$http
        .get(this.baseUrl + "/TempRiseStatisticalAnalysis", {
          params: {
            s: self.inputs.value1,
            e: self.inputs.value2,
            fx: "上行"
          }
        })
        .then(function(response) {
          var res = response.data;
          self.xlabels = res.CLXX_CXCHAR.split(",");
          self.tavgz = res.avgz.split(",");
          self.tavgy = res.avgz.split(",");
          self.tfcz = res.fcz.split(",");
          self.tfcy = res.fcy.split(",");
          // console.log(self.tavgz);
          // console.log(self.xlabels);
          self.cartemTop();
        })
        .catch(function(error) {
          console.log(error);
        });

      self.$http
        .get(this.baseUrl + "/TempRiseStatisticalAnalysis", {
          params: {
            s: self.inputs.value1,
            e: self.inputs.value2,
            fx: "下行"
          }
        })
        .then(function(response) {
          var res = response.data;
          self.ylabels = res.CLXX_CXCHAR.split(",");
          self.bavgz = res.avgz.split(",");
          self.bavgy = res.avgz.split(",");
          self.bfcz = res.fcz.split(",");
          self.bfcy = res.fcy.split(",");
          // console.log(self.tavgz);
          // console.log(self.xlabels);
          self.cartemBottom();
        })
        .catch(function(error) {
          console.log(error);
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
.search_7 {
  width: 98%;
  height: 2.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .time_4 {
    width: 35%;
    height: inherit;
    font-size: 0.5rem;
    color: #9b9b9b;
    float: left;
    line-height: 2.5rem;
    span {
      width: 20%;
      margin-right: 3%;
      float: left;
    }
    .date {
      width: 30%;
      height: 1rem;
      float: left;
    }
    .text {
      width: 4%;
      float: left;
      height: 2rem;
      text-align: center;
      font-size: 0.5rem;
      color: #036fb8;
    }
  }
}
.content_4 {
  width: 98%;
  height: 25.5rem;
  //div添加滚动条
  overflow: auto;
  //   background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  //   box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  #barcar {
    height: 20rem;
    background-color: #ffffff;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  }
  .cartem {
    height: 20rem;
    margin-top: 0.8%;
    #toptem {
      width: 49.5%;
      height: inherit;
      position: absolute;
      background-color: #ffffff;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    }
    #bottomtem {
      width: 49.5%;
      height: inherit;
      position: absolute;
      margin-left: 50.5%;
      background-color: #ffffff;
      box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    }
  }
}
</style>