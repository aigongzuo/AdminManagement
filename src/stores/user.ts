import { LoginBean } from '@/bean/login-bean'
import { defineStore } from 'pinia'

interface UserInfo {
  name: string
  age: number
  token:string
}

export const userStore = defineStore('user', {
  state: (): UserInfo => ({
    name: '',
    age: 0,
    token:''
  }),
  getters: {
    isAdult(): boolean {
      return this.age >= 18
    },
  },

  actions: {
    birthday() {
      this.age++
    }
  },

  //持久化标识
  persist: true
})

export function setUserInfo(userInfo: LoginBean) {
  const bean = userStore();
  bean.name = userInfo.data.username;
  bean.token = userInfo.data.token;
}


export function clearUserInfo() {
    // 在这里使用 userStore 来重置用户信息
  const bean = userStore();
  bean.name = '';
  bean.age = 0;
  bean.token = "";
}

// 创建并导出 useUserStore 实例
//  const userStore = useUserStore();

export function getToken():string{
  return userStore().token;//userStore.token
}



