<template>
  <div id="app">
    <div id="header">
      <span class="title">热轴信息监测平台</span>
      <i class="iconfont icon-caidan1" @click="collapse"></i>
      <!-- <span class="hello">您好，欢迎来到热轴检测平台！</span> -->
      <span class="date">2020年03月12日 星期四</span>
    </div>
    <div>
      <div id="nav">
        <el-menu
          :default-active="this.$router.path"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"><span class="iconfont">&#xe600;</span></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/databrowsing">
            <i class="el-icon-menu"><span class="iconfont">&#xe71d;</span></i>
            <span slot="title">数据浏览</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"><span class="iconfont">&#xe662;</span></i>
              <span slot="title">热轴报警</span>
            </template>
            <el-menu-item index="/temperaturerisesearch">
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title" class="subitem">温升查询</span>
            </el-menu-item>
            <el-menu-item index="/historicalHotAxisAlarm">
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title">历史热轴报警</span>
            </el-menu-item>
            <el-menu-item index="/temperatureriseforecast">
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title" class="subitem">温升预测</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/statisticalreports">
            <i class="el-icon-menu"><span class="iconfont">&#xe621;</span></i>
            <span slot="title">统计报表</span>
          </el-menu-item>
        
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"><span class="iconfont">&#xe63b;</span></i>
            <span slot="title">维护服务</span>
            </template>
            <el-menu-item index="/maintenanceReminder">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">维护提醒</span>
            </el-menu-item>
            <el-menu-item index="/accumulatedMileageQuery">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">累计里程提醒</span>
            </el-menu-item>
            <el-menu-item index="/vehicleTemAnaysis">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">车型温升统计分析</span>
            </el-menu-item>
             <el-menu-item index="/axleTemAnaysis">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">车型轴温统计分析</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div v-if="this.$router['app']['_route'].path=='/temperatureriseforecast'">
        <div id="headline">
          <strong>温升预测</strong>
        </div>
        <div id="context1">
          <router-view />
        </div>
      </div>
      <div v-else-if="this.$router['app']['_route'].path=='/temperaturerisesearch'">
        <div id="headline">
          <strong>温升查询</strong>
        </div>
        <div id="context1">
          <router-view />
        </div>
      </div>
      <div v-else-if="this.$router['app']['_route'].path=='/databrowsing'">
        <div id="headline">
          <strong>数据预览</strong>
        </div>
        <div id="context1">
          <router-view />
        </div>
      </div>

      <div id="context" v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    // 页面初始化时触发
    this.placeholderPic();
  },
  mounted() {
    // 检测屏幕尺寸变化同步font-size
    window.onresize = () => {
      this.placeholderPic();
    };
  },
  methods: {
    // 自适应页面字体大小
    placeholderPic() {
      document.documentElement.style.fontSize =
        document.documentElement.offsetWidth / 60 + "px";
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse() {
      if (this.isCollapse == true) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#header {
  height: 2.5rem;
  background-color: #018eed;
  color: #ffffff;
  line-height: 2.5rem;
  font-family: SourceHanSansCN-Regular;

  .title {
    font-size: 0.8rem;
    color: #fffefe;
    margin-left: 0.65rem;
    float: left;
  }

  i {
    margin-left: 0.65rem;
    float: left;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .hello {
    font-size: 0.5rem;
    line-height: 2.7rem;
    margin-left: 0.5rem;
    float: left;
  }
  .date {
    line-height: 2.7rem;
    font-size: 0.5rem;
    margin-right: 0.5rem;
    float: right;
    color: #fffefe;
  }
}

#nav {
  height: 30.5rem;
  padding-top: 0.6rem;
  width: 12%;
  float: left;
  background: #fff;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);

 .el-icon-menu:before{
   content: none;
 }
 el-submenu__title span{
   display: none;
 }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    color: #888f97;
    font-family: SourceHanSansCN-Light;
    padding-left: 0.5 !important;

    i {
      float: left;
      margin: 0 0.4rem;
      font-size: 1rem;
      line-height: 2rem;
    }
    .subitem{
      margin-left: 1.3rem;
    }
    span {
      float: left;
      margin-left: 0.4rem;
      font-size: 0.5rem;
    }

    .el-submenu .el-menu-item {
      padding: 0 0.1rem;
    }
    .el-submenu__icon-arrow {
      position: absolute;
      line-height: 2rem;
      top: 0;
      right: 0.5rem;
      margin-top: 0;
      font-size: 0.5rem;
    }

    .el-menu-item {
      height: 2rem;
      line-height: 2rem;
      min-width: 12%;
    }

    .is-active {
      background-color: #018eed;
      color: #ffffff;
    }
  }
}

#context {
  // margin-top: 0rem;
  height: 30.3rem;
  // margin-left: 0.5rem;
  width: 88%;
  // border: 1px solid red;
  float: left;
  // box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
}

#headline {
  font-size: 0.6rem;
  height: 1rem;
  padding: 0.3rem 13%;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px 2px #e8e8e8;
}
#context1 {
  margin-top: 0.4rem;
  height: 28.9rem;
  margin-left: 0.5rem;
  width: 86%;
  float: left;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
}
</style>
