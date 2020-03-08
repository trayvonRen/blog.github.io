<template>
  <div>
    <div class="wrapper">

      <el-form
        ref="form"
        :model="formLabelAlign"
        label-width="auto"
      >
        <el-form-item label="管理员账号">
          <el-input v-model="formLabelAlign.account"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input v-model="formLabelAlign.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="formLabelAlign.code"></el-input>
          <img
            class="img"
            :src="codeSrc"
            @click="Refresh"
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {
        account: '',
        password: '',
        code: ''
      },
      codeSrc: '/Colorfullcloud/admin/verifyCode'
    }
  },
  methods: {
    Refresh() {
      this.codeSrc = '/Colorfullcloud/admin/verifyCode?id=' + Math.random()
    },
    onSubmit() {
      this.$axios
        .post(
          `/Colorfullcloud/admin/adminLogin?verifyCode=${
            this.formLabelAlign.code
          }
&adminId=${this.formLabelAlign.account}&adminPassword=${
            this.formLabelAlign.password
          }`
        )
        .then(res => {
          if (res.data.msg === 'ok') {
            alert('登录成功！')
            this.$store.commit('changeRole')
            this.$router.push({ path: '/index' })
          } else {
            alert(res.data.msg)
            this.Refresh()
          }
        })
    }
  },
  mounted() {}
}
</script>

<style lang="css" scoped>
.wrapper {
  width: 30%;
  margin: auto;
}

.img {
  cursor: pointer;
}
</style>
