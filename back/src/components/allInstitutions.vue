<template>
  <div>
    <el-button
      class="addInstitution"
      type="primary"
      @click="open"
    >新建机构</el-button>
    <el-button
      type="primary"
      @click="dialogFormVisible = true"
    >新建科目类别</el-button>

    <el-dialog
      title="新建科目类别"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="类别名称"
          label-width="120px"
        >
          <el-input
            v-model="form.type"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCategories"
        >确 定</el-button>
      </div>

    </el-dialog>
    <el-dropdown>
      <span class="el-dropdown-link">
        所有科目类别<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in allCategoriesList"
          :key="item.categoryId"
        >{{ item.type }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-table
      :data="this.$store.state.allInstitutionsList"
      style="width: 100%"
    >

      <el-table-column
        label="机构名称"
        prop="institutionName"
      ></el-table-column>
      <el-table-column
        label="机构地址"
        prop="address"
      ></el-table-column>
      <el-table-column
        label="机构校长"
        prop="leader"
      ></el-table-column>

      <el-table-column
        label="图标"
        prop="phone"
      >
        <template slot-scope="scope">
          <img
            class="img"
            :src="scope.row.icon"
            alt
          >
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        prop="leader"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="detail(scope.row)"
          >查看详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteInstitutions(scope.row)"
          > 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import addInstitution from './box/addInstitution'
export default {
  data() {
    return {
      form: {
        type: ''
      },

      // allInstitutionsList: [],
      allCategories: [],
      dialogFormVisible: false
    }
  },
  computed: {
    allCategoriesList() {
      return this.$store.state.allCategoriesList
    }
  },
  methods: {
    addCategories() {
      this.$axios
        .post('Colorfullcloud/backStageManager/createCategory', this.form)
        .then(res => {
          alert('创建成功！')
          this.$store.commit('changeCategoriesList', res.data.object)
        })
      this.dialogFormVisible = false
    },

    open() {
      const h = this.$createElement(addInstitution)
      // this.$store.commit('changeModifyInsitution', this.addInstitution)
      // console.log(h)
      this.$msgbox({
        title: '新建机构',
        message: h,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            // console.log(instance.$children[2])
            this.$axios
              .post(
                'Colorfullcloud/backStageManager/createInstitution',
                instance.$children[2].formLabelAlign
              )
              .then(res => {
                // console.log(res)
                // if(res.data.msg === '')
                alert('创建成功！')
                // console.log(res.data.object)
                this.$store.commit('changeInstitutionsList', res.data.object)
                // this.allInstitutionsList = res.data.object
              })
            done()
          } else {
            done()
          }
        }
      })
    },
    detail(e) {
      // console.log(e)
      this.$router.push({ path: `/index/detail/${e.institutionId}` })
    },
    deleteInstitutions(e) {
      console.log(e)
      this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete('Colorfullcloud/backStageManager/deleteInstitution', {
              data: [e.institutionId]
            })
            .then(res => {
              console.log(res)
              this.$store.commit('changeInstitutionsList', res.data.object)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      // console.log(e)

      // console.log(e)
    }
  },
  mounted() {
    this.$axios
      .get('Colorfullcloud/backStageManager/allInstitutions')
      .then(res => {
        this.$store.commit('changeInstitutionsList', res.data.object)
      })
    this.$axios
      .get('Colorfullcloud/backStageManager/allCategories')
      .then(res => {
        this.$store.commit('changeCategoriesList', res.data.object)
      })
    this.$axios.get('Colorfullcloud/backStageManager/allTeachers').then(res => {
      this.$store.commit('changeTeachersList', res.data.object)
    })
    this.$axios.get('Colorfullcloud/product/defaultAllProduct').then(res => {
      this.$store.commit('changeDefaultAllProductList', res.data.object)
    })
  }
}
</script>

<style scoped>
.addInstitution {
  margin: 10px;
}
.img {
  width: 50px;
}

/* .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  } */
</style>
