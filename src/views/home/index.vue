<template>
    <div class="home">
        <!-- 头部 -->
        <HomeHeader :category="category" @setCurrentCatrgory="setCurrentCatrgory"></HomeHeader>
        <div class="home-container" ref="refreshEle">
            <!-- 轮播图 -->
            <Suspense>
                <template #default>
                    <HomeSlider></HomeSlider>
                </template>
                <template #fallback>
                    <van-loading />
                </template>
            </Suspense>
            <!-- 列表 -->
            <HomeList :lessonList="lessonList"></HomeList>
            <div class="tips" v-if="isLoading">正在加载...</div>
            <div class="tips" v-if="!hasMore">——我是有底线的——</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, onMounted, ref } from "vue";
    import HomeHeader from "./home-header.vue";
    import HomeSlider from "./home-slider.vue";
    import HomeList from "./home-list.vue";
    import { Store, useStore } from "vuex";
    import { IGlobaleState } from "@/store";
    import * as Types from "@/store/action-types";
    import { CATAGORY_TYPES } from "@/types/home";
    import { useLoadMore } from "@/hooks/useLoadMore";
    function useCategory(store: Store<IGlobaleState>) {
        let category = computed(() => store.state.home.currentCatagory);
        function setCurrentCatrgory(category: CATAGORY_TYPES) {
            store.commit(`home/${Types.SET_CATEGORY}`, category);
        }
        return {
            category,
            setCurrentCatrgory,
        };
    }
    function useLesssonList(store: Store<IGlobaleState>) {
        let lessonList = computed(() => store.state.home.lessons.list);
        onMounted(() => {
            if (lessonList.value.length === 0) {
                store.dispatch(`home/${Types.SET_LESSON_LIST}`);
            }
        });
        return {
            lessonList,
        };
    }
    export default defineComponent({
        components: {
            HomeHeader,
            HomeSlider,
            HomeList,
        },
        setup() {
            let stroe = useStore<IGlobaleState>();
            // 分类
            let { category, setCurrentCatrgory } = useCategory(stroe);
            // 列表
            let { lessonList } = useLesssonList(stroe);
            const refreshEle = ref<null | HTMLElement>(null);
            let { isLoading, hasMore } = useLoadMore(refreshEle, stroe, `home/${Types.SET_LESSON_LIST}`);
            
            return {
                category,
                setCurrentCatrgory,
                lessonList,
                refreshEle,
                isLoading,
                hasMore,
            };
        },
    });
</script>
<style lang="scss">
    .home-container {
        position: absolute;
        top: 60px;
        bottom: 50px;
        width: 100%;
        overflow-y: scroll;
    }
    .tips {
        text-align: center;
        line-height: 30px;
    }
</style>
