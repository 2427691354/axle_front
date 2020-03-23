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
    }
  }
};
</script>
<style lang="less" scoped>
.TrainNumTempRiseReminder {
  width: 96%;
  transform: translate(2%, 0);
}
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
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    position: absolute;
    margin-left: 40%;
  }
}
</style>