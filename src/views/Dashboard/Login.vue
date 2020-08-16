<template>
  <div class="fullHeight d-flex justify-content-center align-items-center">
    <div class="container">
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="signin">
          <h3>請登入後台系統</h3>
          <div class="form-group text-left">
            <validation-provider name="E-mail" rules="required|email" v-slot="{ errors, classes }">
              <label for="exampleInputEmail1">Email</label>
              <input class="form-control" :class="classes" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="請輸入您的E-mail" v-model="user.email" requied="requied"/>
              <span class="invalid-feedback" v-if="errors[0]">{{errors[0]}}</span>
            </validation-provider>
          </div>
          <div class="form-group text-left">
            <validation-provider name="密碼" rules="required" v-slot="{ errors, classes }">
              <label for="exampleInputPassword1">密碼</label>
              <input class="form-control" id="exampleInputPassword1" type="password" placeholder="請輸入您的密碼" v-model="user.password" :class="classes"/>
              <span class="invalid-feedback" v-if="errors[0]">{{errors[0]}}</span>
            </validation-provider>
          </div>
            <button class="btn btn-outline-primary mr-3" type="reset">取消</button>
            <button class="btn btn-primary px-3" type="submit" @keyup.enter="submit" :disabled="invalid">登入</button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {

    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`

      this.$http.post(api, this.user).then((res) => {
        const { token } = res.data
        const { expired } = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)};`
        this.$router.push('/admin/products')
        this.$bus.$emit('message:push', '登入成功', 'success')
      }).catch((err) => {
        console.log(err)
        this.$bus.$emit('message:push', `登入失敗喔!${err}`, 'danger')
      })
    },

    signout () {
      document.cookie = 'hexToken=;expires=;'
      console.log('已登出: token已清除')
      this.$bus.$emit('message:push', '你已經登出囉!', 'warning')
    }

  }
}
</script>

<style lang="sass" scoped>
.fullHeight
  height: 100vh
.container
  width: 300px

</style>
