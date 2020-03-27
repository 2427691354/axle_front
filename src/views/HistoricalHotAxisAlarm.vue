<template>
  <div class="hotshaftwarning">
    <div class="title">
      <div class="title_1">历史热轴报警</div>
    </div>
    <div class="search">
      <div class="time">
        <span>起止时间</span>
        <div class="date">
          <el-date-picker v-model="value1" type="date"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="value2" type="date"></el-date-picker>
        </div>
      </div>
      <div class="station">
        <el-cascader placeholder="选择探测站" :options="options" filterable></el-cascader>
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
          <el-table-column prop="det" label="明细"></el-table-column>
          <el-table-column prop="time" label="过车时间"></el-table-column>
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
              :total="50"
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
      options: [
        {
          value: "station",
          label: "所有探测站"
        },
        {
          value: "top",
          label: "测试线上行",
          children: [
            {
              value: "xiangkou",
              label: "羊口上行"
            },
            {
              value: "tianliu",
              label: "田柳上行"
            },
            {
              value: "huatai",
              label: "华泰上行"
            },
            {
              value: "shouguang",
              label: "寿光上行"
            },
            {
              value: "dajiawa",
              label: "大家洼上行"
            },
            {
              value: "changyi",
              label: "昌邑上行"
            },
            {
              value: "laizhou",
              label: "莱州上行"
            },
            {
              value: "zhaoyuan",
              label: "招远上行"
            },
            {
              value: "pingdu",
              label: "平度上行"
            }
          ]
        },
        {
          value: "bottom",
          label: "测试线下行",
          children: [
            {
              value: "xiangkou",
              label: "羊口下行"
            },
            {
              value: "tianliu",
              label: "田柳下行"
            },
            {
              value: "huatai",
              label: "华泰下行"
            },
            {
              value: "shouguang",
              label: "寿光下行"
            },
            {
              value: "dajiawa",
              label: "大家洼下行"
            },
            {
              value: "changyi",
              label: "昌邑下行"
            },
            {
              value: "laizhou",
              label: "莱州下行"
            },
            {
              value: "zhaoyuan",
              label: "招远下行"
            },
            {
              value: "pingdu",
              label: "平度下行"
            }
          ]
        }
      ],
      value1: "2018-10-1",
      value2: "2018-10-31",
      checkList: ["微热", "强热"],
      expands: [],
      currentPage: 1,
      pagesize: 10,
      // infoList:[]
      tableData: []
    };
  },
  created() {
    this.searchInfo();
  },
  methods: {
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
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.currentPage = 1;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    searchInfo() {
      var self = this;
      self.$http
        .get("http://139.196.78.182:8620/recentListHis", {
          params: {
            start: this.value1,
            end: this.value2
          }
        })
        .then(function(response) {
          var res = response.data;
          for (var i = 0; i < res.length; i++) {
            self.tableData.push({
              id: i + 1,
              det: "序号",
              time: res[i].LCXX_BH.slice(0,8),
              detection: res[i].TCZ_MC,
              car: "0" + res[i].LCXX_HBWJXH,
              type: "货车",
              num: res[i].LCXX_ZLS + "辆",
              axle: res[i].LCXX_ZZS + "轴",
              speed: res[i].LCXX_ZGSU + "km/h",
              tem: res[i].LCXX_ZJWS_T1 + "℃",
              left: res[i].LCXX_ZJWS_T1 + "℃",
              right: res[i].LCXX_ZJWS_T1 + "℃",
              info: "微热",
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

          console.log(this.value1);
        
        
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