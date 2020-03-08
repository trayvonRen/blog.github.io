<template>
  <div>
    <el-table
      :data="orderList"
      style="width: 100%"
    >
     <el-table-column
     prop="isActivity"
      >
<template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.isActivity == 1">活动订单</el-tag>
      <el-tag type="success" v-else>普通订单</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="家长姓名"
        prop="buyerName"
      ></el-table-column>
      <el-table-column
        label="孩子姓名"
        prop="children.childrenName"
      ></el-table-column>
      <el-table-column
        label="孩子年级"
        prop="children.grade"
      ></el-table-column>
       <el-table-column
        label="孩子学校"
        prop="children.school"
      ></el-table-column>
      <el-table-column
        label="孩子身份证号"
        prop="children.card"
      ></el-table-column>
      <el-table-column
        label="机构名称"
        prop="institutionName"
      ></el-table-column>
        <el-table-column
        label="购买课程"
        prop="courseName"
      ></el-table-column>
        <el-table-column
        label="课程数量"
        prop="count"
      ></el-table-column>
      <el-table-column
      width="100px"
        label="总课时数"
        prop="cycleNum"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: null
    }
  },
  mounted() {
    this.$axios
      .get(
        'Colorfullcloud/backStageManager/allCoursesInOrders'
      )
      .then(res => {
        this.orderList = res.data.object
      })
  }
}
</script>
