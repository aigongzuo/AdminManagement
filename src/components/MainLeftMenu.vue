<template>
    <el-aside class="el-aside" width="200px">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group> -->

        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose" @select="handleMenuSelect">
            <el-menu-item :index="routeConfig.dashboard.name">
                <el-icon>
                    <PieChart />
                </el-icon>
                <template #title>{{ routeConfig.dashboard.name }}</template></el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>Project List</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Product One</span></template>
                    <el-menu-item :index="routeConfig.main.path">
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <template #title>{{ routeConfig.main.name }}</template>
                    </el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" :disabled="true">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item :index="routeConfig.setting.path">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>{{ routeConfig.setting.name }}</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Setting,
    PieChart,
    Grid,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

import { routeConfig } from '@/router/modules/config';
import { push } from '@/router';

const handleMenuSelect = (index: string) => {
    console.log('Menu item selected:', index);
    push(index);
};
</script>
  
<style>
.el-aside {
    height: "500px";

}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 900px;
}

.el-menu-vertical-demo.el-menu--collapse {
    min-height: 900px;
}
</style>
  