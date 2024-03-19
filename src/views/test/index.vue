<template>
  <div>
    <h1>这是test页面</h1>
  </div>

  <div>
    <p>Count: {{ userStore().age }}</p>
    <p>name: {{ userStore().name }}</p>
    <button @click="test()">Increment</button>
  </div>
</template>

<script setup lang="ts">

import { userStore } from '@/stores/user';
// const increment = userStore.birthday;


import { loginAPI } from '@/api/index'


async function test() {
  try {
    // const responseData = await testAPI();
    // const jsonString = JSON.stringify(responseData, null, 2);
    const data = await loginAPI("kang", "kang");
    // const jsonString = JSON.stringify(responseData, null, 2);
    // console.log(data.data.username)
    console.log(data)
  } catch (error) {
    // if (error instanceof Error) {
    //   console.error('发生错误:', error.message);
    // } else {
    //   console.error('发生未知错误:', String(error));
    // }
    console.log("Error...")
  } finally {
    console.log("Over!")
  }
}


</script>