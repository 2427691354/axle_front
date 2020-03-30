<template>
  <div class="MileageDetails">
    <div class="title">
      <div class="title_1">累计里程查询</div>
    </div>
    <div class="search_6">
      <div class="time_3">
        <div class="date">
          <el-date-picker v-model="starttime" type="date"></el-date-picker>
        </div>
        <div class="text">--</div>
        <div class="date">
          <el-date-picker v-model="endtime" type="date"></el-date-picker>
        </div>
      </div>
      <div class="carnum">
        <el-input v-model="input_1" placeholder="车厢编号"></el-input>
      </div>
      <div class="bot_4">
        <el-button type="danger" round>搜索</el-button>
      </div>
      <span class="demonstration">里程范围</span>
      <div class="block">
        <el-slider v-model="value3" :step="1000" :max="20000" show-stops range :marks="marks"></el-slider>
      </div>
    </div>
    <div class="content_3">
      <div class="table_5">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          height="21rem"
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
          :total="60"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        ></el-pagination>
        <span>共112条</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      tableData: [
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        },
        {
          car: "C64",
          number: "0089002",
          total: "9633"
        }
      ],
      currentPage: 1,
      pagesize: 13,
      starttime:'',
      endtime:'',
      value3:'',
      input_1:'1233'
    };
  },
  mounted(){
    this.carsort();
  },
  methods: {
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
      this.$router.push("/accumulatedMileageQuery");
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
    carsort(){
      var cx = this.$router.params.carname;
      console.log(cx)
      var self = this;
      self.$http
      .get(this.baseUrl+"/findByCxOrCh",{
        params:{
          clxx_cx:cx
        }
      })
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
.search_6 {
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
    margin-left: 2%;
    .date {
      width: 30%;
      height: 1rem;
      float: left;
    }
    .text {
      width: 4%;
      float: left;
      height: 2rem;
      text-align: center;
      font-size: 0.5rem;
      color: #036fb8;
    }
  }
  .carnum {
    width: 15%;
    line-height: 2.3rem;
    margin-left: -12%;
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
  height: 25.5rem;
  width: 98%;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .table_5 {
    width: 98%;
    transform: translate(1%, 0);
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