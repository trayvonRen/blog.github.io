<template>
  <div>
    <el-breadcrumb
      class="el-icon-arrow-right"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        @click.native="back"
        class="button"
      >返回</el-breadcrumb-item>
      <el-breadcrumb-item>机构介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-divider></el-divider> -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构名称</div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-dark">{{ allInstitution.institutionName }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构地址</div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-dark">{{ allInstitution.address }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构介绍</div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-dark">{{ allInstitution.introduction }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构电话</div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-dark">{{ allInstitution.phone }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构领导</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">{{ allInstitution.leader }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">机构图标</div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="dialogFormVisibleIcon = true"
        >修改机构图标</el-button>
        <el-button
          class="addInstitution"
          type="primary"
          @click="openModifyInstitution"
        >修改机构信息</el-button>
      </el-col>
      <el-col :span="6">
        <img
          class="icon"
          :src="allInstitution.icon"
          alt
        >
      </el-col>
    </el-row>
    <el-dialog
      title="修改机构信息"
      :visible.sync="dialogFormVisible3"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign3"
      >
        <el-form-item label="机构名称">
          <el-input v-model="formLabelAlign3.institutionName"></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input v-model="formLabelAlign3.address"></el-input>
        </el-form-item>
        <el-form-item label="机构领导">
          <el-input v-model="formLabelAlign3.leader"></el-input>
        </el-form-item>
        <el-form-item label="机构电话">
          <el-input v-model="formLabelAlign3.phone"></el-input>
        </el-form-item>
        <el-form-item label="机构介绍">
          <el-input v-model="formLabelAlign3.introduction"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible3= false">取 消</el-button>
        <el-button
          type="primary"
          @click="modifyInstitution"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogFormVisibleIcon"
    >
      <el-form :model="IconForm">
        <el-upload
          :action=" `http://geniusdsy.cn/Colorfullcloud/backStageManager/updateImage?fileType=1&institutionId=${this.allInstitution.institutionId}` "
          list-type="picture-card"
          :on-preview="handleIconCardPreview"
          :on-success="uploadIconSuc"
          :auto-upload="false"
          ref="upload"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt
          >
        </el-dialog>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleIcon = false">取 消</el-button>
        <el-button
          type="primary"
          @click="uploadIcon"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-divider></el-divider>
    <el-table
      :data="allCoursesList"
      style="width: 100%"
    >
      <el-button
        type="primary"
        icon="el-icon-edit"
      ></el-button>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left">
            <el-form-item label="课程介绍">
              <span>{{ scope.row.introduction }}</span>
            </el-form-item>
            <el-form-item label="教师姓名">
              <span>{{ scope.row.teacherIntroduction.teacherName }}</span>
            </el-form-item>
            <el-form-item label="教师电话">
              <span>{{ scope.row.teacherIntroduction.phone }}</span>
            </el-form-item>
            <el-form-item label="教师介绍">
              <span>{{ scope.row.teacherIntroduction.introduction }}</span>
            </el-form-item>
          </el-form>
          <!-- <el-table-column label="教师电话" prop="teacherIntroduction.phone"></el-table-column>
          <el-table-column label="教师介绍" prop="teacherIntroduction.introduction"></el-table-column>-->
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="courseName"
        width="100"
      ></el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        width="100"
      ></el-table-column>
      <el-table-column
        label="简介"
        prop="courseIntroduction"
      ></el-table-column>
      <el-table-column
        label="课程安排"
        prop="courseSchedule"
      ></el-table-column>
      <el-table-column
        label="课时"
        prop="cycle"
        width="100"
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

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini">修改课程图标</el-button> -->
          <el-button
            type="primary"
            size="mini"
            @click="openCourse(scope.row)"
          >修改图标</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="openModfiyCourse(scope.row)"
          >修改信息</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteCourse(scope.row)"
          >删除</el-button>
          <el-dialog
            title="收货地址"
            :visible.sync="dialogFormVisible2"
          >
            <el-form
              label-position="right"
              label-width="80px"
              :model="formLabelAlign2"
            >
              <el-form-item label="课程类别">
                <el-select
                  v-model="formLabelAlign2.categoryId"
                  placeholder="请选择课程类别"
                >
                  <el-option
                    v-for="item of allCategoriesList"
                    :key="item.categoryId"
                    :label="item.type"
                    :value="item.categoryId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="课程名称">
                <el-input v-model="formLabelAlign2.courseName"></el-input>
              </el-form-item>
              <el-form-item label="课时数">
                <el-input v-model="formLabelAlign2.cycle"></el-input>
              </el-form-item>
              <el-form-item label="课程介绍">
                <el-input v-model="formLabelAlign2.courseIntroduction"></el-input>
              </el-form-item>
              <el-form-item label="课程安排">
                <el-input v-model="formLabelAlign2.courseSchedule"></el-input>
              </el-form-item>
              <el-form-item label="课程价格">
                <el-input v-model="formLabelAlign2.price"></el-input>
              </el-form-item>
              <el-form-item label="选择老师">
                <el-select
                  v-model="formLabelAlign2.teacherId"
                  placeholder="请选择老师"
                >
                  <el-option
                    v-for="item of currentTeacherList"
                    :key="item.teacherId"
                    :label="item.teacherName"
                    :value="item.teacherId"
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
                @click="modfiyCourse(scope.row)"
              >确 定</el-button>
            </div>
          </el-dialog>
          <!-- <el-button size="mini" type="danger">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="addCourse"
      type="primary"
      @click="dialogFormVisible = true"
    >新建课程</el-button>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="课程类别">
          <el-select
            v-model="formLabelAlign.categoryId"
            placeholder="请选择课程类别"
          >
            <el-option
              v-for="item of allCategoriesList"
              :key="item.categoryId"
              :label="item.type"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="formLabelAlign.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课时数">
          <el-input v-model="formLabelAlign.cycle"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="formLabelAlign.courseIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="课程安排">
          <el-input v-model="formLabelAlign.courseSchedule"></el-input>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input v-model="formLabelAlign.price"></el-input>
        </el-form-item>
        <el-form-item label="选择老师">
          <el-select
            v-model="formLabelAlign.teacherId"
            placeholder="请选择老师"
          >
            <el-option
              v-for="item of currentTeacherList"
              :key="item.teacherId"
              :label="item.teacherName"
              :value="item.teacherId"
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
          @click="addCourse"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-divider></el-divider>

    <div class="nav-title">机构图片</div>
    <el-carousel
      class="carousel"
      indicator-position="outside"
    >
      <el-carousel-item
        v-for="item in allInstitution.pictures"
        :key="item.pictureId"
      >
        <img
          class="img"
          :src="item.path"
          alt
        >
      </el-carousel-item>
    </el-carousel>

    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="dialogVisiblePicture = true"
    >上传机构图片</el-button>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisiblePicture"
    >
      <el-form :model="PictureForm">
        <el-upload
          :action=" `http://geniusdsy.cn/Colorfullcloud/backStageManager/updateImage?fileType=2&institutionId=${this.allInstitution.institutionId}` "
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="uploadPictureSuc"
          :auto-upload="false"
          ref="uploadPicture"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogPictureUrl"
            alt
          >
        </el-dialog>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisiblePicture = false">取 消</el-button>
        <el-button
          type="primary"
          @click="uploadPicture"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisibleCourse"
    >
      <el-form :model="CourseForm">
        <el-upload
          :action=" `http://geniusdsy.cn/Colorfullcloud/backStageManager/updateImage?fileType=3&courseId=${this.courseId}` "
          list-type="picture-card"
          :on-preview="handleCourseCardPreview"
          :on-success="uploadCourseSuc"
          :auto-upload="false"
          ref="uploadCourse"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogCourseUrl"
            alt
          >
        </el-dialog>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleCourse = false">取 消</el-button>
        <el-button
          type="primary"
          @click="uploadCourse"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addInstitution from './box/addInstitution'
// import addCourses from './box/addCourses'

// import modifyInstitution from '../components/box/modifyInstitution'
export default {
  data() {
    return {
      courseId: '',
      dialogImageUrl: '',
      dialogPictureUrl: '',
      dialogCourseUrl: '',

      dialogVisiblePicture: false,
      dialogVisible: false,
      dialogVisibleCourse: false,
      allInstitution: {},
      allCoursesList: [],

      dialogFormVisible3: false,
      dialogFormVisible2: false,
      dialogFormVisible: false,
      dialogFormVisibleIcon: false,
      dialogCourseVisibleIcon: false,
      formLabelAlign: {
        categoryId: '',
        courseName: '',
        cycle: '',
        courseSchedule: '',
        institutionId: '',
        courseIntroduction: '',
        price: '',
        status: 0,
        teacherId: '',
        teacherIntroduction: {}
      },
      formLabelAlign2: {
        categoryId: '',
        courseName: '',
        cycle: '',
        institutionId: '',
        courseIntroduction: '',
        price: '',
        status: 0,
        teacherId: '',
        courseSchedule: '',
        teacherIntroduction: {}
      },
      formLabelAlign3: {
        institutionName: '',
        address: '',
        introduction: '',
        leader: '',
        phone: ''
      },
      IconForm: {},
      CourseForm: {},
      PictureForm: {}
    }
  },
  methods: {
    openModfiyCourse(e) {
      // console.log(e)
      this.formLabelAlign2.courseName = e.courseName
      this.formLabelAlign2.courseIntroduction = e.courseIntroduction
      this.formLabelAlign2.courseSchedule = e.courseSchedule
      // this.formLabelAlign2.categoryId = e.categoryId
      this.formLabelAlign2.courseId = e.courseId
      this.formLabelAlign2.teacherId = e.teacherIntroduction.teacherId
      this.formLabelAlign2.price = e.price
      this.formLabelAlign2.cycle = e.cycle
      this.dialogFormVisible2 = true
    },
    modfiyCourse(e) {
      // console.log(e)
      // this.formLabelAlign2.courseName = this.allCategoriesList.find(
      //   item => item.categoryId === this.formLabelAlign2.categoryId
      // ).type
      this.dialogFormVisible2 = false
      this.formLabelAlign2.institutionId = this.allInstitution.institutionId
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/modifyCourse',
          this.formLabelAlign2
        )
        .then(res => {
          console.log(res)
          this.allCoursesList = res.data.object
          alert('上传成功')
        })
    },
    deleteCourse(e) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete(
              `Colorfullcloud/backStageManager/deleteCourses?institutionId=${
                this.$router.history.current.params.id
              }`,
              {
                data: [e.courseId]
              }
            )
            .then(res => {
              alert('删除成功')
              this.allCoursesList = res.data.object
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    openCourse(e) {
      // console.log(e)
      this.dialogVisibleCourse = true
      this.courseId = e.courseId
    },
    uploadPicture(res) {
      // console.log(this.allInstitution.pictures)

      this.$refs.uploadPicture.submit()
    },

    uploadCourseSuc(res) {
      this.dialogVisibleCourse = false
      alert('上传成功！')
      this.allCoursesList.find(
        item => item.courseId === this.courseId
      ).picture = res.object
      // console.log(this.allInstitution.pictures)
      // this.allInstitution.pictures.push({path: res.object})
    },
    uploadCourse(res) {
      this.$refs.uploadCourse.submit()
    },
    uploadPictureSuc(res) {
      this.dialogVisiblePicture = false
      alert('上传成功！')
      // console.log(this.allInstitution.pictures)
      this.allInstitution.pictures.push({ path: res.object })
    },

    uploadIconSuc(res) {
      this.dialogFormVisibleIcon = false
      alert('上传成功！')
      this.allInstitution.icon = res.object
    },
    uploadIcon(res) {
      this.$refs.upload.submit()
    },
    back() {
      // console.log(111)
      this.$router.go(-1)
    },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList);
    // },
    handleIconCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCourseCardPreview(file) {
      this.dialogCourseUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview(file) {
      this.dialogPictureUrl = file.url
      this.dialogVisible = true
    },
    // modfiyInstitutionIcon() {},
    addCourse() {
      this.dialogFormVisible = false
      this.formLabelAlign.institutionId = this.allInstitution.institutionId
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/createCourse',
          this.formLabelAlign
        )
        .then(res => {
          console.log(res)
          this.allCoursesList = res.data.object
          alert('上传成功')
        })
    },
    openModifyInstitution() {
      this.formLabelAlign3.institutionName = this.allInstitution.institutionName
      this.formLabelAlign3.address = this.allInstitution.address
      this.formLabelAlign3.introduction = this.allInstitution.introduction
      this.formLabelAlign3.leader = this.allInstitution.leader
      this.formLabelAlign3.phone = this.allInstitution.phone
      // this.formLabelAlign3.categoryId = this.allInstitution.categoryId
      this.formLabelAlign3.institutionId = this.allInstitution.institutionId
      this.dialogFormVisible3 = true
    },
    modifyInstitution() {
      this.dialogFormVisible3 = false
      // console.log(this.formLabelAlign3)
      this.$axios
        .post(
          'Colorfullcloud/backStageManager/modifyInstitution',
          this.formLabelAlign3
        )
        .then(res => {
          alert('修改成功！')
          // console.log(res.data.object)
          this.$store.commit('changeInstitutionsList', res.data.object)
          this.$axios
            .get(
              `Colorfullcloud/product/allInstitutionPicture?institutionId=${
                this.$router.history.current.params.id
              }
`
            )
            .then(res => {
              this.allInstitution = res.data.object
              // console.log(this.allInstitution)
            })
        })
    }
  },
  async mounted() {
    // setTimeout(() => {
    //   console.log(this.$store.getters.currentTeacherList(1))
    // }, 1000)
    await this.$axios
      .get(
        `Colorfullcloud/product/allInstitutionPicture?institutionId=${
          this.$router.history.current.params.id
        }
`
      )
      .then(res => {
        this.allInstitution = res.data.object
        // console.log(this.allInstitution)
      })
    await this.$axios
      .get(
        `Colorfullcloud/backStageManager/allCourses?institutionId=${
          this.$router.history.current.params.id
        }
`
      )
      .then(res => {
        this.allCoursesList = res.data.object
        // console.log(this.allCoursesList)
      })
  },
  computed: {
    allInstitutionsList() {
      return this.$store.state.allInstitutionsList
    },
    allCategoriesList() {
      return this.$store.state.allCategoriesList
    },
    currentTeacherList() {
      return this.$store.getters.currentTeacherList(
        this.allInstitution.institutionId
      )
    }
  }
}
</script>

<style scoped>
.addCourse {
  margin: 10px;
}

.icon {
  width: 100px;
}

.el-icon-arrow-right {
  margin: 10px;
}
.grid-content {
  padding: 10px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.carousel {
  width: 500px;
  /* height: 200px; */
}

.img {
  width: 100%;
  height: 100%;
}

.icon-img {
  width: 50px;
}

.nav-title {
  margin: 10px;
}

.button {
  cursor: pointer;
}
</style>
