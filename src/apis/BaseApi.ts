import axios from 'axios';
import vm from '@/main';
import Auth from '@/libs/auth';

const api = axios.create({
  baseURL: process.env.VUE_APP_PEII_BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: {
      toString() {
        console.log( vm.$cookies.get('accessToken') + "auth")
        return vm.$cookies.get('accessToken');
      },
    },
  },
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.message === 'Network Error') {
    vm.$notify({
      type: 'error',
      title: '無法連線到伺服器',
      text: '請確認您的網路狀況是否正常',
    });
    // Auth.logout();
    return Promise.reject(error);
  }

  const path = '';
  
  switch (error.response.status) {
    case 401:
      if (vm.$cookies.isKey('token')) {
        // get 401 because token is expired
        vm.$notify({
          type: 'info',
          title: '請重新登入',
          text: '您的驗證已過期，請重新登入',
        });
      } else {
        // get 401 because login failed
        vm.$notify({
          type: 'info',
          title: '登入失敗',
          text: '錯誤的帳號或密碼',
        });
      }

      Auth.logout();
      break;
    case 403:
      // path = '/403';
      vm.$notify({
        type: 'error',
        title: '錯誤',
        text: '您沒有此資源的存取權限',
      });
      break;
    default: break; // path = '/error';
  }
  if (path !== '' && path !== vm.$router.currentRoute.path) {
    vm.$router.push(path);
  }
  return Promise.reject(error);
  
});

export default api;