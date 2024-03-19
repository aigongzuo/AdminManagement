
<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">Element Plus</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
  
  
<script setup lang="ts">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import useRouter from '@/router';
import TestRouter from '@/router/modules/test';

const toggleDark = () => {
  // 使用字符串路径
  useRouter.push(TestRouter[0].path);
}

</script>
  
<style scoped>
.index-container {
  background-color: red;
  display: flex;
  justify-content: flex-end;
  /* 将内容左对齐 */
  align-items: flex-start;
  /* 将内容上对齐 */
  width: 100%;
  min-height: 100vh;
  /* 使用视口高度来确保内容撑满整个屏幕 */
  padding: 0px;
  /* 适当的内边距，可根据需要调整 */
  box-sizing: border-box;
  /* 防止 padding 影响宽度和高度的计算 */
}
</style>
  