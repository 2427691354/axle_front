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
          {{this.textBox.speed}}
          温度：{{this.textBox.ringTemp}}
        </div>
      </div>
      <div class="bottom">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全列轴温" name="first">
            <div class="table1">
              <el-table
                :data="tableData1"
                style="width: 100%"
                height="22rem"
                :span-method="objectSpanMethod"
              >
                <el-table-column label="辆位" prop="carPosition" width="50%"></el-table-column>
                <el-table-column label="轴位" prop="axlePosition" width="50%"></el-table-column>
                <el-table-column label="左报警" prop="leftWarning"></el-table-column>
                <el-table-column label="左温度" prop="leftTemp"></el-table-column>
                <el-table-column label="左温升" prop="leftRise"></el-table-column>
                <el-table-column label="右报警" prop="rightWarning"></el-table-column>
                <el-table-column label="右温度" prop="rightTemp"></el-table-column>
                <el-table-column label="右温升" prop="rightRise"></el-table-column>
                <el-table-column label="车号" prop="number"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="车次追踪" name="second">
            <div class="textBox2">
              运行速度(km/h)：{{this.textBox2.speed}}&nbsp;&nbsp;
              接车序号：{{this.textBox2.number}}&nbsp;&nbsp;
              左平均温升(℃)：{{this.textBox2.leftAvg}}&nbsp;&nbsp;
              右平均温升(℃)：{{this.textBox2.rightAvg}}&nbsp;&nbsp;
            </div>
            <div class="tableBody">
              <el-table :data="tableData2" style="width: 100%" height="20.5rem">
                <el-table-column label="过车时间" prop="date" width="150%"></el-table-column>
                <el-table-column label="探测点" prop="station"></el-table-column>
                <el-table-column label="车型" prop="type"></el-table-column>
                <el-table-column label="辆数" prop="trainNum"></el-table-column>
                <el-table-column label="轴数" prop="axleNum"></el-table-column>
                <el-table-column label="车速（km/h）" prop="speed"></el-table-column>
                <el-table-column label="环温（℃）" prop="ringTemp"></el-table-column>
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
            :timestamp="activity.timestamp"
            :size="activity.size"
            :color="activity.color"
            style="height:2.4rem"
          >
            <a href="#" @click="timeLineClick(activity.content)">{{activity.content}}</a>
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
      //警告框是否显示
      alertshow: false,
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
        station: "羊口上行",
        //序号
        number: "11186",
        //日期
        date: "2018-04-15 00:52:51",

        //类型
        type: "货车",
        //车辆数
        trainNum: "48",
        //轴数
        axleNum: "198",
        //车速
        speed: "40km/h",
        //环温
        ringTemp: "3.6℃"
      },
      //选项卡默认选中
      activeName: "first",
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
        speed: "38_40_41",
        //接车序号
        number: "#561",
        //左平均温升
        leftAvg: 15.5,
        //右平均温升
        rightAvg: 10.1
      },
      //表格2数据
      tableData2: [
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },

        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        },
        {
          //过车时间
          date: "2019-02-25 01:50:51",
          //探测点
          station: "招远上行",
          //车型
          type: "货车",
          //辆数
          trainNum: 48,
          //轴数
          axleNum: 198,
          //车速
          speed: 44,
          //环温
          ringTemp: 0.7
        }
      ],
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
        station: "羊口上行",
        //时间树数据
        activities: [
          {
            content: "11177",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11178",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11179",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11180",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11181",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11182",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11183",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11184",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11185",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11186",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11187",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11188",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11189",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11190",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11191",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11192",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11193",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11194",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          }
        ]
      },

      //羊口上行时间树
      yangKoUpTimeLine: {
        //站点名
        station: "羊口上行",
        //时间轴数据
        activities: [
          {
            content: "11177",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11178",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11179",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11180",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11181",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11182",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11183",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11184",
            timestamp: "2018-04-13 02:57:28",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11185",
            timestamp: "2018-04-11 04:07:24",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11186",
            timestamp: "2018-04-15 00:52:52",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11187",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11188",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11189",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11190",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11191",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11192",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11193",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          },
          {
            content: "11194",
            timestamp: "2018-04-15 00:52:51",
            color: "#018eed",
            size: "large"
          }
        ]
      },

      //11177data
      yangkoudata11177: {
        textBox: {
          //站点名
          station: "羊口上行",
          //号码
          number: "11177",
          //时间
          date: "2018-04-15 00:52:51",
          //类型
          type: "货车",
          //车辆数
          trainNum: 22,
          //轴数
          axleNum: 222,
          //车速
          speed: "40km/h",
          //环温
          ringTemp: "3.6℃"
        },
        //表格1数据
        tableData1: [
          {
            //辆位
            carPosition: "1",
            //轴位
            axlePosition: "1",
            //左报警
            leftWarning: "cc",
            //左温度
            leftTemp: 55,
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
            leftTemp: 55,
            //左温升
            leftRise: 44,
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
        //表格2数据
        tableData2: [
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "羊口上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 28,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "羊口上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },

          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          }
        ],
        //tab第二页页面中间下面文字数据
        textBox2: {
          //速度
          speed: "38_40_42",
          //接车序号
          number: "#561",
          //左平均温升
          leftAvg: 15.5,
          //右平均温升
          rightAvg: 10.1
        },
        echart: {
          //左轴数据
          left: [24, 25, 17, 54, 34, 25, 12],
          //右轴数据
          right: [25.4, 23.4, 15, 65, 30, 34, 25]
        }
      },
      //11186data
      yangkoudata11186: {
        textBox: {
          //站点名
          station: "羊口上行",
          //号码
          number: "11186",
          //时间
          date: "2018-04-15 00:52:52",
          //类型
          type: "货车",
          //车辆数
          trainNum: 22,
          //轴数
          axleNum: 222,
          //车速
          speed: "40km/h",
          //环温
          ringTemp: "3.6℃"
        },
        //表格1数据
        tableData1: [
          {
            //辆位
            carPosition: "1",
            //轴位
            axlePosition: "1",
            //左报警
            leftWarning: "cc",
            //左温度
            leftTemp: 55,
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
        //表格2数据
        tableData2: [
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "羊口上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 28,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "羊口上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },

          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          },
          {
            //过车时间
            date: "2019-02-25 01:50:51",
            //探测点
            station: "招远上行",
            //车型
            type: "货车",
            //辆数
            trainNum: 48,
            //轴数
            axleNum: 198,
            //车速
            speed: 44,
            //环温
            ringTemp: 0.7
          }
        ],
        //tab第二页页面中间下面文字数据
        textBox2: {
          //速度
          speed: "37_40_42",
          //接车序号
          number: "#561",
          //左平均温升
          leftAvg: 15.5,
          //右平均温升
          rightAvg: 10.1
        },
        echart: {
          //左轴数据
          left: [24, 25, 17, 54, 34, 25, 12],
          //右轴数据
          right: [25.4, 23.4, 15, 65, 30, 34, 25]
        }
      }
    };
  },
  mounted() {},
  methods: {
    //点击树形控件事件
    handleNodeClick(data) {
      console.log(data.id);
      switch (data.id) {
        case 2:
          alert("羊口上行");
          this.timeLine = this.yangKoUpTimeLine;
          var content = this.yangKoUpTimeLine.activities[9].content;
          if (content == "11186") {
            this.textBox = this.yangkoudata11186.textBox;
            this.textBox.number = this.timeLine.activities.slice(
              (this.currentPage - 1) * this.pagesize,
              this.currentPage * this.pagesize
            )[9].content;
            this.textBox.date = this.timeLine.activities.slice(
              (this.currentPage - 1) * this.pagesize,
              this.currentPage * this.pagesize
            )[9].timestamp;
            this.tableData1 = this.yangkoudata11186.tableData1;
            this.textBox2 = this.yangkoudata11186.textBox2;
            this.tableData2 = this.yangkoudata11186.tableData2;
            this.echart = this.yangkoudata11186.echart;
          }
          break;
        // case 3:
        //   alert("田柳上行");
        //   this.textBox = this.tianliuUp.textBox;
        //   this.tableData1 = this.tianliuUp.tableData1;
        //   this.textBox2 = this.tianliuUp.textBox2;
        //   this.tableData2 = this.tianliuUp.tableData2;
        //   this.echart = this.tianliuUp.echart;
        //   this.timeLine = this.tianliuUp.timeLine;
        //   break;
      }
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
    //选项卡切换事件
    handleClick(tab, event) {
      console.log(tab, event);
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
      //console.log(this.currentPage)  //点击第几页
    },
    //时间树点击事件
    timeLineClick(content) {
      //获取序号
      console.log(content);
      //根据序号查询。。。。。
      if (content == "11177") {
        this.textBox = this.yangkoudata11177.textBox;
        console.log(this.textBox);
        this.tableData1 = this.yangkoudata11177.tableData1;
        this.textBox2 = this.yangkoudata11177.textBox2;
        this.tableData2 = this.yangkoudata11177.tableData2;
        this.echart = this.yangkoudata11177.echart;
      } else if (content == "11186") {
        this.textBox = this.yangkoudata11186.textBox;

        this.tableData1 = this.yangkoudata11186.tableData1;
        this.textBox2 = this.yangkoudata11186.textBox2;
        this.tableData2 = this.yangkoudata11186.tableData2;
        this.echart = this.yangkoudata11186.echart;
      }
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
