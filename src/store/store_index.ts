import { defineStore } from 'pinia'

// todo template type infer
const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 0,
      value: 2
    }
  },
  getters: {
    doubleCount: state => {
      return state.count * 2
    }
  },
  actions: {
    addCount () {
      this.count++
    }
  }
})

export default useMainStore
