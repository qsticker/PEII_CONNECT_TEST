import Vue from 'vue'
import Vuex from 'vuex'
import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';
import { State } from "@/store/State"
Vue.use(Vuex)


export default new Vuex.Store<State>({
  state: (): State => ({ //this is defualt state
    courseClassfication: new Array<RootClassfication>(),
    profile: null , //defulat is null
  }),
  getters: {
  
  },
  mutations: {
    updateCourseClass: function(state : State, courseClassfication: RootClassfication[] ){
      state.courseClassfication = courseClassfication;
    },
    updateProfile: function(state : State, profile : ProfileModel ){
      state.profile = profile;
    }
  },
  actions: {
  },
  modules: {
  }
})
