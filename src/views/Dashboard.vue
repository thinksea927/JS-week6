<template lang='pug'>
div
  #nav.navbar-expand-lg.navbar-light(style="background-color: #fff7ba")
    h3 這是後台Dashboard
    router-link.mr-3(to='/') 回到前台
    router-link.mr-3(to='/admin')  後台首頁

    router-link.mr-3(to='/admin/products')  產品列表

    router-link.mr-3(to='/admin/coupons')  優惠券列表

    router-link.mr-3(to='/admin/orders')  訂單列表

    router-link.mr-3(to='/admin/images')  圖片儲存列表

    a(href='#' @click.prevent='signout') 登出
  router-view(:token='token' v-if='checkSuccess')

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
      this.$http.post(api, { api_token: this.token }).then((res) => {
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
      this.$bus.$emit('message:push', '你已經登出囉!', 'warning')
      this.$router.push('/login')
    }
  }
}
</script>
