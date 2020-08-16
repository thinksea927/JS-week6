<template lang="pug">
  .container.mt-3
    loading(:active.sync="isLoading")
    .text-right.mt-4
      button.btn.btn-primary(@click="openModal('new')") 建立新的優惠券
    table.table.mt-4
      thead
        tr
          th 名稱
          th 折扣百分比
          th 到期日
          th 是否啟用
          th 編輯
      tbody
        tr(v-for="(item, key) in couponsList" :key="item.id")
          td {{ item.title}}
          td {{ item.percent}}
          td {{ item.deadline.datetime}}
          td
            span.text-success(v-if="item.enabled") 啟用
            span(v-else) 未啟用
          td
            .btn-group
              button.btn.btn-outline-primary.btn-sm(@click="openModal('edit', item)") 編輯
              button.btn.btn-outline-danger.btn-sm(@click="openModal('delete', item)") 刪除

    //  pagination
    pagination(:pages="pagination" @emit-pages="getCoupons")
    // Model
    .modal.fade#couponModal(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-l(role='document')
        .modal-content.border-0
          .modal-header.bg-dark.text-white
            h5.modal-title#exampleModalLabel
              span 建立優惠券
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            .row
              .col-sm-12
                .form-group.text-left
                  label(for='title') 標題
                  input.form-control#title(v-model='tempCoupon.title' type='text' placeholder='請輸入標題')
                .form-group.text-left
                  label(for='couponCode') 優惠碼
                  input.form-control#couponCode(v-model='tempCoupon.code' type='text' placeholder='請輸入優惠碼')
                .form-group.text-left
                  label(for='conponDeadline') 到期日
                  input.form-control#conponDeadline(v-model='due_date' type='date')
                .form-group.text-left
                  label(for='couponDeadlineTime') 到期時間
                  input.form-control#couponDeadlineTime(v-model='due_time' type='time' step="1")
                .form-group.text-left
                  label(for='couponDiscount') 折扣百分比
                  input.form-control#couponDiscount(v-model='tempCoupon.percent' type='number' placeholder='請輸入折扣百分比')
                .form-group.text-left
                  .form-check
                    input.form-check-input#is_enabled(v-model='tempCoupon.enabled' type='checkbox')
                    label.form-check-label(for='is_enabled') 是否啟用
          .modal-footer
            button.btn.btn-outline-secondary(type='button' data-dismiss='modal') 取消
            button.btn.btn-primary(type='button' @click='updateCoupon') 確認
    .modal.fade#delCouponModal(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content.border-0
          .modal-header.bg-danger.text-white
            h5.modal-title#exampleModalLabel
              span 刪除優惠券
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | 是否刪除
            strong.text-danger {{ tempCoupon.title }}
            |  優惠券(刪除後將無法恢復)。
          .modal-footer
            button.btn.btn-outline-secondary(type='button' data-dismiss='modal') 取消
            button.btn.btn-danger(type='button' @click='delCoupon') 確認刪除
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      couponsList: {},
      pagination: {},
      tempCoupon: {
        title: '',
        // enabled: false,
        percent: 50,
        deadline_at: 0,
        code: ''
      },
      due_date: '',
      due_time: ''
    }
  },
  methods: {
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempCoupon = {}
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = Object.assign({}, item)
          // 使用 split 切割相關時間戳，返回陣列
          const deadlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadlineAt
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = Object.assign({}, item)
          $('#delCouponModal').modal('show')
          break
        default:
          break
      }
    },
    updateCoupon () {
      this.isLoading = true
      // 重組，因為要符合API規定
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`
      if (this.tempCoupon.id) {
        this.couponsList.forEach((item, i) => {
          if (item.id === this.tempCoupon.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`
            this.$http.patch(api, this.tempCoupon)
              .then((res) => {
                this.getCoupons()
                this.isLoading = false
                this.$bus.$emit('message:push', '已成功更新優惠券', 'success')
              })
              .catch((err) => {
                this.isLoading = false
                console.log(err)
                this.$bus.$emit('message:push', `更新優惠券失敗喔!${err}`, 'danger')
              })
          }
        })
      } else {
        const id = new Date().getTime()
        const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`
        this.tempCoupon.id = id
        if (this.tempCoupon.enabled === undefined) { this.tempCoupon.enabled = false }
        this.$http.post(api, this.tempCoupon)
          .then((res) => {
            this.getCoupons()
            this.isLoading = false
            this.$bus.$emit('message:push', '已成功新增優惠券', 'success')
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err)
            this.$bus.$emit('message:push', `新增優惠券失敗喔!${err}`, 'danger')
          })
      }
      this.due_date = {}
      this.due_time = {}
      $('#couponModal').modal('hide')
    },
    getCoupons (num = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`
      this.$http.get(api)
        .then((res) => {
          console.log(res)
          this.couponsList = res.data.data
          console.log(this.couponsList)
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.$bus.$emit('message:push', `取得優惠券失敗喔!${err}`, 'danger')
        })
    },
    delCoupon () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      this.$http.delete(api)
        .then((res) => {
          this.getCoupons()
          this.isLoading = false
          this.$bus.$emit('message:push', '已成功刪除', 'success')
        })
        .catch((err) => {
          this.isLoading = false
          this.$bus.$emit('message:push', `刪除失敗喔!${err}`, 'danger')
        })
      $('#delCouponModal').modal('hide')
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
