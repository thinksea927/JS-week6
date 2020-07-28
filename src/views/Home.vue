<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">前台首頁</router-link>|
      <router-link to="/products">產品列表</router-link>|
      <router-link to="/cart">購物車</router-link>|
      <router-link to="/about">關於我們</router-link>|
      <router-link to="/checkout">結帳</router-link>|
      <router-link to="/closing">結帳完成</router-link>|
      <!-- <router-link to="/login">後台登入頁</router-link>| -->
      <router-link to="/admin">後台首頁</router-link>|
    </div>
    <router-view />
  </div>
</template>
