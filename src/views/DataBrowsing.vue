<template>
  <div class="databrowsing">
    <div class="left"></div>
    <div class="center">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="right"></div>
  </div>
</template>
<style lang="less" scoped>
.left,
.center .top,
.center .bottom,
.right {
  background-color: #fff;
  box-shadow: 1px 1px 2px 2px #e8e8e8;
}

.left {
  width: 16.5%;
  height: 28.5rem;
  float: left;
}
.center {
  width: 64%;
  height: 28.5rem;
  margin: 0 1.5%;
  float: left;
  .top {
    height: 3rem;
    width: 100%;
    margin-bottom: 0.7rem;
  }
  .bottom {
    height: 24.8rem;
    width: 100%;
  }
}
.right {
  width: 16.5%;
  height: 28.5rem;
  float: left;
}
</style>
