<template>
  <div>
  </div>
</template>

<script>
// import addCourses from './box/addCourses'
export default {
  data() {
    return {
      allCoursesList: []
    }
  },
  methods: {},
  mounted() {
    this.$axios.get('/Colorfullcloud/backStageManager/allCourses').then(res => {
      this.allCoursesList = res.data.object
    })
  }
}
</script>

<style scoped>
.img {
  width: 50px;
}
</style>
