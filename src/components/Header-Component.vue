<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/cart' }">购物车</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">我的商品</el-breadcrumb-item>
        <el-breadcrumb-item>
            <el-dropdown>
                <span class="el-dropdown-link">选项</span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        <el-dropdown-item @click="modifyInfo">修改个人信息</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');   // 清除token
    router.push({ path: 'login' });
}
const modifyInfo = () => {
    router.push({ path: 'modifyInfo' });
}
</script>
  