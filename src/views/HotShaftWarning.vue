<template>
  <div class="hotshaftwarning">
    <div class="title">
      <div class="title_1">历史热轴报警</div>
    </div>
    <div class="search">
      <div class="time">
        <span>起止时间</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="--"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="station">
        <el-select v-model="value1" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="state">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="微热"></el-checkbox>
          <el-checkbox label="强热"></el-checkbox>
          <el-checkbox label="激热"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="content">
      <div class="table_1">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          row-key="detection"
          :expand-row-keys="expands"
          @row-click="rowClick"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form inline class="demo-table-expand">
                <el-form-item>
                  <span>{{ props.row.axle}}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="明细"></el-table-column>
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
      tableData: [
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳上",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳上行",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下行",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳上",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳上行",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下行",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        },
        {
          detail: "序号",
          time: "2016-05-02",
          detection: "田柳下行",
          car: "07557",
          type: "货车",
          num: "56辆",
          axle: "230轴",
          speed: "46Km/h",
          tem: "40.3℃",
          left: "40.3℃",
          right: "40.3℃",
          info: "微热"
        }
      ],
      value: "",
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
      value1: "",
      checkList: ["微热", "强热"],
      expands: [],
      currentPage: 1,
      pagesize: 10
      // infoList:[]
    };
  },
  created() {
    this.handleInfoData();
  },
  methods: {
    rowClick(row) {
      Array.prototype.remove = function(val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      if (this.expands.indexOf(row.detection) < 0) {
        this.expands.push(row.detection);
      } else {
        this.expands.remove(row.detection);
      }
    },
    handleInfoData() {
      this.$http.get("http://localhost:8080/tableData").then(res => {
        //这是从本地请求的数据接口，
        this.tableData = res.body;
      });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.currentPage = 1;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
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
    width: 35%;
    height: inherit;
    font-size: 0.5rem;
    color: #9b9b9b;
    padding-top: 1.3%;
    position: absolute;
    span {
      margin-right: 3%;
    }
  }
  .station {
    width: 20%;
    height: inherit;
    position: absolute;
    padding-left: 28%;
    padding-top: 1%;
  }
  .state {
    width: 30%;
    height: inherit;
    position: absolute;
    padding-left: 38%;
    padding-top: 1.8%;
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
    height: 24rem;
  }
  .foot {
    width: 100%;
    height: 2rem;
    padding-top: 3rem;
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
      margin-left: 74%;
    }
  }
}
</style>
<style>
.el-table th,
.el-table tr,
.el-table td {
  /* background-color: transparent !important; */
  text-align: center !important;
}
.hotshaftwarning .demo-table-expand {
  font-size: 0;
}
.hotshaftwarning .demo-table-expand label {
  width: 50%;
  color: #99a9bf;
}
.hotshaftwarning .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 12%;
}
/* .el-table_1_column_1{
  display: none;
} */
.hotshaftwarning .el-table .cell {
  line-height: inherit !important;
}
</style>