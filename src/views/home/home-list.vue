<template>
    <div class="home-list">
        <van-card
            v-for="l in lessonList"
            :key="l.id"
            :price="l.price"
            desc="描述信息"
            :title="l.title"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
            <template #tag>
                <van-tag>{{ formatCategory(l.category) }}</van-tag>
            </template>
        </van-card>
    </div>
</template>
<script lang="ts">
    import { ILsessons } from "@/types/home";
    import { defineComponent, PropType } from "vue";
    export default defineComponent({
        props: {
            lessonList: {
                type: [] as PropType<ILsessons>,
            },
        },
        setup() {
            function formatCategory(type: number) {
                switch (type) {
                    case 1:
                        return "Vue课程";
                    case 2:
                        return "React课程";
                    case 3:
                        return "Node课程";
                }
            }
            return {
                formatCategory,
            };
        },
    });
</script>
