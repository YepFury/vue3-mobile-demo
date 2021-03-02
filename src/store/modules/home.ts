import { CATAGORY_TYPES, IHomeState, ILsessons, ISlider } from "@/types/home"
import { Module } from "vuex"
import { IGlobaleState } from '../index'
import * as Types from '../action-types'
import { getLessons, getSliders } from "@/api/home"

// 首页的数据
const state: IHomeState = {
    currentCatagory: CATAGORY_TYPES.ALL,
    sliders: [],
    lessons: {
        hasMore: true,      // 更多数据
        loading: false,     // 加载中
        offset: 0,          // 从哪开始
        limit: 5,           // 每次条数
        list: []
    }
}
// 模块的两个参数  1.自身的状态   2.全局的状态
const home: Module<IHomeState, IGlobaleState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.SET_CATEGORY](state, payload: CATAGORY_TYPES) {
            state.currentCatagory = payload
        },
        [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
            state.sliders = payload
        },
        [Types.SET_LOADING](state, payload: boolean) {
            state.lessons.loading = payload;
        },
        [Types.SET_LESSON_LIST](state, payload: ILsessons) {
            state.lessons.list = [...state.lessons.list, ...payload.list];
            state.lessons.hasMore = payload.hasMore;
            state.lessons.offset = state.lessons.offset + payload.list.length;
        }
    },
    actions: {
        async [Types.SET_SLIDER_LIST]({ commit }) {
            let sliders = await getSliders<ISlider>();
            commit(Types.SET_SLIDER_LIST, sliders)
        },
        async [Types.SET_LESSON_LIST]({ commit }) {
            // 是否正在加载
            if (state.lessons.loading) {
                return
            }
            // 是否还有更多数据
            if (!state.lessons.hasMore) {
                return
            }
            // 开始加载数据
            commit(Types.SET_LOADING, true)
            let lessons = await getLessons<ILsessons>(state.currentCatagory, state.lessons.offset, state.lessons.limit);
            commit(Types.SET_LESSON_LIST, lessons);
            commit(Types.SET_LOADING, false)
        }
    }
}

export default home