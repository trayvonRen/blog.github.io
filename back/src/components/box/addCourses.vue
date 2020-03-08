<template>
  <div class="wrapper">
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
  <el-form-item label="课程名称">
    <el-input v-model="formLabelAlign.institutionName"></el-input>
  </el-form-item>
  <el-form-item label="课时数">
    <el-input v-model="formLabelAlign.address"></el-input>
  </el-form-item>
  <el-form-item label="课程介绍">
    <el-input v-model="formLabelAlign.leader"></el-input>
  </el-form-item>
  <el-form-item label="机构电话">
    <el-input v-model="formLabelAlign.phone"></el-input>
  </el-form-item>
  <el-form-item label="价格">
    <el-input v-model="formLabelAlign.introduction"></el-input>
  </el-form-item>
  <el-form-item label="课程图标">
    <el-input v-model="formLabelAlign.introduction"></el-input>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        institutionName: '',
        address: '',
        introduction: '',
        leader: '',
        phone: ''
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  /* width: 500px;
  height: 500px; */
}
</style>
