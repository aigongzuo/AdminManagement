<template>
  <div class="topMenuRightNode">
    <!-- <el-icon class="amplification">
      <Rank />
    </el-icon> -->
    <div style="width: 15px; display: inline-block"></div>
    <el-dropdown :hide-on-click="false" class="setupStyle">
      <span class="el-dropdown-link" style="display: flex; align-items: center;">
        设置<el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="exitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { push } from '@/router/index';
import { routeConfig } from '@/router/modules/config';
import { clearUserInfo } from '@/stores/user';
import { ArrowDown } from '@element-plus/icons-vue'


// Methods
const exitClick = () => {
  clearUserInfo();
  push(routeConfig.login.path);
};


</script>

<style>
/*顶部导航栏右边的下拉菜单*/
.setupStyle {
  margin-right: 20px;
}

.setupStyle:hover {
  border: none !important;
}

.setupStyle .el-dropdown-link:focus {
  outline: none;
}

.setupStyle:hover,
.amplification:hover {
  color: rgb(64, 158, 255);
  background-color: rgb(236, 245, 255);
  cursor: pointer;
  border: none;
}

.topMenuRightNode {
  position: absolute;
  right: 20px;
  top: 20px;
  text-align: center;
}
</style>