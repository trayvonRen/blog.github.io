<template>
  <div class="wrapper">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :unique-opened="true"
      active-text-color="#ffd04b">
        <el-menu-item :route="{path: '/index/allTeachers'}" index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">所有教师</span>
        </el-menu-item>

        <el-menu-item :route="{path: '/index/allInstitutions'}" index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">所有机构</span>
        </el-menu-item>

        <el-menu-item :route="{path: '/index/course'}" index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">活动课程</span>
        </el-menu-item>

        <el-menu-item :route="{path: '/index/InOrder'}" index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">课程购买记录</span>
        </el-menu-item>
        <el-menu-item :route="{path: '/index/allSuggestions'}" index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">用户反馈记录</span>
        </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper {
    overflow: hidden!important;
    width: 200px;
}
</style>
