<template lang="pug">
  .container.mt-3
    loading(:active.sync="isLoading")
    table.table.mt-4
      thead
        tr
          th 下單時間
          th 購買款項
          th 付款方式
          th 應付金額
          th 是否付款
      tbody
        tr(v-for="(item, key) in ordersList" :key="item.id")
          td {{ item.created.datetime}}
          td {{ item.products[0].product.title}}
          td {{ item.payment}}
          td {{ item.amount}}
          td
            .custom-control.custom-switch
              input.custom-control-input(:id="`#customSwitch${key+1}`" type='checkbox' v-model="isChecked")
              label.custom-control-label(:for="`#customSwitch${key+1}`")
              span(v-if="isChecked") 已付款
              span(v-else) 尚未付款

    //  pagination
    pagination(:pages="pagination" @emit-pages="getOrders")
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      ordersList: {},
      isChecked: false,
      pagination: {}
    }
  },
  methods: {
    getOrders (num = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${num}`
      this.$http.get(api)
        .then((res) => {
          console.log(res)
          this.ordersList = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
