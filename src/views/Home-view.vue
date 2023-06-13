<template>
    <div class="common-layout">
        <el-container>
            <el-header><header-component /></el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import HeaderComponent from '../components/Header-Component.vue'
</script>

<style scoped></style>