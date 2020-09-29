<template>
  <Home />
</template>

<script>
import Home from "./pages/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
body {
  font-family: "Noto Sans JP", sans-serif;
  box-sizing: border-box;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
