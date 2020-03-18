<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Test
    </p>
    <span>xx</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
span {
  font-size: 2rem;
}
a {
  color: #42b983;
}
</style>
