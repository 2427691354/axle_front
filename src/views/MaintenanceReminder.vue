<template>
  <div class="MaintenanceReminder">
    <!-- 标题 -->
    <div class="title">
      <div class="title_1">维护提醒</div>
    </div>
    <!-- 主体 -->
    <div class="content_2">
      <!-- 导航栏 -->
      <div class="navs">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/cumulativeReminder">里程提醒</el-menu-item>
          <el-menu-item index="/hotShaftReminder">热轴提醒</el-menu-item>
          <el-menu-item index="/trainNumTempRiseReminder">车次温升提醒</el-menu-item>
          <el-menu-item index="/vehicleTempRiseReminder">车辆温升提醒</el-menu-item>
        </el-menu>
      </div>
      <!-- 内容 -->
      <div class="infos">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "/cumulativeReminder",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
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
.content_2 {
  width: 96%;
  height: 28.5rem;
  background-color: #ffffff;
  margin-top: 0.8%;
  transform: translate(2%, 0);
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  .navs {
    width: 96%;
    height: 2.3rem;
    transform: translate(2%, 0);
  }
  .infos {
    height: 25rem;
    margin-top: 1rem;
    // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
  }
}
</style>