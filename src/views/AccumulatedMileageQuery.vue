<template>
  <div class="AccumulatedMileageQuery">
    <div class="title">
      <div class="title_1">累计里程查询</div>
    </div>
    <div class="search_5">
      <div class="time_3">
        <div class="date">
          <el-date-picker v-model="start" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="end" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <div class="carnum">
        <el-input v-model="cars" placeholder="车厢编号"></el-input>
      </div>
      <div class="bot_4">
        <el-button type="danger" round @click="mileageDate">搜索</el-button>
      </div>
      <div class="boxblock" v-if="showblock">
        <span class="demonstration">里程范围</span>
        <div class="block">
          <el-slider
            v-model="inputs.rangeblock"
            :step="1000"
            :max="20000"
            show-stops
            range
            :marks="marks"
          ></el-slider>
        </div>
      </div>
    </div>
    <div class="content_3" v-show="showfun">
      <!-- 漏斗图 -->
      <div id="funnel"></div>
    </div>
    <div class="content_4" v-if="showtable">
      <div class="table_5">
        <el-table
          :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
          height="20.9rem"
          :summary-method="getSummaries"
          show-summary
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="car" label="车型"></el-table-column>
          <el-table-column prop="number" label="车厢编号"></el-table-column>
          <el-table-column prop="total" label="行驶累计里程"></el-table-column>
        </el-table>
      </div>
      <div class="botton_2">
        <el-button type="danger" @click="backIndex">返回</el-button>
      </div>
      <div class="pages_1">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.sumnum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
        ></el-pagination>
        <span>共{{this.sumnum}}条</span>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      start: "2019-2-1",
      end: "2019-2-28",
      cars: "",
      cardata: [],
      carlabel: [],
      carname: "",
      marks: {
        0: "0",
        5000: "5000km",
        10000: "10000km",
        20000: {
          style: {
            color: "#1989FA"
          },
          label: this.$createElement("strong", "20000km")
        }
      },
      tableData: [],
      currentpage: 1,
      pagesize: 11,
      showblock: false,
      showtable: false,
      showfun: true,
      inputs: {
        rangeblock: [0, 20000]
      },
      sumnum: ""
    };
  },
  watch: {
    inputs: {
      //深度监听，可监听到对象、数组的变化
      handler() {
          this.tablesDate();
      },
      deep: true
    }
  },
  mounted() {
    //图表
    this.carQuery();
    //图表数据
    this.mileageDate();
    //表格数据
    this.tablesDate();
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
          data: this.carlabel
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
            data: this.cardata
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
            data: this.cardata
          }
        ]
      };
      myChart.setOption(option);
      var self = this;
      myChart.on("click", function(param) {
        self.carname = param.name;
        self.tablesDate();
        self.showblock = true;
        self.showtable = true;
        self.showfun = false;
        self.carQuery();
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    mileageDate() {
      var self = this;
      //漏斗图数据
      self.$http
        .get(this.baseUrl + "/sumGroupByCx", {
          params: {
            start: self.start,
            end: self.end
          }
        })
        .then(function(response) {
          var res = response.data;
          self.cardata = res;
          for (var i = 0; i < res.length; i++) {
            self.carlabel.push(res[i].name);
          }
          // console.log(self.carlabel);
          self.carQuery();
        });

      // console.log(self.inputs.rangeblock[1]);

      //车厢编号查询
      self.$http
        .get(this.baseUrl + "/findByCxOrCh", {
          params: {
            clxx_chdd: self.cars,
            currentPage: 1,
            size: 100,
            start: self.inputs.rangeblock[0],
            end: self.inputs.rangeblock[1],
            s: self.start,
            e: self.end
          }
        })
        .then(function(response) {
          var res2 = response.data;
          // console.log(res);
          self.sumnum = res2.total;
          // console.log(self.sumnum);
          self.tableData = [];
          for (var i = 0; i < res2.rows.length; i++) {
            self.tableData.push({
              car: res2.rows[i].CLXX_CXCHAR,
              number: res2.rows[i].CLXX_CHDD,
              total: res2.rows[i].sum
            });
          }
          // console.log(self.tableData);
        });
    },
    tablesDate() {
      //包含里程范围查询
      var self = this;
      // console.log(self.carname)
      self.$http
        .get(this.baseUrl + "/findByCxOrCh", {
          params: {
            clxx_cx: self.carname,
            currentPage: 1,
            size: 200,
            start: self.inputs.rangeblock[0],
            end: self.inputs.rangeblock[1],
            s: self.start,
            e: self.end
          }
        })
        .then(function(response) {
          var res = response.data;
          // console.log(res);
          self.sumnum = res.total;
          // console.log(self.sumnum);
          self.tableData = [];
          for (var i = 0; i < res.rows.length; i++) {
            self.tableData.push({
              car: res.rows[i].CLXX_CXCHAR,
              number: res.rows[i].CLXX_CHDD,
              total: res.rows[i].sum
            });
          }
          // console.log(self.tableData);
        });



    },
    getSummaries(param) {
      //   const { columns, data } = param;
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计行驶里程";
          return;
        }
        // const values = data.map(item => Number(item[column.property]));
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr);
        //     if (!isNaN(value)) {
        //       return prev + curr;
        //     } else {
        //       return prev;
        //     }
        //   }, 0);
        //   sums[index] += " 元";
        // } else {
        //   sums[index] = "N/A";
        // }
      });

      return sums;
    },
    backIndex() {
      // this.$router.push("/accumulatedMileageQuery");
      var self = this;
      self.showblock = false;
      self.showtable = false;
      self.showfun = true;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.currentpage = 1;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentpage) {
      this.currentpage = currentpage;
      console.log(this.currentpage); //点击第几页
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
    margin-left: -13%;
    float: left;
  }
  .bot_4 {
    width: 6%;
    line-height: 2.3rem;
    margin-left: -1%;
    float: left;
  }
  span {
    width: 5%;
    height: inherit;
    font-size: 0.5rem;
    padding-top: 1.8%;
    float: left;
  }
  .block {
    width: 45%;
    padding-left: 1%;
    padding-top: 1%;
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
.content_4 {
  height: 25.5rem;
  width: 98%;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .table_5 {
    height: 21.6rem;
  }
  .botton_2 {
    width: 10%;
    // height: 2rem;
    position: absolute;
    margin-top: 3%;
  }

  .pages_1 {
    width: 40%;
    margin-top: 3.2%;
    position: absolute;
    margin-left: 60%;
    span {
      width: 10%;
      height: inherit;
      font-size: 0.5rem;
      position: absolute;
      margin-left: 25%;
      margin-top: -5%;
    }
  }
}
</style>