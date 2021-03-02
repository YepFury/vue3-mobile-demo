<template>
    <div class="home-slider">
        <van-swipe class="home-slider" :autoplay="3000" indicator-color="white" v-if="silderList.length">
            <van-swipe-item v-for="l in silderList" :key="l.url">
                <img :src="l.url" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<style lang="scss">
    .home-slider {
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
<script lang="ts">
    import { IGlobaleState } from "@/store";
    import { computed, defineComponent } from "vue";
    import { useStore } from "vuex";
    import * as Types from "@/store/action-types";
    export default defineComponent({
        async setup() {
            let store = useStore<IGlobaleState>();
            let silderList = computed(() => store.state.home.sliders);
            if (silderList.value.length === 0) {
                await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
            }
            return {
                silderList,
            };
        },
    });
</script>
