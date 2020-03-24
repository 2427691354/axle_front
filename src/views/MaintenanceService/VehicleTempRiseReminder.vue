<template>
  <div class="VehicleTempRiseReminder">
    <!-- 搜索框等 -->
    <div class="search_4">
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
      <div class="select_1">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 主体 -->
    <div class="content_2">
      <!-- 表格 -->
      <div class="table_4">
        <el-table :data="tableData" height="75%" border style="width: 100%">
          <el-table-column prop="carnumber" label="车厢编号"></el-table-column>
        </el-table>
      </div>
      <!-- 折现图 -->
      <div id="lineChart_1"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      input_1: "40",
      input_2: "2",
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
      tableData: [
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        }
      ]
    };
  },
  mounted(){
    this.lineTem2();
  },
  methods:{
    lineTem2(){
       var myChart = echarts.init(document.getElementById("lineChart_1"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top:"10%",
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
          name:"温升|绿-右温升(875001)",
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
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#54DAC2",
              }
            },
            smooth: false
          },
          {
            name: "1轴",
            type: "line",
            symbol: 'emptyCircle',
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
                color: "#F9A589",
              }
            },
            smooth: false
          },
          {
            name: "2轴",
            type: "line",
            symbol: 'emptyCircle',
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
                color: "#54DAC2",
              }
            },
            smooth: false
          },
          {
            name: "2轴",
            type: "line",
            symbol: 'emptyCircle',
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
                color: "#F9A589",
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
.VehicleTempRiseReminder {
  width: 96%;
  transform: translate(2%, 0);
  // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  background-color: #ffffff;
}
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
  .select_1 {
    width: 20%;
    padding-top: 0.6%;
    margin-left: 2%;
    float: left;
  }
}
.content_2 {
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
</style>