<template>
  <div class="VehicleTempRiseReminder">
    <!-- 搜索框等 -->
    <div class="search_4">
      <span>温升阈值</span>
      <div class="tem">
        <el-input v-model="input_1" placeholder="请输入内容"></el-input>
      </div>
      <span>达到次数</span>
      <div class="nums">
        <el-input v-model="input_2" placeholder="请输入内容"></el-input>
      </div>
      <div class="bot_3">
        <el-button type="danger" round>搜索</el-button>
      </div>
      <div class="select_1">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 主体 -->
    <div class="content_2">
      <!-- 表格 -->
      <div class="table_4">
        <el-table :data="tableData" height="50%" border style="width: 100%">
          <el-table-column prop="carnumber" label="车厢编号"></el-table-column>
        </el-table>
      </div>
      <!-- 折现图 -->
      <div class="lineChart_1"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input_1: "40",
      input_2: "2",
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
      value: "",
      tableData: [
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        },
        {
          carnumber: "211131"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.VehicleTempRiseReminder {
  width: 96%;
  transform: translate(2%, 0);
}
.search_4 {
  height: 2rem;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  //   margin-top: -1%;
  span {
    width: 10%;
    height: inherit;
    font-size: 0.5rem;
    padding-top: 1.5%;
    padding-left: 1%;
    float: left;
  }

  .tem {
    width: 10%;
    padding-top: 0.6%;
    margin-left: -2%;
    float: left;
  }
  .nums {
    width: 10%;
    padding-top: 0.6%;
    margin-left: -2%;
    float: left;
  }

  .bot_3 {
    width: 6%;
    padding-top: 0.6%;
    margin-left: 2%;
    float: left;
  }
  .select_1 {
    width: 20%;
    padding-top: 0.6%;
    margin-left: 2%;
    float: left;
  }
}
.content_2 {
  height: 22rem;
  margin-top: 0.8%;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .table_4 {
    width: 20%;
    height: inherit;
    position: absolute;
    // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  }
  .lineChart_1 {
    width: 80%;
    height: inherit;
    box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
    margin-left: 20%;
    position: absolute;
  }
}
</style>