<template>
  <div id="app">
    <router-view />
    <toast />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'

export default {
  components: {
    Toast
  },
  data () {
    return {}
  }

}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

#app {
  font-family: "Microsoft JhengHei", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
