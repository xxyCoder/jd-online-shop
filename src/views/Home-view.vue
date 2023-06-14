<template>
    <el-container>
        <el-header><header-component /></el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import HeaderComponent from '../components/Header-Component.vue'
</script>

<style lang="less" scoped>
.el-main {
    margin: 0;
    padding: 0;
}
</style>