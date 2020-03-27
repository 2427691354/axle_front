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
          <el-date-picker v-model="value1" type="date"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="value2" type="date"></el-date-picker>
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
      value1: "2019-02-01",
      value2: "2019-03-31",
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

      //上行x轴
      xlabels:[],
      tavgz:[],
      tavgy:[],
      tfcz:[],
      tfcy:[]

    };
  },
  mounted() {
    this.cartemBar();
    this.cartemTop();
    this.cartemBottom();
    this.dataInfo();
  },
  methods: {
    cartemBar() {
      var myChart = echarts.init(document.getElementById("barcar"));
      var myData = [
        "C62A*K",
        "C62A*T",
        "C62AT",
        "C62BK",
        "C62BT",
        "C64H",
        "C64K",
        "C64T",
        "C70",
        "C70E",
        "C70EH",
        "C70H",
        "G17BK",
        "G17BKY",
        "G17BT",
        "G17K",
        "G17T",
        "GN70",
        "NX70",
        "NX70A",
        "P62K",
        "P62NK",
        "P63K",
        "P64AK",
        "P64AT",
        "P64GK",
        "P64K",
        "P70",
        "X70",
        "Y"
      ];
      var option = {
        baseOption: {
          title: {
            text: "车型轴温统计分析",
            textStyle: {
              color: "#000",
              fontSize: 16
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
              width: "42%"
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
              type: "slider",
              yAxisIndex: 0,
              filterMode: "empty",
              start: 0,
              end: 100
            },
            {
              type: "slider",
              yAxisIndex: 2,
              filterMode: "empty",
              start: 0,
              end: 100
            },
            {
              type: "inside",
              yAxisIndex: 0,
              filterMode: "empty",
              start: 0,
              end: 100
            },
            {
              type: "inside",
              yAxisIndex: 2,
              filterMode: "empty",
              start: 0,
              end: 100
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
              position: "right",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                formatter: "{value}",
                margin: 8,
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
                show: true,
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
              barWidth: 10,
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
              name: "右均轴温",
              type: "bar",
              barGap: 20,
              barWidth: 10,
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
              data: this.avgy
            },
            {
              name: "左方差",
              type: "bar",
              barGap: 20,
              barWidth: 10,
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
              data: this.fcz
            },
            {
              name: "右方差",
              type: "bar",
              barGap: 20,
              barWidth: 10,
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
          text: "车型上行温升统计分析"
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
        // toolbox: {
        //     feature: {
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        grid: [
          {
            x: "7%",
            y1: "7%",
            height: "32%",
            left: "12%",
            right: "12%"
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
          top: "5%",
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
              //interval:showNum,  //x轴显示的数量，我这里是动态算的
              rotate: -40
            },
            data: [
              "C62A*K",
              "C62A*T",
              "C62AT",
              "C62BK",
              "C62BT",
              "C64H",
              "C64K",
              "C64T",
              "C70",
              "C70E",
              "C70EH",
              "C70H",
              "G17BK",
              "G17BKY",
              "G17BT",
              "G17K",
              "G17T",
              "GN70",
              "NX70",
              "NX70A",
              "P62K",
              "P62NK",
              "P63K",
              "P64AK",
              "P64AT",
              "P64GK",
              "P64K",
              "P70",
              "X70",
              "Y"
            ]
          },
          {
            type: "category",
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              //interval:showNum,
              rotate: -40
            },
            data: [
              "C62A*K",
              "C62A*T",
              "C62AT",
              "C62BK",
              "C62BT",
              "C64H",
              "C64K",
              "C64T",
              "C70",
              "C70E",
              "C70EH",
              "C70H",
              "G17BK",
              "G17BKY",
              "G17BT",
              "G17K",
              "G17T",
              "GN70",
              "NX70",
              "NX70A",
              "P62K",
              "P62NK",
              "P63K",
              "P64AK",
              "P64AT",
              "P64GK",
              "P64K",
              "P70",
              "X70",
              "Y"
            ]
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
          text: "车型下行温升统计分析"
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
        // toolbox: {
        //     feature: {
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        grid: [
          {
            x: "7%",
            y1: "7%",
            height: "32%",
            left: "12%",
            right: "12%"
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
          top: "5%",
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
              //interval:showNum,  //x轴显示的数量，我这里是动态算的
              rotate: -40
            },
            data: [
              "C62A*K",
              "C62A*T",
              "C62AT",
              "C62BK",
              "C62BT",
              "C64H",
              "C64K",
              "C64T",
              "C70",
              "C70E",
              "C70EH",
              "C70H",
              "G17BK",
              "G17BKY",
              "G17BT",
              "G17K",
              "G17T",
              "GN70",
              "NX70",
              "NX70A",
              "P62K",
              "P62NK",
              "P63K",
              "P64AK",
              "P64AT",
              "P64GK",
              "P64K",
              "P70",
              "X70",
              "Y"
            ]
          },
          {
            type: "category",
            gridIndex: 1, //对应前面grid的索引位置（第二个）
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              //interval:showNum,
              rotate: -40
            },
            data: [
              "C62A*K",
              "C62A*T",
              "C62AT",
              "C62BK",
              "C62BT",
              "C64H",
              "C64K",
              "C64T",
              "C70",
              "C70E",
              "C70EH",
              "C70H",
              "G17BK",
              "G17BKY",
              "G17BT",
              "G17K",
              "G17T",
              "GN70",
              "NX70",
              "NX70A",
              "P62K",
              "P62NK",
              "P63K",
              "P64AK",
              "P64AT",
              "P64GK",
              "P64K",
              "P70",
              "X70",
              "Y"
            ]
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
            data: [
              28,
              13,
              16,
              18,
              11,
              25,
              29,
              8,
              13,
              16,
              18,
              11,
              25,
              29,
              13,
              16,
              18,
              11,
              28,
              23,
              8,
              18,
              17,
              30,
              22,
              30,
              43,
              2,
              10,
              11
            ]
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
            data: [
              45,
              13,
              16,
              18,
              11,
              28,
              23,
              8,
              13,
              16,
              18,
              11,
              25,
              29,
              13,
              16,
              18,
              11,
              28,
              23,
              8,
              18,
              17,
              30,
              22,
              30,
              43,
              2,
              10,
              13
            ]
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
            data: [
              18,
              17,
              30,
              22,
              30,
              43,
              47,
              8,
              13,
              16,
              18,
              11,
              25,
              29,
              13,
              16,
              18,
              11,
              28,
              23,
              8,
              18,
              17,
              30,
              22,
              30,
              43,
              2,
              10,
              15
            ]
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
            data: [
              18,
              17,
              30,
              22,
              30,
              43,
              47,
              8,
              13,
              16,
              18,
              11,
              25,
              29,
              13,
              16,
              18,
              11,
              28,
              23,
              8,
              18,
              17,
              30,
              22,
              30,
              43,
              2,
              10,
              8
            ]
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
        .get("http://139.196.78.182:8620/TempRiseStatisticalAnalysis", {
          params: {
            s: this.value1,
            e: this.value2
          }
        })
        .then(function(response) {
          var res = response.data;
          self.labels = res.CLXX_CXCHAR;
          self.avgz = res.avgz;
          self.avgy = res.avgy;
          self.fcz = res.fcz;
          self.fcy = res.fcy;
          // console.log(self.labels);

          self.cartemBar();
        })
        .catch(function(error) {
          console.log(error);
        });

        self.$http
        .get("http://139.196.78.182:8620/TempRiseStatisticalAnalysisBySX", {
          params: {
            s: this.value1,
            e: this.value2,
            fx:'%E4%B8%8B%E8%A1%8C'
          }
        })
        .then(function(response) {
          var res = response.data;
          self.xlabels = res.CLXX_CXCHAR;
          self.tavgz = res.avgz;
          self.tavgy = res.avgz;
          self.tfcz = res.fcz;
          self.tfcy = res.fcy;
          console.log(self.tavgz);

          self.cartemTop();
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