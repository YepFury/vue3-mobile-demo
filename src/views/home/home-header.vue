<template>
    <div class="home-header">
        <img src="@/assets/logo.png" />
        <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item :modelValue="category" :options="options" @change="change" />
        </van-dropdown-menu>
    </div>
</template>
<script lang="ts">
    import store from "@/store";
    import { CATAGORY_TYPES } from "@/types/home";
    import { defineComponent, PropType, reactive, toRefs } from "vue";
    export default defineComponent({
        props: {
            category: {
                type: Number as PropType<CATAGORY_TYPES>,
            },
        },
        emits: ["setCurrentCatrgory"],
        setup(props, ctx) {
            let state = reactive({
                options: [
                    { text: "全部课程", value: CATAGORY_TYPES.ALL },
                    { text: "Vue课程", value: CATAGORY_TYPES.VUE },
                    { text: "React课程", value: CATAGORY_TYPES.REACT },
                    { text: "Node课程", value: CATAGORY_TYPES.NODE },
                ],
            });
            function change(value: CATAGORY_TYPES) {
                ctx.emit("setCurrentCatrgory", value);
            }
            return {
                ...toRefs(state),
                change,
            };
        },
    });
</script>
<style lang="scss">
    .home-header {
        width: 90%;
        height: 60px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        box-shadow: 0 2px 5px #ccc;
        padding: 0 5%;
        img {
            height: 50px;
        }
        .van-dropdown-menu__bar {
            box-shadow: none;
        }
    }
</style>
