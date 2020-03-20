<template>
  <div class="hotshaftwarning">
    <div class="title">
      <div class="title_1">历史热轴报警</div>
    </div>
    <div class="search">
      <div class="time">
        <!-- <p>起止时间</p> -->
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
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
          :data="tableData"
          style="width: 100%;"
          row-key="detection"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="detail" label="明细"></el-table-column>
          <el-table-column prop="time" label="过车时间" width="100"></el-table-column>
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
          detection: "田柳行",
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
          info: "微热",
          children: [
            {
              detail: "1",
              time: "探测 下探",
              detection: "",
              car: "轴位 0辆左4",
              type: "",
              num: "温度 157.8",
              axle: "",
              speed: "温升 140.3",
              tem: "",
              left: "报警 微热",
              right: "",
              info: "车号 C64T 4904455"
            },
            {
              detail: "2",
              time: "探测 下探",
              detection: "",
              car: "轴位 0辆左4",
              type: "",
              num: "温度 157.8",
              axle: "",
              speed: "温升 140.3",
              tem: "",
              left: "报警 微热",
              right: "",
              info: "车号 C64T 4904455"
            }
          ]
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
      checkList: ['微热','强热']
    };
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 1.5rem;
  background-color: #ffffff;
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
  height: 2rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(1%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .time {
    width: 40%;
    height: inherit;
    font-size: 0.5rem;
    color: #9b9b9b;
    padding-top: 0.5%;
    position: absolute;
    p {
      text-align: left;
      // padding-top: 2%;
      padding-left: 5%;
      position: absolute;
    }
  }
  .station {
    width: 20%;
    height: inherit;
    position: absolute;
    padding-left: 32%;
    padding-top: 0.5%;
  }
  .state {
    width: 30%;
    height: inherit;
    position: absolute;
    padding-left: 45%;
    padding-top: 1.3%;
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
    height: inherit;
  }
}
</style>
<style>
.el-table thead {
  color: #000000 !important;
  background-color: #bde5ff !important;
}
/* 设置table header的背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  /* background-color: transparent !important; */
  text-align: center !important;
}
</style>