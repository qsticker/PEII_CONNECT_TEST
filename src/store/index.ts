import Vue from 'vue'
import Vuex from 'vuex'
import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';
import { commodity } from '@/models/commodity'
import { State } from "@/store/State"
Vue.use(Vuex)


export default new Vuex.Store<State>({
  state: (): State => ({ //this is defualt state
    courseClassfication: new Array<RootClassfication>(),
    quizClassfication: new Array<RootClassfication>(),
    profile: null , //defulat is null
    shoppingCart : null,
  }),
  getters: {
  
  },
  mutations: {
    updateCourseClass: function(state : State, courseClassfication: RootClassfication[] ){
      state.courseClassfication = courseClassfication;
    },
    updateQuizClass: function(state : State, quizClassfication: RootClassfication[] ){
      state.quizClassfication = quizClassfication;
    },
    updateProfile: function(state : State, profile : ProfileModel ){
      state.profile = profile;
    },
    updateShoppingCart: function(state : State,  shoppingCart : Map<commodity , number> ){
      state.shoppingCart = shoppingCart;
    },
  },
  actions: {
  },
  modules: {
  }
})
