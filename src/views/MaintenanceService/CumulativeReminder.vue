<template>
  <div class="CumulativeReminder">
    <!-- 搜索里程维护阈值 -->
    <div class="search_2">
      <span>修护里程维护阈值</span>
      <div class="box">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="bot_2">
        <el-button type="danger" round>搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table_2">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="车厢编号"></el-table-column>
        <el-table-column prop="mileage" label="累计里程"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <el-button type="text">维护</el-button>
        </el-table-column>
      </el-table>
      <div class="botton_1">
          <el-button type="danger">全部维护</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "3000",
      tableData: [
        {
          number: "0092045",
          mileage: "3000km",
        },
        {
          number: "0092046",
          mileage: "3000km",
        },
        {
          number: "0092050",
          mileage: "3000km",
        },
        {
          number: "0092025",
          mileage: "3000km",
        },
         {
          number: "0092045",
          mileage: "3000km",
        },
        {
          number: "0092046",
          mileage: "3000km",
        },
        {
          number: "0092050",
          mileage: "3000km",
        },
        {
          number: "0092025",
          mileage: "3000km",
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.search_2 {
  width: 96%;
  transform: translate(2%, 0);
  height: 2rem;
  box-shadow: 0px 0px 6px 0px rgba(15, 6, 14, 0.15);
  span {
    width: 10%;
    height: inherit;
    font-size: 0.5rem;
    padding-top: 1.2%;
    padding-left: 2%;
    float: left;
  }
  .box {
    width: 20%;
    padding-top: 0.6%;
    margin-left: -3%;
    float: left;
  }
  .bot_2 {
    width: 6%;
    padding-top: 0.6%;
    float: left;
  }
}
.table_2 {
  width: 96%;
  height: 22rem;
  transform: translate(2%, 0);
  // margin-top: 0.8%;
  .botton_1{
    width: 10%;
    // height: 2rem;
    position: absolute;
    margin-top: 5%;
  }
}
</style>