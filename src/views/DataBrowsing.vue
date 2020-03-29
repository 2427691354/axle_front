<template>
  <div class="databrowsing">
    <div class="left">
      <el-tree
        :data="treeData"
        :render-content="renderContent"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[1]"
        accordion
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="center">
      <div class="top">
        <div class="textBox">
          {{this.textBox.station}}
          {{this.textBox.number}}
          [{{this.textBox.date}}]
          {{this.textBox.type}}
          {{this.textBox.trainNum}}辆
          {{this.textBox.axleNum}}轴
          {{this.textBox.speed}}km/h
          环温：{{this.textBox.ringTemp}}℃
        </div>
      </div>
      <div class="bottom">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="全列轴温" name="first">
            <div class="table1">
              <el-table
                :data="tableData1"
                style="width: 100%"
                height="22rem"
                :span-method="objectSpanMethod"
              >
                <el-table-column label="辆位" prop="ZXXX_LW" width="50%"></el-table-column>
                <el-table-column label="轴位" prop="ZXXX_ZW" width="50%"></el-table-column>
                <el-table-column label="左报警" prop="ZXXX_ZRZDJ"></el-table-column>
                <el-table-column label="左温度" prop="ZXXX_ZWD"></el-table-column>
                <el-table-column label="左温升" prop="ZXXX_ZWS"></el-table-column>
                <el-table-column label="右报警" prop="ZXXX_YRZDJ"></el-table-column>
                <el-table-column label="右温度" prop="ZXXX_YWD"></el-table-column>
                <el-table-column label="右温升" prop="ZXXX_YWS"></el-table-column>
                <el-table-column label="车号" prop="LCXX_CH"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="车次追踪" name="second">
            <div class="textBox2">
              运行速度(km/h)：{{this.textBox2.ds}}_{{this.textBox2.js}}_{{this.textBox2.gs}}&nbsp;&nbsp;
              接车序号：#{{this.textBox2.number}}&nbsp;&nbsp;
              左平均温升(℃)：{{this.textBox2.leftAvg}}&nbsp;&nbsp;
              右平均温升(℃)：{{this.textBox2.rightAvg}}&nbsp;&nbsp;
            </div>
            <div class="tableBody">
              <el-table :data="tableData2" style="width: 100%" height="20.5rem">
                <el-table-column label="过车时间" prop="LCXX_GCSJ" width="150%"></el-table-column>
                <el-table-column label="探测点" prop="TCZ_MC"></el-table-column>
                <el-table-column label="车型" prop="LCXX_KH"></el-table-column>
                <el-table-column label="辆数" prop="LCXX_ZLS"></el-table-column>
                <el-table-column label="轴数" prop="LCXX_ZZS"></el-table-column>
                <el-table-column label="车速（km/h）" prop="LCXX_GDJS"></el-table-column>
                <el-table-column label="环温（℃）" prop="LCXX_HW"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="温升变化" name="third">
            <div class="inputs">
              <div class="select">
                <el-select v-model="value1" placeholder="辆位" size="mini">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="select">
                <el-select v-model="value2" placeholder="轴位" size="mini">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="btn">
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  size="mini"
                  circle
                  @click="drawEchart"
                ></el-button>
              </div>
            </div>
            <div class="echart" id="temprise"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <div class="top">{{this.timeLine.station}}行车记录</div>
      <div class="bottom">
        <el-timeline :reverse="this.reverse">
          <el-timeline-item
            v-for="(activity, index) in this.timeLine.activities.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :key="index"
            :timestamp="activity.LCXX_GCSJ"
            size="large"
            color="#018eed"
            style="height:2.4rem"
          >
            <a href="#" @click="timeLineClick(activity)">{{activity.LCXX_HBWJXH}}</a>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="pagination">
        <div class="pagetext">共{{Math.ceil(this.timeLine.activities.length/10)}}页</div>
        <div class="page" align="right">
          <el-pagination
            small
            layout="prev, next"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="timeLine.activities.length"
            @current-change="handleCurrentChange"
          ></el-pagination>
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
      //树形控件数据
      treeData: [
        {
          id: 1,
          label: "测试线上行",
          icon: "el-icon-sort-up",
          children: [
            {
              id: 2,
              label: "羊口上行",
              icon: "el-icon-s-check"
            },
            {
              id: 3,
              label: "田柳上行",
              icon: "el-icon-s-check"
            },
            {
              id: 4,
              label: "华泰上行",
              icon: "el-icon-s-check"
            },
            {
              id: 5,
              label: "寿光上行",
              icon: "el-icon-s-check"
            },
            {
              id: 6,
              label: "大家洼上行",
              icon: "el-icon-s-check"
            },
            {
              id: 7,
              label: "昌邑上行",
              icon: "el-icon-s-check"
            },

            {
              id: 8,
              label: "莱州上行",
              icon: "el-icon-s-check"
            },
            {
              id: 9,
              label: "招远上行",
              icon: "el-icon-s-check"
            },
            {
              id: 10,
              label: "平度上行",
              icon: "el-icon-s-check"
            }
          ]
        },
        {
          id: 11,
          label: "测试线下行",
          icon: "el-icon-sort-down",
          children: [
            {
              id: 12,
              label: "田柳下行",
              icon: "el-icon-s-check"
            },
            {
              id: 13,
              label: "华泰下行",
              icon: "el-icon-s-check"
            },
            {
              id: 14,
              label: "寿光下行",
              icon: "el-icon-s-check"
            },
            {
              id: 15,
              label: "大家洼下行",
              icon: "el-icon-s-check"
            },
            {
              id: 16,
              label: "昌邑下行",
              icon: "el-icon-s-check"
            },

            {
              id: 17,
              label: "莱州下行",
              icon: "el-icon-s-check"
            },
            {
              id: 18,
              label: "招远下行",
              icon: "el-icon-s-check"
            },
            {
              id: 19,
              label: "平度下行",
              icon: "el-icon-s-check"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //页面中间上面文字数据
      textBox: {
        //站点名
        station: "",
        //序号
        number: "",
        //日期
        date: "",
        //类型
        type: "",
        //车辆数
        trainNum: "",
        //轴数
        axleNum: "",
        //车速
        speed: "",
        //环温
        ringTemp: ""
      },
      //选项卡默认选中
      activeName: "first",
      //表格1接口参数1
      LCXX_BH: "",
      //表格1数据
      tableData1: [
        {
          //辆位
          carPosition: "1",
          //轴位
          axlePosition: "1",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "1",
          //轴位
          axlePosition: "2",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "1",
          //轴位
          axlePosition: "3",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "1",
          //轴位
          axlePosition: "4",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "2",
          //轴位
          axlePosition: "1",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "2",
          //轴位
          axlePosition: "2",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "2",
          //轴位
          axlePosition: "3",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "2",
          //轴位
          axlePosition: "4",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "3",
          //轴位
          axlePosition: "1",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "3",
          //轴位
          axlePosition: "2",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "3",
          //轴位
          axlePosition: "3",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "3",
          //轴位
          axlePosition: "4",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "1",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "2",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "3",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "4",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "1",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "2",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "3",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        },
        {
          //辆位
          carPosition: "4",
          //轴位
          axlePosition: "4",
          //左报警
          leftWarning: "正常",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右报警
          rightWarning: "正常",
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //车号
          number: "89101"
        }
      ],
      //tab第二页页面中间下面文字数据
      textBox2: {
        //速度
        ds: "",
        js: "",
        gs: "",
        //接车序号
        number: "",
        //左平均温升
        leftAvg: "",
        //右平均温升
        rightAvg: ""
      },
      //表格2数据
      tableData2: [],
      //下拉框1选项
      options1: [
        {
          value: "0",
          label: "0"
        },
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        }
      ],
      //辆位
      value1: "",
      //下拉框2选项
      options2: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        }
      ],
      //轴位
      value2: "",
      echart: {
        //左轴数据
        left: [23, 23.1, 17, 54, 34, 25, 12],
        //右轴数据
        right: [25.4, 23.4, 15, 65, 30, 34, 25]
      },
      //时间树倒序
      reverse: false,
      //初始页
      currentPage: 1,
      //每页的数据
      pagesize: 10,
      //右侧时间树数据
      timeLine: {
        //站点名
        station: "",
        //时间树数据
        activities: []
      },
      XLList: [],
      //当前站点名
      tczMc: "",
      //当前站点号
      tczJd: ""
    };
  },
  mounted() {
    // this.getGlist(987654321);
    this.initTczjd();
  },
  methods: {
    //为树形控件个元素提供tczjd,并默认显示昌邑上行数据
    initTczjd() {
      var self = this;
      self.$http.get(this.baseUrl + "/XLList").then(function(response) {
        var res = response.data;
        self.XLList = res;
        // console.log(res);
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < res[0].sx.length; j++) {
            if (res[0].sx[j].tczMc == self.treeData[0].children[i].label) {
              self.treeData[0].children[i].tczJd = res[0].sx[j].tczJd;
            }
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < res[0].xx.length; y++) {
            if (res[0].xx[y].tczMc == self.treeData[1].children[x].label) {
              self.treeData[1].children[x].tczJd = res[0].xx[y].tczJd;
            }
          }
        }
        self.tczJd = self.treeData[0].children[5].tczJd;
        self.tczMc = self.treeData[0].children[5].label;
        self.getGlist(self.tczJd);
        // console.log(self.tczMc);
      });
    },
    //点击树形控件事件
    handleNodeClick(data) {
      this.tczJd = data.tczJd;
      this.tczMc = data.label;
      // console.log(this.tczMc);
      this.getGlist(this.tczJd);
    },
    //树形控件添加图标
    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    },
    //表格行合并
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //绘制折线图
    drawEchart() {
      if (this.value1 == "" || this.value2 == "") {
        this.$message({
          message: "请输入辆数和轴数！",
          type: "warning"
        });
      } else {
        var myChart = echarts.init(document.getElementById("temprise"));
        var option = {
          tooltip: {
            trigger: "item"
          },
          legend: {
            right: 0,
            selectedMode: "single"
          },
          //控制分段变色
          visualMap: {
            show: false,
            type: "piecewise",
            // seriesIndex: 2, //控制series 对应的区域
            pieces: [
              {
                gt: 20,
                lte: 30,
                color: "green"
              },
              {
                gt: 0,
                lte: 20,
                color: "red"
              },
              {
                gt: 30,
                color: "red"
              }
            ]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: true,

            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e8e7e7"
              }
            },
            data: [
              "招远上行",
              "莱州上行",
              "平度上行",
              "昌邑上行",
              "大家洼上行",
              "田柳上行",
              "寿光上行"
            ]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: this.value1 + "辆" + this.value2 + "轴左",
              type: "line",
              data: this.echart.left
            },
            {
              name: this.value1 + "辆" + this.value2 + "轴右",
              type: "line",
              data: this.echart.right
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    //分页组件切换事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getGlist(this.tczJd);
      //console.log(this.currentPage)  //点击第几页
    },
    //时间树点击事件
    timeLineClick(ac) {
      //获取节点对象
      // console.log(ac);
      this.changeByJL(ac);
    },
    //转化时间格式
    todate(d) {
      var date = new Date(d);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() + 1 < 10
          ? "0" + date.getSeconds()
          : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //根据站点名获取过车记录
    getGlist(tczJd) {
      var self = this;
      self.$http
        .get(
          this.baseUrl + "/gcList?tczjd=" + tczJd + "&currentPage=1&size=4000"
        )
        .then(function(response) {
          var res = response.data;
          for (var i = 0; i < res.rows.length; i++) {
            if(res.rows[i].LCXX_HBWJXH<10000){
              res.rows[i].LCXX_HBWJXH = "0"+res.rows[i].LCXX_HBWJXH
            }
            res.rows[i].LCXX_GCSJ = self.todate(res.rows[i].LCXX_GCSJ);
            // console.log(res.rows[i].LCXX_GCSJ);
          }
          self.timeLine.activities = res.rows;

          if (res.total != 0) {
            //时间树标题站点名
            self.timeLine.station = res.rows[0].TCZ_MC;
            //页面中间上方站点名
            self.textBox.station = self.timeLine.station;
            //默认展示时间树每页第一项对应内容
            var ac = self.timeLine.activities.slice(
              (self.currentPage - 1) * self.pagesize,
              self.currentPage * self.pagesize
            )[0];
            // console.log(ac.LCXX_HBWJXH);
            self.changeByJL(ac);
          }

          // console.log(self.timeLine.activities);
        });
    },
    //根据时间树节点切换对应内容
    changeByJL(ac) {
      this.LCXX_BH = ac.LCXX_BH;
      // console.log(this.LCXX_BH);
      //页面中间上方日期
      this.textBox.date = ac.LCXX_GCSJ;
      //页面中间上方序号
      this.textBox.number = ac.LCXX_HBWJXH;
      //页面中间上总列数
      this.textBox.trainNum = ac.LCXX_ZLS;
      //页面中间上总轴数
      this.textBox.axleNum = ac.LCXX_ZZS;
      //页面中间上速度
      this.textBox.speed = ac.LCXX_PJSU;
      //页面中间上环温
      this.textBox.ringTemp = ac.LCXX_HW;
      //页面中间上类型
      if (ac.LCXX_KH == 72) {
        this.textBox.type = "货车";
      } else if (ac.LCXX_KH == 74) {
        this.textBox.type = "客车";
      }
      //页面中间速度
      this.textBox2.ds = ac.LCXX_ZDSU;
      this.textBox2.js = ac.LCXX_PJSU;
      this.textBox2.gs = ac.LCXX_ZGSU;
      //页面中间接车序号
      this.textBox2.number = ac.TCZ_ID;
      //页面中间左温升
      this.textBox2.leftAvg = ac.LCXX_ZJWS_T1;
      //页面中间右温升
      this.textBox2.rightAvg = ac.LCXX_YJWS_T1;
      //table2
      this.getTable2(ac.LCXX_HBWJXH);
      //table1
      this.getTable1(ac.LCXX_GCSJ);
    },
    getTable2(xh) {
      var self = this;
      self.$http
        .get(this.baseUrl + "/tracelist?tcdjd=" + self.tczJd + "&xh=" + xh)
        .then(function(response) {
          var res = response.data;
          for (var i = 0; i < res.length; i++) {
            res[i].LCXX_GCSJ = self.todate(res[i].LCXX_GCSJ);
            if (res[i].LCXX_KH == 72) {
              res[i].LCXX_KH = "货车";
            } else if (res[i].LCXX_KH == 74) {
              res[i].LCXX_KH = "客车";
            }
          }
          self.tableData2 = res;
          // console.log(res);
        });
    },
    getTable1(time) {
      time = time.trim().split(/\s+/);
      time = time[0] + "+" + time[1];
      var self = this;
      self.$http
        .get(
          this.baseUrl +
            "/axleListBylcbh2?lcbh=" +
            self.LCXX_BH +
            "&tcz=" +
            self.tczMc +
            "&gcsj=" +
            time
        )
        .then(function(response) {
          var res = response.data;
          for (var i = 0; i < res.length; i++) {
            switch(res[i].ZXXX_YRZDJ){
              case 0:
                res[i].ZXXX_YRZDJ = "正常";
                break;
              case 1:
                res[i].ZXXX_YRZDJ = "激热";
                break;
              case 2:
                res[i].ZXXX_YRZDJ = "强热";
                break;
              case 3:
                res[i].ZXXX_YRZDJ = "微热";
                break;
            }
             switch(res[i].ZXXX_ZRZDJ){
              case 0:
                res[i].ZXXX_ZRZDJ = "正常";
                break;
              case 1:
                res[i].ZXXX_ZRZDJ = "激热";
                break;
              case 2:
                res[i].ZXXX_ZRZDJ = "强热";
                break;
              case 3:
                res[i].ZXXX_ZRZDJ = "微热";
                break;
            }
          }
          self.tableData1 = res;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.left,
.center .top,
.center .bottom,
.right {
  background-color: #fff;
  box-shadow: 1px 1px 2px 2px #e8e8e8;
}

.left {
  width: 12.5%;
  height: 28.1rem;
  padding: 0.2rem 1.5%;
  float: left;
}
.center {
  width: 66%;
  height: 28.5rem;
  margin: 0 1.5%;
  float: left;
  .top {
    height: 1.8rem;
    width: 100%;
    margin-bottom: 0.7rem;
    padding: 0.6rem 0;
    .textBox {
      height: 0.9rem;
      width: 94%;
      margin: 0 2%;
      font-size: 0.5rem;
      padding: 0.45rem 1%;
      text-align: left;
      background-color: #f5f5f5;
      border-left: 5px #036fb8 solid;
    }
  }
  .bottom {
    height: 24.4rem;
    width: 96%;
    padding: 0.2rem 2%;
    .table1 {
      height: 22rem;
      width: 100%;
    }

    .textBox2 {
      height: 1rem;
      width: 97%;
      font-size: 0.6rem;
      padding: 0.2rem 1%;
      text-align: left;
    }
    .inputs {
      height: 1.6rem;
      width: 97%;
      padding: 0 1%;
      .select {
        width: 20%;
        margin-right: 1%;
        float: left;
      }
      .btn {
        width: 6%;
        float: left;
        height: 1.1rem;
      }
    }
    .echart {
      height: 15rem;
      width: 99%;
    }
  }
}
.right {
  width: 15.5%;
  height: 28.5rem;
  float: left;
  .top {
    font-size: 0.6rem;
    padding: 0.2rem 5%;
    height: 1rem;
    text-align: left;
    border-bottom: 1px #f5f5f5 solid;
  }
  .bottom {
    height: 23.5rem;
    width: 87%;
    padding: 0.5rem 5% 0.5rem 8%;
    a {
      color: #000;
    }
    a:hover {
      color: #555555;
    }
  }
  .pagination {
    width: 100%;
    padding-top: 0.5rem;
    height: 2rem;
    font-size: 0.5rem;
    .pagetext {
      width: 60%;
      height: 1rem;
      text-align: right;
      padding: 0.3rem 0;
      float: left;
    }
    .page {
      width: 35%;
      float: left;
      height: 1rem;
      padding: 0.2rem 0;
    }
  }
}
</style>
