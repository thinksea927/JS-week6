<template lang='pug'>
  div
    h1 產品列表頁
    table
      tbody
        tr(v-for='item in products' :key='item.id')
          td {{item.title}}
          td {{item.content}}
          td
            router-link(:to=' `/product/${item.id}`') 詳細資料
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  created () {
    console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_UUID)
    this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`)
      .then((res) => {
        console.log(res)
        this.products = res.data.data
      })
  }
}
</script>

<style lang="sass" scoped>
td
  padding: 10px 5px
</style>
