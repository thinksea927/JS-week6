<template>
  <div>
    <h3>這是後台Dashboard</h3>
    <div id="nav">
      <router-link to="/">回到前台</router-link>|
      <router-link to="/admin">後台首頁</router-link>|
      <router-link to="/admin/products">產品列表</router-link>|
      <router-link to="/admin/coupons">優惠券列表</router-link>|
      <router-link to="/admin/orders">訂單列表</router-link>|
      <router-link to="/admin/images">圖片儲存列表</router-link>|
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`
      // eslint-disable-next-line
      this.$http.post(api,{'api_token' : this.token}).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.checkSuccess = true
        }
      }).catch((res) => {
        this.$router.push('/login')
      })
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      console.log('已登出: token已清除')
      this.$router.push('/login')
      console.log('為什麼不會跳轉@@')
    }
  }
}
</script>
