<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(route, index) in pathMap" :key="index">
      <router-link :to="route[route.pageName]">{{ route.pageName }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {reactive, ref, defineExpose, computed} from "vue";
// import {useStore, mapState} from "vuex";

// const store = useStore();
// store.commit("increment")

// const a = mapState['pathMap'];

// const pathMap = computed(() => {
//   const temp = store.getters.pathMap;
//   //如果在主页面下就不显示了
//   if (temp.length === 1) {
//     return null;
//   }
//   return temp;
// })

</script>
