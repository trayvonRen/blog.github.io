<template>
  <div class="wrapper">
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
  <el-form-item label="机构名称">
    <el-input v-model="formLabelAlign.institutionName"></el-input>
  </el-form-item>
  <el-form-item label="机构地址">
    <el-input v-model="formLabelAlign.address"></el-input>
  </el-form-item>
  <el-form-item label="机构领导">
    <el-input v-model="formLabelAlign.leader"></el-input>
  </el-form-item>
  <el-form-item label="机构电话">
    <el-input v-model="formLabelAlign.phone"></el-input>
  </el-form-item>
  <el-form-item label="机构介绍">
    <el-input v-model="formLabelAlign.introduction"></el-input>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
// import store from '../../store/index'
export default {
  // name: 'modify',
  data() {
    return {
      formLabelAlign: {
        institutionName: '',
        address: '',
        introduction: '',
        leader: '',
        phone: ''
      }
    }
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style scoped>
.wrapper {
  /* width: 500px;
  height: 500px; */
}
</style>
