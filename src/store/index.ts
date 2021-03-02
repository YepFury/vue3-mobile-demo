import { IHomeState } from '@/types/home'
import { createStore } from 'vuex'
import home from './modules/home'

export interface IGlobaleState {
  home: IHomeState
}

const store = createStore<IGlobaleState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    home
  }
})
export default store