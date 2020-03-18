<template>
  <div id="app">
    <div id="header">
      <span class="title">热轴信息监测平台</span>
      <i class="iconfont icon-caidan1" @click="collapse"></i>
      <!-- <span class="hello">您好，欢迎来到热轴检测平台！</span> -->
      <span class="date"> 2020年03月12日 星期四</span>
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
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/databrowsing">
            <i class="el-icon-menu"></i>
            <span slot="title">数据浏览</span>
          </el-menu-item>
          <el-menu-item index="/hotshaftwarning">
            <i class="el-icon-document"></i>
            <span slot="title">热轴预警</span>
          </el-menu-item>
          <el-menu-item index="/statisticalreports">
            <i class="el-icon-setting"></i>
            <span slot="title">统计报表</span>
          </el-menu-item>
          <el-menu-item index="/maintenanceservices">
            <i class="el-icon-setting"></i>
            <span slot="title">维护服务</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div id="context">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    // 页面初始化时触发
    this.placeholderPic()
  },
  mounted() {
    // 检测屏幕尺寸变化同步font-size
    window.onresize = () => {
      this.placeholderPic()
    }
  },
  methods: {
    // 自适应页面字体大小
    placeholderPic() {
      document.documentElement.style.fontSize =
        document.documentElement.offsetWidth / 60 + 'px'
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    collapse() {
      if (this.isCollapse == true) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
    }
  }
}
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

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    .el-menu-item {
      color: #888f97;
      font-family: SourceHanSansCN-Light;

      i {
        float: left;
        margin-left: 0.4rem;
        font-size: 1rem;
      }

      span {
        float: left;
        margin-left: 0.5rem;
        font-size: 0.5rem;
        line-height: 1rem;
      }
    }

    .el-menu-item [class^='el-icon-'] {
      margin-right: 1rem;
      width: 0px;
    }
    .is-active {
      background-color: #018eed;
      color: #ffffff;
    }
  }
  ul {
    padding-inline-start: 0px;
    margin-block-start: 0em;
    margin-block-end: 0px;
    li {
      height: 2rem;
      padding: 0.5rem !important;
    }
  }
}

#context {
  margin-top: 0.4rem;
  height: 30.3rem;
  margin-left: 0.5rem;
  width: 86%;
  border: 1px solid red;
  float: left;
  box-shadow: 1px 1px 6px 0px rgba(15, 6, 14, 0.15);
}
</style>
