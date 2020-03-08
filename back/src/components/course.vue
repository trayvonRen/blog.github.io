<template>
  <div>
    <el-button
      class="addCourse"
      type="primary"
      @click="dialogFormVisible = true"
    >添加活动课程</el-button>
    <el-dialog
      title="添加课程"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="课程名">
          <el-input v-model="formLabelAlign.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="formLabelAlign.courseIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="课时数">
          <el-input v-model="formLabelAlign.cycle"></el-input>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input v-model="formLabelAlign.price"></el-input>
        </el-form-item>
         <el-form-item label="课程安排">
          <el-input v-model="formLabelAlign.courseSchedule"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCourse"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="defaultAllProductList"
      style="width: 100%"
    >
      <el-table-column
        label="课程名"
        prop="courseName"
      ></el-table-column>
      <el-table-column
        label="课程介绍"
        prop="courseIntroduction"
      ></el-table-column>
      <el-table-column
        label="价格"
        prop="price"
      ></el-table-column>
  <el-table-column
        label="课时数"
        prop="cycle"
      ></el-table-column>
       <el-table-column
        label="课程安排"
        prop="courseSchedule"
      ></el-table-column>
       <el-table-column
        label="课程图标"
        prop="picture"
        width="180"
      >
        <template slot-scope="scope">
          <img
            class="icon-img"
            :src="scope.row.picture"
            alt
          >
        </template>
      </el-table-column>
      <el-table-column
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delete1(scope.row)"
          >删除课程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign2"
      >
        <el-form-item label="课程名">
          <el-input v-model="formLabelAlign2.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="formLabelAlign2.introduction"></el-input>
        </el-form-item>
        <el-form-item label="老师电话">
          <el-input v-model="formLabelAlign2.phone"></el-input>
        </el-form-item>
        <el-form-item label="教育机构">
          <el-select
            v-model="formLabelAlign2.institutionId"
            placeholder="请选择教育机构"
          >
            <el-option
              v-for="item of allInstitutionsList"
              :key="item.institutionId"
              :label="item.institutionName"
              :value="item.institutionId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="modifyTeacher"
        >确 定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelAlign: {
        courseName: '',
        courseIntroduction: '',
        cycle: '',
        price: '',
        courseSchedule: ''
      }
    }
  },
  mounted() {
    // console.log(this.$store.state.defaultAllProductList)
  },
  methods: {
  //   openModifyTeacher(e) {
  //     // console.log(e)
  //     this.dialogFormVisible2 = true
  //     this.formLabelAlign2 = e
  //   },
  //   modifyTeacher() {
  //     // this.dialogFormVisible2 = false
  //     this.$axios
  //       .post(
  //         'Colorfullcloud/backStageManager/modifyTeacher',
  //         this.formLabelAlign2
  //       )
  //       .then(res => {
  //         this.$store.commit('changeTeachersList', res.data.object)
  //         alert('上传成功')
  //       })
  //     this.dialogFormVisible2 = false
  //   },
    delete1(e) {
      console.log(e)
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete(
              `Colorfullcloud/backStageManager/deleteCourses?institutionId=0`,
              {
                data: [e.courseId]
              }
            )
            .then(res => {
              alert('删除成功')
              this.$axios.get('Colorfullcloud/product/defaultAllProduct').then(res => {
                this.$store.commit('changeDefaultAllProductList', res.data.object)
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      // console.log(e)
    },
    addCourse() {
      console.log(this.formLabelAlign)
      this.dialogFormVisible = false
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/createActivityCourse',
          this.formLabelAlign
        )
        .then(res => {
          this.$axios.get('Colorfullcloud/product/defaultAllProduct').then(res => {
            this.$store.commit('changeDefaultAllProductList', res.data.object)
          })
        })
      // console.log(this.formLabelAlign)
    }
  // computed: {
  //   allInstitutionsList() {
  //     return this.$store.state.allInstitutionsList
  //   },
  //   allTeachersList() {
  //     return this.$store.state.allTeachersList
  //   }
  // }
  },
  computed: {
    defaultAllProductList() {
      return this.$store.state.defaultAllProductList
    }
    // allTeachersList() {
    //   return this.$store.state.allTeachersList
    // }
  }
}
</script>

<style scoped>
.addCourse {
  margin: 10px;
}

.icon-img {
  width: 50px;
}

</style>
