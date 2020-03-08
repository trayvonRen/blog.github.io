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
   <el-form-item label="教育机构">
    <el-select v-model="a" placeholder="请选择教育机构">
      <el-option v-for="item of allInstitutionsList" :key="item.institutionId" :label="item.institutionName" value="shanghai"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import store from '../../store/index'
export default {
  data () {
    return {
      a: '',
      // allInstitutionsList: [],
      formLabelAlign: {
        institutionName: '',
        address: '',
        introduction: '',
        leader: '',
        phone: ''
      }
    }
  },
  mounted () {
    console.log(store)
  },
  computed: {
    allInstitutionsList () {
      return store.state.allInstitutionsList
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
