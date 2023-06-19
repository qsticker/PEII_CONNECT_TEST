import vm from '@/main';

export default class Auth {
  static loginCheck(): boolean {
    if (vm.$cookies.isKey('accessToken')) return true;

    this.logout();
    return false;
  }

  static logout() {
    if (vm.$cookies.isKey('accessToken')) {
      vm.$cookies.remove('accessToken');
    }
    //vm.$store.commit('resetState');
    //vm.$router.push('/login');
  }
}