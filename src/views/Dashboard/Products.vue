<template>
  <div>
    <h1> 後台 - 產品列表 </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  props: ['token'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.data
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
