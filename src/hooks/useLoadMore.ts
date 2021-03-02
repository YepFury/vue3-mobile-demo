import { IGlobaleState } from "@/store";
import { computed, onMounted, Ref } from "vue";
import { Store } from "vuex";
import _ from 'lodash'
export function useLoadMore(refreshEle: Ref<null | HTMLElement>, store: Store<IGlobaleState>, type: string) {
    // 防抖
    let element: HTMLElement;

    function _loadMore() {
        // 获取可视区域高度，卷曲的高度，整个高度
        let containerHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (containerHeight + scrollTop + 10 >= scrollHeight) {
            store.dispatch(type)
        }
    }
    onMounted(() => {
        element = refreshEle.value as HTMLElement;
        element.addEventListener('scroll', _.debounce(_loadMore, 200))
    })

    const isLoading = computed(() => {
        return store.state.home.lessons.loading
    })
    const hasMore = computed(() => {
        return store.state.home.lessons.hasMore
    })
    return {
        isLoading,
        hasMore
    }

}