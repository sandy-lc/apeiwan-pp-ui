<template>
  <div id="app">
    <pp-full-top-head scroll-bg-color="14,85,99" fixed title="宝石迷踪" :show-share="true"></pp-full-top-head>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(0,0,0)
}
html{
  height: 100%;
}
body{
  margin: 0;
  height: 200%;
  background: pink
}
</style>
