import { defineStore } from 'pinia'
import { UserInfo } from '@/api/types/login'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

// todo template type infer
const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 0,
      collapse: false,
      user: getItem<UserInfo>(USER)
    }
  },
  getters: {
    doubleCount: state => {
      return state.count * 2
    }
  },
  actions: {
    setUser (user: UserInfo | null) {
      this.user = user
      setItem(USER, user)
    }
  }
})

export default useMainStore
