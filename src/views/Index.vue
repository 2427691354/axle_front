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
                    <td style="width:1%;text-align: center;"></td>
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
            <el-table-column label="明细" prop="det" width="30%">序号</el-table-column>
            <el-table-column label="过车时间" prop="LCXX_GCSJ" width="150%"></el-table-column>
            <el-table-column label="参测点" prop="TCZ_MC"></el-table-column>
            <el-table-column label="序号（车号）" prop="LCXX_HBWJXH"></el-table-column>
            <el-table-column label="车型" prop="LCXX_KH"></el-table-column>
            <el-table-column label="辆数" prop="LCXX_ZLS"></el-table-column>
            <el-table-column label="轴数" prop="LCXX_ZZS"></el-table-column>
            <el-table-column label="车速" prop="LCXX_PJSU"></el-table-column>
            <el-table-column label="环温" prop="LCXX_HW"></el-table-column>
            <el-table-column label="左平均温升" prop="LCXX_ZJWS_T1"></el-table-column>
            <el-table-column label="右平均温升" prop="LCXX_YJWS_T1"></el-table-column>
            <el-table-column label="警报信息" prop="LCXX_RZDJ"></el-table-column>
          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="page">
          <div class="pageInfo">
            <span>显示第{{this.pagesize*(this.currentPage-1)+1}}到第{{this.currentPage*this.pagesize}}条记录，总共{{this.tableData.length}}条记录</span>
          </div>
          <div class="pagination" align="right">
            <el-pagination
              layout="prev, pager, next"
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
      tableData: [],
      //模拟表格下拉数据
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
          position: "0辆左5",
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
          position: "0辆左6",
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
          position: "1辆左1",
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
          position: "1辆左3",
          //温度
          temp: 157.8,
          //温升
          tempRise: 140.3,
          //报警
          warning: "散热",
          //车号
          trainId: "C64T 4904455"
        }
      ],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据

      expands: [] // 要展开的行，数值的元素是row的key值
    };
  },
  mounted() {
    this.getStatic();
    this.getTable();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //console.log(this.currentPage)  //点击第几页
    },
    //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="id"
    rowClick(row) {
      // console.log(row.id)
      Array.prototype.remove = function(val) {
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
    },
    getStatic() {
      var self = this;
      self.$http
        .get(this.baseUrl + "/indexStatistics")
        .then(function(response) {
          var res = response.data;
          self.quantityNum = res.zls;
          self.axleNum = res.zzs;
          self.thermalAxisNum = res.hotTRANK;
          self.trainNum = res.traceNum;
          self.total = res.zlies;
          // console.log(res)
        });
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
    getTable() {
      var self = this;
      self.$http
        .get(this.baseUrl + "/recentList?size=10")
        .then(function(response) {
          var res = response.data;
          for (var i = 0; i < res.length; i++) {
            //过车时间转化日期格式
            res[i].LCXX_GCSJ = self.todate(res[i].LCXX_GCSJ);
            //序号不满五位前面加0
            res[i].LCXX_HBWJXH =
              res[i].LCXX_HBWJXH > 9999
                ? res[i].LCXX_HBWJXH
                : "0" + res[i].LCXX_HBWJXH;
            //判断车型
            if (res[i].LCXX_KH == 72) {
              res[i].LCXX_KH = "货车";
            } else if (res[i].LCXX_KH == 74) {
              res[i].LCXX_KH = "客车";
            }
            //辆数加单位
            res[i].LCXX_ZLS += "辆";
            //轴数加单位
            res[i].LCXX_ZZS += "轴";
            //速度加单位
            res[i].LCXX_PJSU += "km/h";
            //环温加单位
            res[i].LCXX_HW += " ℃";
            //左温升加单位
            res[i].LCXX_ZJWS_T1 += " ℃";
            //右温升加单位
            res[i].LCXX_YJWS_T1 += " ℃";
            //判断警报
            switch (res[i].LCXX_RZDJ) {
              case 0:
                res[i].LCXX_RZDJ = "正常";
                break;
              case 1:
                res[i].LCXX_RZDJ = "激热";
                break;
              case 2:
                res[i].LCXX_RZDJ = "强热";
                break;
              case 3:
                res[i].LCXX_RZDJ = "微热";
                break;
            }
            //添加模拟表格下拉数据
            res[i].detail = self.detail;
          }
          self.tableData = res;

          console.log(self.tableData);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.topBox {
  height: 15rem;
  margin: 0.5%;
  .left {
    width: 77.7%;
    height: 14.5rem;
    margin: 0 1% 0 0.5%;
    float: left;
    background: url("../assets/img/indexLine.jpg") no-repeat;
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
    width: 98%;
    height: 13rem;
    margin: 0.3rem 1%;

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
