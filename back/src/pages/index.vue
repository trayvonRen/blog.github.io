<template>
  <div class="wrapper">
    <el-container style="height: 100%">
      <el-aside
        class="el-side"
        width="200px"
      >
        <nav-header></nav-header>
      </el-aside>

      <el-container>
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavHeader from "../components/header";
export default {
  components: {
    NavHeader
  },
  data() {
    return {
      allCategoriesList: []
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.el-side {
  height: 100%;
  background-color: rgb(84, 92, 100);
}

.el-main {
  padding: 0;
}
</style>
