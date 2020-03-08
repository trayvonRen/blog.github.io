import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: 'user',
    allCoursesList: null,
    allInstitutionsList: null,
    allCategoriesList: null,
    allTeachersList: null,
    defaultAllProductList: null
  },
  getters: {
    currentTeacherList: state => institutionId => {
      if (state.allTeachersList === null) {
        return []
      }
      return state.allTeachersList.filter(item =>
        item.institutionId === institutionId
      )
    }
  },
  mutations: {
    changeRole(state) {
      // 变更状态
      state.role = 'admin'
    },
    changeCoursesList(state, n) {
      // 变更状态
      state.allCoursesList = n
    },
    changeInstitutionsList(state, n) {
      // 变更状态
      state.allInstitutionsList = n
    },
    changeCategoriesList(state, n) {
      // 变更状态
      state.allCategoriesList = n
    },
    changeTeachersList(state, n) {
      // 变更状态
      state.allTeachersList = n
    },
    changeDefaultAllProductList(state, n) {
      // 变更状态
      state.defaultAllProductList = n
    }
  }
})
