<template>
  <div>
     <el-table
      :data="suggestionList"
      style="width: 100%"
    >

      <el-table-column
        label="用户名"
        prop="nickName"
      ></el-table-column>
      <el-table-column
        label="联系方式"
        prop="phone"
      ></el-table-column>
      <el-table-column
        label="反馈内容"
        prop="introduction"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestionList: null
    }
  },
  mounted() {
    this.$axios
      .get(
        `Colorfullcloud/backStageManager/allSuggestions`
      )
      .then(res => {
        this.suggestionList = res.data.object
        // console.log(this.allCoursesList)
      })
  }
}
</script>
