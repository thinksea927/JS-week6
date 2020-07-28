<template>
  <div>
    <form @submit.prevent="signin">
      <h3>請登入</h3>
      <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email" requied="requied"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input class="form-control" id="exampleInputPassword1" type="password" placeholder="Password" v-model="user.password" required="required"/>
        </div>
        <button class="btn btn-primary mr-3" type="submit">Log In</button>
        <button class="btn btn-primary" type="button" @click.prevent="signout">Log Out</button>
    </form>
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
        document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)}; path=/`
        this.$router.push('/admin/products')
      }).catch((err) => {
        console.log(err)
      })
    },

    signout () {
      document.cookie = 'hexToken=;expires=;'
      console.log('已登出: token已清除')
    }

  }
}
</script>

<style lang="sass">
  html,body
    height: 100%
  body
    display: flex
    justify-content: center
    align-items: center
  .form-group
    max-width: 400px
</style>
