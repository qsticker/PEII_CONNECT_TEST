import Vue from 'vue'
import Vuex from 'vuex'
import { RootClassfication } from '@/apis/models/RootClassfication'
Vue.use(Vuex)

const getDefaultState = () => ({
  courseClassfication: [] as RootClassfication[],
});

export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
  
  },
  mutations: {
    updateCourseClass(state, courseClassfication: RootClassfication[]){
      state.courseClassfication = courseClassfication;
    }
  },
  actions: {
  },
  modules: {
  }
})
