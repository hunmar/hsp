<template>
  <div id="app">
    <colors></colors>
  </div>
</template>

<script>
import Colors from "./components/Colors";

export default {
  name: "app",
  components: {
    Colors
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
