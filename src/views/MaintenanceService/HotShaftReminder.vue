<template>
  <div class="HotShaftReminder">
    <div class="table_3">
      <el-table :data="tableData" style="width: 100%">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
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
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.HotShaftReminder{
.table_3 {
  width: 96%;
  transform: translate(2%, 0);
}
}

</style>