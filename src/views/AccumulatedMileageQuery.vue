<template>
  <div class="AccumulatedMileageQuery">
    <div class="title">
      <div class="title_1">累计里程查询</div>
    </div>
    <div class="search_5">
      <div class="time_3">
        <div class="date">
          <el-date-picker v-model="value1" type="date"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="value1" type="date"></el-date-picker>
        </div>
      </div>
      <div class="carnum">
        <el-input v-model="input_1" placeholder="车厢编号"></el-input>
      </div>
      <div class="bot_4">
        <el-button type="danger" round>搜索</el-button>
      </div>
    </div>
    <div class="content_3">
      <!-- 漏斗图 -->
      <div id="funnel"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.carQuery();
  },
  methods: {
    carQuery() {
      var myChart = echarts.init(document.getElementById("funnel"));
      var option = {
        title: {
          text: "车型累计里程",
          x: "center",
          top: 20
        },
        color: ["#f36119", "#ff9921", "#20c8ff", "#2cb7ff", "#1785ef"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "red"
            },
            lineStyle: {
              color: "#9eb2cb"
            }
          }
        },

        legend: {
          show: false,
          top: "top",
          left: "2%",
          textStyle: {
            color: "#000"
          },
          itemHeight: 2,
          data: [
            "C64",
            "C62G",
            "C64K",
            "GH70G",
            "C70",
            "CX64",
            "GN70",
            "G17K",
            "G178K",
            "C77"
          ]
        },
        grid: {
          top: 10,
          left: "1%",
          right: 20,
          bottom: 30,
          containLabel: true,
          borderWidth: 0.5
        },
        series: [
          {
            top: 100,
            type: "funnel",
            left: 0,
            width: "80%",
            gap: 5,
            minSize: 300,
            maxSize: 600,
            label: {
              show: true,
              position: "inside",
              formatter: "{b}  ({c}km)"
            },
            data: [
              {
                value: 702745,
                name: "C64"
              },
              {
                value: 608097,
                name: "C62G"
              },
              {
                value: 600234,
                name: "C64K"
              },
              {
                value: 539259,
                name: "GH70G"
              },
              {
                value: 451671,
                name: "C70"
              },
              {
                value: 309159,
                name: "CX64"
              },
              {
                value: 195804,
                name: "GN70"
              },
              {
                value: 98068,
                name: "G17K"
              },
              {
                value: 17578,
                name: "G178K"
              },
              {
                value: 6661,
                name: "C77"
              }
            ]
          },

          {
            top: 100,
            type: "funnel",
            left: 0,
            width: "80%",
            gap: 16,
            z: 1,
            minSize: 300,
            maxSize: 300,
            label: {
              normal: {
                color: "#000000",
                position: "right",
                backgroundColor: "#f6f7fc",
                borderColor: "#f6f7fc",
                borderWidth: 1,
                borderRadius: 4,
                padding: [11, 25],
                width: 100
              }
            },
            //右侧的百分比显示的地方
            labelLine: {
              show: true,
              normal: {
                length: 400,
                position: "center",
                lineStyle: {
                  width: 1,
                  color: "#e8e9f1",
                  type: "solid"
                }
              }
            },
            //主体是透明的
            itemStyle: {
              normal: {
                color: "transparent",
                borderWidth: 0,
                opacity: 1
              }
            },
            data: [
              {
                value: 702745,
                name: "C64"
              },
              {
                value: 608097,
                name: "C62G"
              },
              {
                value: 600234,
                name: "C64K"
              },
              {
                value: 539259,
                name: "GH70G"
              },
              {
                value: 451671,
                name: "C70"
              },
              {
                value: 309159,
                name: "CX64"
              },
              {
                value: 195804,
                name: "GN70"
              },
              {
                value: 98068,
                name: "G17K"
              },
              {
                value: 17578,
                name: "G178K"
              },
              {
                value: 6661,
                name: "C77"
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      myChart.on("click", function(param) {
        var name = param.name;
        if (name == "C64") {
          parent.location.href = "/#/mileageDetails";
        } else if (name == "C62G") {
          parent.location.href = "/#/mileageDetails";
        }
      });
      window.addEventListener("resize", function() {
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
.search_5 {
  width: 98%;
  height: 2.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .time_3 {
    width: 35%;
    float: left;
    line-height: 2.3rem;
    margin-left: 3%;
     .date {
      width: 30%;
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
  .carnum {
    width: 15%;
    line-height: 2.3rem;
    margin-left: -10%;
    float: left;
  }
  .bot_4 {
    width: 6%;
    line-height: 2.3rem;
    float: left;
  }
}
.content_3 {
  width: 98%;
  height: 25.5rem;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  background-color: #ffffff;
  #funnel {
    width: 100%;
    height: 24rem;
  }
}
</style>