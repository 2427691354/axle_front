<template>
  <div class="hotshaftwarning">
    <div class="title">
      <div class="title_1">历史热轴报警</div>
    </div>
    <div class="search">
      <div class="time">
        <span>起止时间</span>
        <div class="date">
          <!-- value-formatr日期格式转换，省略则在选择新的日期时会报错 -->
          <el-date-picker v-model="inputs.value1" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="inputs.value2" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </div>
      <div class="station">
        <el-cascader
          v-model="inputs.station"
          placeholder="选择探测站"
          :options="treeData"
          filterable
         @change="stationChange"
        ></el-cascader>
      </div>
      <div class="state">
        <div class="wei">
          <el-checkbox label="微热"></el-checkbox>
        </div>
        <div class="qiang">
          <el-checkbox label="强热"></el-checkbox>
        </div>
        <div class="ji">
          <el-checkbox label="激热"></el-checkbox>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="table_1">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          row-key="id"
          :expand-row-keys="expands"
          @row-click="rowClick"
          height="89%"
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
          <el-table-column prop="det" label="明细" width="50%"></el-table-column>
          <el-table-column prop="time" label="过车时间" width="155%"></el-table-column>
          <el-table-column prop="detection" label="探测点"></el-table-column>
          <el-table-column prop="car" label="序号（车号）"></el-table-column>
          <el-table-column prop="type" label="车型"></el-table-column>
          <el-table-column prop="num" label="辆数"></el-table-column>
          <el-table-column prop="axle" label="轴数"></el-table-column>
          <el-table-column prop="speed" label="车速"></el-table-column>
          <el-table-column prop="tem" label="环温"></el-table-column>
          <el-table-column prop="left" label="左平均温升"></el-table-column>
          <el-table-column prop="right" label="右平均温升"></el-table-column>
          <el-table-column prop="info" label="报警信息"></el-table-column>
        </el-table>
        <div class="foot">
          <div class="showinfo">
            <span>显示第{{currentPage}}到第{{pagesize}}条记录，总共{{tableData.length}}条记录</span>
          </div>
          <div class="pages">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="this.tableData.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      //勘测站选项
      treeData: [
        {
          value: "所有勘测站",
          label: "所有勘测站"
        },
        {
          value: "测试线上行",
          label: "测试线上行",
          children: [
            {
              value: "羊口上行",
              label: "羊口上行"
            },
            {
              value: "田柳上行",
              label: "田柳上行"
            },
            {
              value: "华泰上行",
              label: "华泰上行"
            },
            {
              value: "寿光上行",
              label: "寿光上行"
            },
            {
              value: "大家洼上行",
              label: "大家洼上行"
            },
            {
              value: "昌邑上行",
              label: "昌邑上行"
            },
            {
              value: "莱州上行",
              label: "莱州上行"
            },
            {
              value: "招远上行",
              label: "招远上行"
            },
            {
              value: "平度上行",
              label: "平度上行"
            }
          ]
        },
        {
          value: "测试线下行",
          label: "测试线下行",
          children: [
            {
              value: "田柳下行",
              label: "田柳下行"
            },
            {
              value: "华泰下行",
              label: "华泰下行"
            },
            {
              value: "寿光下行",
              label: "寿光下行"
            },
            {
              value: "大家洼下行",
              label: "大家洼下行"
            },
            {
              value: "昌邑下行",
              label: "昌邑下行"
            },
            {
              value: "莱州下行",
              label: "莱州下行"
            },
            {
              value: "招远下行",
              label: "招远下行"
            },
            {
              value: "平度下行",
              label: "平度下行"
            }
          ]
        }
      ],
      inputs: {
        value1: "2018-10-1",
        value2: "2018-10-31",
        //勘测站选中值
        station: []
      },

      checkList: ["微热", "强热"],
      //表格拓展
      expands: [],
      //当前页
      currentPage: 1,
      //每页显示10条
      pagesize: 10,
      // infoList:[]
      tableData: [],
      //探测站编号
      XLList: [],
    };
  },
  created() {},
  mounted() {
    //接口数据
    this.searchInfoAll();
    //用于显示树形控件控件内的当前数据
    this.initTczjd();
  },
  watch: {
    inputs: {
      //深度监听，可监听到对象、数组的变化
      handler(oldVal) {
        console.log(oldVal.station[1]);
        if (oldVal.station[1] == undefined) {
          this.searchInfoAll();
        } else {
          this.searchInfo();
        }
        // console.log(this.inputs.station);
        // console.log(this.inputs.value1);
        // console.log(this.inputs.value2);
      },
      deep: true
    }
  },
  methods: {
    //勘探站选择更改
    stationChange(value) {
      console.log(value);
    },
    //点击表格展开
    rowClick(row) {
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
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.currentPage = 1;
      console.log(this.pagesize); //每页下拉显示数据
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
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
    //为树形控件个元素提供tczjd,并默认显示昌邑上行数据
    initTczjd() {
      var self = this;
      self.$http.get(this.baseUrl + "/XLList").then(function(response) {
        var res = response.data;
        self.XLList = res;
        // console.log(res);
        // console.log(self.treeData[1].children[0].label);
        // console.log(res[0].sx[0].tczMc);
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < res[0].sx.length; j++) {
            // console.log(self.treeData[1].children[0]);
            if (res[0].sx[j].tczMc == self.treeData[1].children[i].label) {
              self.treeData[1].children[i].value = res[0].sx[j].tczJd;

            }
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < res[0].xx.length; y++) {
            if (res[0].xx[y].tczMc == self.treeData[2].children[x].label) {
              self.treeData[2].children[x].value = res[0].xx[y].tczJd;
            }
          }
        }
        

      });
    },
    searchInfoAll() {
      var self = this;
      // console.log(this.inputs.value1);
      // console.log(this.inputs.value2);
      self.$http
        .get(
          this.baseUrl +
            "/recentListHis?start=" +
            self.inputs.value1 +
            "&end=" +
            self.inputs.value2
        )
        .then(function(response) {
          var res = response.data;
          // console.log(res);
          //清空数据（若当前时间没有数据则需要清空，不然会继续push上条数据）
          self.tableData = [];
          for (var i = 0; i < res.length; i++) {
            //判断车型
            if (res[i].LCXX_KH == 72) {
              res[i].LCXX_KH = "货车";
            } else if (res[i].LCXX_KH == 74) {
              res[i].LCXX_KH = "客车";
            }
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
            
            self.tableData.push({
              det: "序号",
              //过车时间
              time: self.todate(res[i].LCXX_GCSJ),
              //探测点
              detection: res[i].TCZ_MC,
              car:
                res[i].LCXX_HBWJXH > 9999
                  ? res[i].LCXX_HBWJXH
                  : "0" + res[i].LCXX_HBWJXH,
              //车型
              type: res[i].LCXX_KH,
              //辆数
              num: res[i].LCXX_ZLS + "辆",
              //轴数
              axle: res[i].LCXX_ZZS + "轴",
              //车速
              speed: res[i].LCXX_ZGSU + "km/h",
              //环温
              tem: res[i].LCXX_HW + "℃",
              //左平均温升
              left: res[i].LCXX_ZJWS_T1 + "℃",
              //右平均温升
              right: res[i].LCXX_ZJWS_T1 + "℃",
              //报警信息
              info: res[i].LCXX_RZDJ,
              detail: [
                {
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
            });
            console.log(self.tableData);
          }

        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchInfo() {
      var self = this;
      //self.inputs.station[1]取当前选中站点的tczjd(对应序号)
      self.$http
        .get(
          this.baseUrl +
            "/recentListHis?tcz="+self.inputs.station[1]+"&start=" +
            self.inputs.value1 +
            "&end=" +
            self.inputs.value2
        )
        .then(function(response) {
          var res = response.data;
          self.tableData =[];
          for (var i = 0; i < res.length; i++) {
            //判断车型
            if (res[i].LCXX_KH == 72) {
              res[i].LCXX_KH = "货车";
            } else if (res[i].LCXX_KH == 74) {
              res[i].LCXX_KH = "客车";
            }
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
            self.tableData.push({
              id: i + 1,
              det: "序号",
              //过车时间
              time: self.todate(res[i].LCXX_GCSJ),
              //探测点
              detection: res[i].TCZ_MC,
              car:
                res[i].LCXX_HBWJXH > 9999
                  ? res[i].LCXX_HBWJXH
                  : "0" + res[i].LCXX_HBWJXH,
              //车型
              type: res[i].LCXX_KH,
              //辆数
              num: res[i].LCXX_ZLS + "辆",
              //轴数
              axle: res[i].LCXX_ZZS + "轴",
              //车速
              speed: res[i].LCXX_ZGSU + "km/h",
              //环温
              tem: res[i].LCXX_HW + "℃",
              //左平均温升
              left: res[i].LCXX_ZJWS_T1 + "℃",
              //右平均温升
              right: res[i].LCXX_ZJWS_T1 + "℃",
              //报警信息
              info: res[i].LCXX_RZDJ,
              detail: [
                {
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
            });
          }
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
.search {
  width: 98%;
  height: 2.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .time {
    width: 50%;
    height: inherit;
    font-size: 0.5rem;
    color: #9b9b9b;
    float: left;
    line-height: 2.5rem;
    span {
      width: 20%;
      margin-right: 2%;
      float: left;
    }
    .date {
      width: 22%;
      height: 1rem;
      float: left;
    }
    .text {
      width: 2%;
      float: left;
      font-size: 0.5rem;
      color: #036fb8;
    }
  }
  .station {
    width: 15%;
    height: inherit;
    float: left;
    padding-top: 1%;
    margin-left: -8rem;
  }
  .state {
    width: 25%;
    height: inherit;
    float: left;
    line-height: 2.2rem;
    margin-left: -1rem;
    .wei {
      width: 20%;
      float: left;
    }
    .qiang {
      width: 20%;
      float: left;
    }
    .ji {
      width: 20%;
      float: left;
    }
  }
}
.content {
  width: 98%;
  height: 25.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .table_1 {
    height: 21.3rem;
    width: 98%;
    transform: translate(1%, 0);
    padding-top: 1%;
  }
  .foot {
    width: 100%;
    height: 2rem;
    padding-top: 5%;
    .showinfo {
      width: 68%;
      text-align: left;
      position: absolute;
      span {
        font-size: 0.6rem;
        font-weight: 600;
        padding-left: 1%;
      }
    }
    .pages {
      width: 26%;
      position: absolute;
      margin-left: 38rem;
    }
  }
}
</style>