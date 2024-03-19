<template>
    <el-container style="height: 100vh;">
        <el-header>
            <el-row type="flex" justify="center">
                <el-col :span="24">
                    <h1 class="header">欢迎来到我们的网站！</h1>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <p class="welcome-text">有任何问题请与我们客服联系，感谢你的访问！</p>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WelcomePage',
    setup() {
        // 在这里添加你的逻辑代码
    }
})
</script>
  
<style scoped>
.header {
    color: #409EFF;
    text-align: center;
    font-size: 1.4em;
}

.welcome-text {
    text-align: center;
    font-size: 1.2em;
    color: #409EFF;
}

</style> 