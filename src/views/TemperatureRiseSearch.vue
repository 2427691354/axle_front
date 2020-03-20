<template>
  <div class="TemperatureRiseSearch">
    <!-- 上部 -->
    <div class="top"></div>
    <!-- 下部 -->
    <div class="table">
      <!-- 表格主体 -->
      <div class="tableBody"></div>
      <!-- 分页 -->
      <div class="pagination"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.top {
  height: 2rem;
  margin-bottom: 0.45rem;
  background-color: #fff;
  box-shadow: 1px 1px 4px 2px #e8e8e8;
  padding-left: 4%;
  
  
}
.table {
  height: 26rem;
  background-color: #fff;
  box-shadow: 1px 1px 2px 2px #e8e8e8;
 
}
</style>
