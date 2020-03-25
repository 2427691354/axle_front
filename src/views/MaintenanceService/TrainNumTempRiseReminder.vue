<template>
  <div class="TrainNumTempRiseReminder">
    <!-- 搜索框等 -->
    <div class="search_3">
      <span>温升阈值</span>
      <div class="tem">
        <el-input v-model="input_1" placeholder="请输入内容"></el-input>
      </div>
      <span>达到次数</span>
      <div class="nums">
        <el-input v-model="input_2" placeholder="请输入内容"></el-input>
      </div>
      <div class="bot_3">
        <el-button type="danger" round>搜索</el-button>
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
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      input_1: "40",
      input_2: "2"
    };
  },
  mounted() {
    this.focusOn();
    this.lineTem();
  },
  methods: {
    focusOn() {
      var myChart = echarts.init(document.getElementById("wordCloud"));
      var option = {
        title: {
          text: "重点观察对象",
          x: "center",
          top: "20",
          textStyle: {
            // color: "#FFF",
            fontSize: "80%"
          }
        },
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            //maskImage: maskImage,
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
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
                fontFamily: "sans-serif",
                fontWeight: "bold",
                // Color can be a callback function or a color string
                color: function() {
                  // Random color
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              { name: "875011", value: 5902 },
              { name: "875011", value: 10927 }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    lineTem() {
      var myChart = echarts.init(document.getElementById("temChart"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: "10%",
          right: "5%",
          selectedMode: "single"
        },
        grid: {
          top: "20%",
          left: "8%",
          right: "5%",
          bottom: "30%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["昌邑上行", "寿光上行", "寿光上行"],
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDD"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "温升|绿-右温升(875001)",
          splitLine: {
            lineStyle: {
              color: "#DDD"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#333"
            }
          },
          nameTextStyle: {
            color: "#999"
          }
        },
        series: [
          {
            name: "1轴",
            type: "line",
            data: [5, 7, 2],
            lineStyle: {
              normal: {
                width: 2,
                color: "#54DAC2",
                shadowColor: "rgba(245,128,128, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            symbol: "emptyCircle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#54DAC2"
              }
            },
            smooth: false
          },
          {
            name: "1轴",
            type: "line",
            symbol: "emptyCircle",
            symbolSize: 8,
            data: [1, 5, 2],
            lineStyle: {
              normal: {
                width: 2,
                color: "#F9A589",
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 8,
                shadowOffsetY: 5
              }
            },

            itemStyle: {
              normal: {
                color: "#F9A589"
              }
            },
            smooth: false
          },
          {
            name: "2轴",
            type: "line",
            symbol: "emptyCircle",
            symbolSize: 8,
            data: [8, 9, 1],
            color: "#54DAC2",
            lineStyle: {
              normal: {
                width: 2,
                color: "#54DAC2",
                shadowColor: "rgba(245,128,128, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#54DAC2"
              }
            },
            smooth: false
          },
          {
            name: "2轴",
            type: "line",
            symbol: "emptyCircle",
            symbolSize: 8,
            data: [5, 8, 5],
            lineStyle: {
              normal: {
                width: 2,
                color: "#F9A589",
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F9A589"
              }
            },
            smooth: false
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.TrainNumTempRiseReminder {
  width: 96%;
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
      padding-top: 0.6%;
      margin-left: -2%;
      float: left;
    }
    .nums {
      width: 10%;
      padding-top: 0.6%;
      margin-left: -2%;
      float: left;
    }

    .bot_3 {
      width: 6%;
      padding-top: 0.6%;
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
</style>