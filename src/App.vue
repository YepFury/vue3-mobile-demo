<template>
    <div>
        <router-view></router-view>
        <van-tabbar route>
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/profile" icon="records">课程</van-tabbar-item>
            <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>
<style lang="scss"></style>
