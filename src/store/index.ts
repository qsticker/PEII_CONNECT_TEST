import Vue from 'vue';
import Vuex from 'vuex';
import { RootClassfication } from '@/apis/models/RootClassfication';
import { ProfileModel } from '@/apis/models/Profile';
import { pass } from '@/models/commodity';
import { State } from "@/store/State";
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

// 创建 VuexPersistence 实例，设置 storage 为 Session Storage
// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage
// });

export default new Vuex.Store<State>({
  state: (): State => ({ //this is default state
    courseClassfication: new Array<RootClassfication>(),
    quizClassfication: new Array<RootClassfication>(),
    profile: null, //default is null
    shoppingCart: null,
    userContainPasses: null,
    sellPlanId: 'ceb5cfdf-2dd8-4abc-91f7-0579faa55e5e',
    shoppingCartSize: 0,
    isLoading: false,
    isFourQuiz: false
  }),
  getters: {

  },
  mutations: {
    updateShoppingCartSize: function (state: State, newShoppingCartSize: number) {
      state.shoppingCartSize = newShoppingCartSize;
    },
    updateSellPlanId: function (state: State, newSellPlanId: string) {
      state.sellPlanId = newSellPlanId;
    },
    updateCourseClass: function (state: State, courseClassfication: RootClassfication[]) {
      state.courseClassfication = courseClassfication;
    },
    updateQuizClass: function (state: State, quizClassfication: RootClassfication[]) {
      state.quizClassfication = quizClassfication;
    },
    updateProfile: function (state: State, profile: ProfileModel) {
      state.profile = profile;
    },
    updateShoppingCart: function (state: State, shoppingCart: Map<pass, number>) {
      state.shoppingCart = shoppingCart;
    },
    updateUserContainPasses: function (state: State, userContainPasses: Map<pass, number>) {
      state.userContainPasses = userContainPasses;
    },
    updateLoading(state, status) {
      state.isLoading = status;
    },
    updateFourQuiz(state, status) {
      state.isFourQuiz = status;
    },
  },
  actions: {
  },
  modules: {
  },

  plugins: [new VuexPersistence().plugin],
});
