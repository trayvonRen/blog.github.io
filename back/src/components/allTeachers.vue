<template>
  <div>
    <el-button
      class="addTeacher"
      type="primary"
      @click="dialogFormVisible = true"
    >添加老师</el-button>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="老师姓名">
          <el-input v-model="formLabelAlign.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="老师介绍">
          <el-input v-model="formLabelAlign.introduction"></el-input>
        </el-form-item>
        <el-form-item label="老师电话">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="教育机构">
          <el-select
            v-model="formLabelAlign.institutionId"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addTeacher"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="allTeachersList"
      style="width: 100%"
    >

      <el-table-column
        label="老师姓名"
        prop="teacherName"
      ></el-table-column>
      <el-table-column
        label="老师介绍"
        prop="introduction"
      ></el-table-column>
      <el-table-column
        label="老师电话"
        prop="phone"
      ></el-table-column>

      <el-table-column
        label="操作"
        prop="leader"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="detail(scope.row)"
          >查看所在机构</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delete1(scope.row)"
          >删除老师</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="openModifyTeacher(scope.row)"
          >修改老师</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign2"
      >
        <el-form-item label="老师姓名">
          <el-input v-model="formLabelAlign2.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="老师介绍">
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
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      // allTeachersList: [],
      formLabelAlign: {
        institutionId: '',
        introduction: '',
        teacherName: '',
        phone: ''
      },
      formLabelAlign2: {
        institutionId: '',
        introduction: '',
        teacherName: '',
        phone: ''
      }
    }
  },
  mounted() {
    // this.$axios.get('Colorfullcloud/backStageManager/allTeachers')
    //   .then(res => {
    //     this.allTeachersList = res.data.object
    //   })
  },
  methods: {
    openModifyTeacher(e) {
      // console.log(e)
      this.dialogFormVisible2 = true
      this.formLabelAlign2 = e
    },
    modifyTeacher() {
      // this.dialogFormVisible2 = false
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/modifyTeacher',
          this.formLabelAlign2
        )
        .then(res => {
          this.$store.commit('changeTeachersList', res.data.object)
          alert('上传成功')
        })
      this.dialogFormVisible2 = false
    },
    delete1(e) {
      this.$confirm('此操作将永久删除该老师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete('Colorfullcloud/backStageManager/deleteTeachers', {
              data: [e.teacherId]
            })
            .then(res => {
              alert('删除成功！')
              this.$store.commit('changeTeachersList', res.data.object)
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
    detail(e) {
      this.$router.push({ path: `/index/detail/${e.institutionId}` })
    },
    addTeacher() {
      this.dialogFormVisible = false
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/createTeacher',
          this.formLabelAlign
        )
        .then(res => {
          this.$store.commit('changeTeachersList', res.data.object)
        })
      // console.log(this.formLabelAlign)
    }
  },
  computed: {
    allInstitutionsList() {
      return this.$store.state.allInstitutionsList
    },
    allTeachersList() {
      return this.$store.state.allTeachersList
    }
  }
}
</script>

<style scoped>
.addTeacher {
  margin: 10px;
}
</style>
