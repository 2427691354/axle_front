<template>
  <div class="TemperatureRiseSearch">
    <!-- 上部 -->
    <div class="top">
      <div class="text">筛选:</div>
      <div class="date">
        <div class="date1">
          <el-date-picker v-model="inputs.startDate" type="date" size="mini"></el-date-picker>
        </div>
        <div class="date2">
          <el-date-picker v-model="inputs.endDate" type="date" size="mini"></el-date-picker>
        </div>
      </div>

      <div class="station">
        <el-cascader
          size="mini"
          placeholder="选择勘探站"
          v-model="inputs.station"
          :options="options"
          @change="stationChange"
        ></el-cascader>
      </div>
      <div class="text">环境温度</div>
      <div class="temp">
        <div class="temp1">
          <el-input-number
            v-model="inputs.temp1"
            controls-position="right"
            @change="tempChange1"
            :min="-50"
            :max="50"
            :precision="2"
            size="mini"
            style="width:100%"
          ></el-input-number>
        </div>
        <div class="text">--</div>
        <div class="temp2">
          <el-input-number
            v-model="inputs.temp2"
            controls-position="right"
            @change="tempChange2"
            :min="-50"
            :max="50"
            :precision="2"
            size="mini"
            style="width:100%"
          ></el-input-number>
        </div>
      </div>
      <div class="text2">
        排序
        <br />（↓）
      </div>
      <div class="radio">
        <div class="radio1">
          <el-radio v-model="inputs.radio" label="left">左温升</el-radio>
        </div>
        <div class="radio2">
          <el-radio v-model="inputs.radio" label="right">右温升</el-radio>
        </div>
      </div>
    </div>
    <!-- 下部 -->
    <div class="table">
      <!-- 表格主体 -->
      <div class="tableBody">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          height="18rem"
        >
          <el-table-column label="过车时间" prop="passingTime" width="160%"></el-table-column>
          <el-table-column label="车号" prop="number"></el-table-column>
          <el-table-column label="轴位" prop="position"></el-table-column>
          <el-table-column label="左温度" prop="leftTemp"></el-table-column>
          <el-table-column label="左温升" prop="leftRise"></el-table-column>
          <el-table-column label="右温度" prop="rightTemp"></el-table-column>
          <el-table-column label="右温升" prop="rightRise"></el-table-column>
          <el-table-column label="环温" prop="ringTemp"></el-table-column>
          <el-table-column label="探测站" prop="station"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
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
</template>
<script>
export default {
  data() {
    return {
      inputs: {
        //开始日期
        startDate: "",
        //结束日期
        endDate: "",
        //勘测站选中值
        station: [],
        //温度
        temp1: -50,
        temp2: 50,
        //单选按钮
        radio: "left"
      },

      //勘测站选项
      options: [
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
      //温度
      temp1: -50,
      temp2: 50,

      //表格数据
      tableData: [
        {
          id: 1,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 2,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 3,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 4,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 5,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 6,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 7,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 8,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 9,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 10,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        },
        {
          id: 11,
          //过车时间
          passingTime: "2020-02-01 18:12:13",
          //车号
          number: "07557",
          //轴位
          position: "3",
          //左温度
          leftTemp: 55.5,
          //左温升
          leftRise: 44.9,
          //右温度
          rightTemp: 49.9,
          //右温升
          rightRise: 39.3,
          //环温
          ringTemp: "10.3 ℃",
          //探测站
          station: "田柳上行"
        }
      ],
      currentPage: 1, //初始页
      pagesize: 10 //    每页的数据
    };
  },
  mounted() {},
  watch: {
    inputs: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log(
          oldVal.startDate,
          oldVal.endDate,
          oldVal.station[0],
          oldVal.temp1,
          oldVal.temp2,
          oldVal.radio
        ); //但是这两个值打印出来却都是一样的
      },
      deep: true
    }
  },
  methods: {
    //勘探站选择更改
    stationChange(value) {
      console.log(value);
    },
    //温度1更改
    tempChange1(value) {
      console.log(value);
    },
    //温度2更改
    tempChange2(value) {
      console.log(value);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //console.log(this.currentPage)  //点击第几页
    }
  }
};
</script>
<style lang="less" scoped>
.top,
.table {
  background-color: #fff;
  box-shadow: 1px 1px 2px 2px #e8e8e8;
}
.top {
  height: 2rem;
  margin-bottom: 0.45rem;

  .text,
  .text2,
  .date,
  .station,
  .temp,
  .radio {
    float: left;
    height: 1rem;
    margin: 0.5rem 0;
  }
  .text {
    width: 4%;
    height: 0.8rem;
    font-size: 0.5rem;
    padding: 0.1rem;
    color: #036fb8;
    text-align: left;
  }
  .date {
    width: 23%;

    float: left;
    margin-top: 0.2rem;
    .date1,
    .date2 {
      width: 42%;
      height: 1rem;
      float: left;
    }
    .date1 {
      margin-right: 4%;
    }
  }
  .station {
    width: 12%;
    margin-right: 2%;
    margin-top: 0.2rem;
  }
  .temp {
    width: 18%;
    margin-left: 1%;
    margin-top: 0.2rem;
    .temp1,
    .temp2 {
      width: 38%;
      height: 1rem;
      float: left;
    }
    .text {
      width: 5%;
      height: 0.8rem;
      margin: 0;
      float: left;
      margin-top: 0.3rem;
      text-align: center;
    }
  }
  .text2 {
    width: 3%;
    height: 0.8rem;
    font-size: 0.5rem;
    padding: 0.1rem;
    margin-top: 0.2rem;
    color: #036fb8;
    text-align: center;
  }
  .radio {
    width: 15%;
    margin-top: 0.4rem;
    .radio1,
    .radio2 {
      width: 48%;
      height: 1rem;
      float: left;
    }
  }
}
.table {
  height: 26rem;
  .tableBody {
    width: 100%;
    height: 18rem;
    margin-bottom: 5.5rem;
  }
}
</style>
