<template>
  <div class="index">
    <!-- <h1>我是首页</h1> -->
    <!-- 上部 -->
    <div class="topBox">
      <!-- 左边 -->
      <div class="left"></div>
      <!-- 右边 -->
      <div class="right">
        <!-- 右边小盒子 -->
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#30d2e7">
            <img
              src="../assets/icon/icon1.png"
              style="width:45%;height:1rem;padding-top: 0.3rem;"
              alt
            />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.stationNum}}</strong>
            </div>
            <div class="type">站点数</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#fa6b9b">
            <img src="../assets/icon/icon2.png" alt />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.trainNum}}</strong>
            </div>
            <div class="type">车次数</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#6b5cb7">
            <img src="../assets/icon/icon3.png" style="width:66%;height:1rem" alt />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.total}}</strong>
            </div>
            <div class="type">总列数</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#ff9f20">
            <img
              src="../assets/icon/icon4.png"
              style="width:48%;height:1rem;padding-top: 0.3rem;"
              alt
            />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.quantityNum}}</strong>
            </div>
            <div class="type">总数量</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#30d2e7">
            <img src="../assets/icon/icon5.png" alt />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.axleNum}}</strong>
            </div>
            <div class="type">总轴数</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
        <div class="littleBox">
          <!-- 图标 -->
          <div class="icon" style="background:#fa6b9b">
            <img src="../assets/icon/icon6.png" style="width:30%" alt />
          </div>
          <!-- 文字 -->
          <div class="text">
            <div class="num">
              <strong>{{this.thermalAxisNum}}</strong>
            </div>
            <div class="type">热轴数</div>
          </div>
          <!-- 箭头 -->
          <div class="arrow">
            <img src="../assets/icon/arrow.png" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 下部 -->
    <div class="bottomBox">
      <!-- 标题 -->
      <div class="title">
        <strong>本月热轴警报信息</strong>
      </div>
      <!-- 表格 -->
      <div class="table">
        <!-- 表格主体 -->
        <div class="tableBody">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            height="11.24rem"
            row-key="id"
            :expand-row-keys="expands"
            @row-click="rowClick"
          >
            <el-table-column width="20%" type="expand">
              <template slot-scope="props" style="padding:0">
                <table class="detail" style="width:100%;font-size: 0.43rem;" cellspacing="0">
                  <tr v-for="item in props.row.detail" :key="item.num" style="text-align: center;">
                    <td style="width:1.5%;text-align: center;"></td>
                    <td style="width:2%;text-align: center;">{{item.num}}</td>
                    <td style="width:12%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">探测</div>
                      <div style="width:65%;float:left;text-align: left">{{item.probe}}</div>
                    </td>
                    <td style="width:12%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">轴位</div>
                      <div style="width:65%;float:left;text-align: left">{{item.position}}</div>
                    </td>
                    <td style="width:12%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">温度</div>
                      <div style="width:65%;float:left;text-align: left">{{item.temp}}</div>
                    </td>
                    <td style="width:12%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">温升</div>
                      <div style="width:65%;float:left;text-align: left">{{item.tempRise}}</div>
                    </td>
                    <td style="width:12%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">报警</div>
                      <div style="width:65%;float:left;text-align: left">{{item.warning}}</div>
                    </td>
                    <td style="width:8%;">
                      <div style="width:35%;float:left;text-align: center;color:#224d9a">车号</div>
                      <div style="width:65%;float:left;text-align: left">{{item.trainId}}</div>
                    </td>
                  </tr>
                </table>
              </template>
            </el-table-column>
            <el-table-column label="明细" prop="det" width="30%"></el-table-column>
            <el-table-column label="过车时间" prop="passingTime" width="150%"></el-table-column>
            <el-table-column label="参测点" prop="referenceAddress"></el-table-column>
            <el-table-column label="序号（车号）" prop="number"></el-table-column>
            <el-table-column label="车型" prop="type"></el-table-column>
            <el-table-column label="辆数" prop="trainNum"></el-table-column>
            <el-table-column label="轴数" prop="axleNum"></el-table-column>
            <el-table-column label="车速" prop="speed"></el-table-column>
            <el-table-column label="环温" prop="ringTemp"></el-table-column>
            <el-table-column label="左平均温升" prop="leftAvg"></el-table-column>
            <el-table-column label="右平均温升" prop="rightAvg"></el-table-column>
            <el-table-column label="警报信息" prop="alertMsg"></el-table-column>
          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="page">
          <div class="pageInfo">
            <span>显示第{{this.pagesize*(this.currentPage-1)+1}}到第{{this.currentPage*this.pagesize}}条记录，总共{{this.tableData.length}}条记录</span>
          </div>
          <div class="pagination" align="right">
            <el-pagination layout="prev, pager, next" 
            :total="tableData.length"
            :current-page="currentPage"
            :page-size="pagesize"
            @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      //站点数
      stationNum: 8,
      //车次数
      trainNum: 745470,
      //总列数
      total: 1585470,
      //总数量
      quantityNum: 1585470,
      //总轴数
      axleNum: 98541272,
      //热轴数
      thermalAxisNum: 5,

      //表格数据
      tableData: [
        {
          id:1,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:2,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:3,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
       
        {
          id:4,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:5,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:6,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:7,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:8,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:9,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:10,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:11,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:12,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:13,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:14,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:15,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },
        {
          id:16,
          //明细
          det: "序号",
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //参测点
          referenceAddress: "田柳上行",
          //序号
          number: "07557",
          //车型
          type: "货车",
          //辆数
          trainNum: "56辆",
          //轴数
          axleNum: "230轴",
          //车速
          speed: "46km/h",
          //环温
          ringTemp: "40.3 ℃",
          //左平均温升
          leftAvg: "40.3℃",
          //右平均温升
          rightAvg: "40.3℃",
          //警报信息
          alertMsg: "微热",
          detail: [
            {
              //序号
              num: 1,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 2,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 3,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 4,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            },
            {
              //序号
              num: 5,
              // 探测
              probe: "下探",
              //轴位
              position: "0辆左4",
              //温度
              temp: 157.8,
              //温升
              tempRise: 140.3,
              //报警
              warning: "散热",
              //车号
              trainId: "C64T 4904455"
            }
          ]
        },

      ],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据

      
      expands: []// 要展开的行，数值的元素是row的key值
    };
  },
  methods:{
    handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                //console.log(this.currentPage)  //点击第几页
        },
     //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="id"
            rowClick(row) {
              // console.log(row.id)
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.id) < 0) {
                    this.expands.push(row.id);
                } else {
                    this.expands.remove(row.id);
                }
 
            }
  }
};
</script>
<style lang="less" scoped>
.topBox {
  height: 15rem;
  .left {
    width: 77.7%;
    height: 14.5rem;
    margin: 0 1% 0 0.5%;
    float: left;
    background: url('../assets/img/indexLine.jpg') no-repeat;
    background-size: 100% 100%;
    box-shadow: 1px 1px 4px 2px #e8e8e8;
  }
  .right {
    width: 20%;
    height: 14.5rem;
    float: left;
    .littleBox {
      height: 2.15rem;
      background-color: #fff;
      box-shadow: 1px 1px 4px 2px #e8e8e8;
      .icon {
        width: 16%;
        height: 1.65rem;
        margin: 0.2rem 7%;
        float: left;
        border-radius: 2rem;
        img {
          padding-top: 0.2rem;
          width: 58%;
          height: 1.1rem;
        }
      }

      .text {
        width: 43%;
        height: 2.15rem;
        float: left;
        text-align: left;
        .num {
          height: 0.75rem;
          font-size: 0.65rem;
          padding-top: 0.4rem;
        }
        .type {
          height: 0.85rem;
          font-size: 0.5rem;
        }
      }
      .arrow {
        width: 8%;
        height: 0.8rem;
        margin: 0.55rem 3% 0.55rem 8%;
        float: left;
        img {
          width: 0.35rem;
        }
      }
    }
    .littleBox:nth-child(-n + 5) {
      margin-bottom: 0.32rem;
    }
  }
}

.bottomBox {
  height: 15rem;
  margin-bottom: 0.3rem;
  .title {
    height: 0.9rem;
    text-align: left;
    font-size: 0.6rem;
    padding: 0.2rem 0 0.2rem 1%;
    border-top: 3px #018eed solid;
    border-bottom: 1px #dddddd solid;
  }
  .table {
    width: 99%;
    height: 13rem;
    margin: 0.3rem 0.5%;
    .tableBody {
      height: 11.5rem;
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .page {
      height: 1.3rem;
      .pageInfo {
        height: 0.7rem;
        width: 40%;
        font-size: 0.5rem;
        padding: 0.3rem 0;
        text-align: left;
        float: left;
        span {
          background-color: #fff;
        }
      }
     
      .pagination {
        width: 30%;
        height: 1.3rem;
        float: right;
      }
    }
  }
}
</style>
