<template>
  <div>
    <h1> 單一產品頁面</h1>
    <h2>產品名稱: {{ product.title }}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    console.log(this.$route)
    const { id } = this.$route.params
    this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`)
      .then((res) => {
        console.log(res)
        this.product = res.data.data
      })
  }
}
</script>
