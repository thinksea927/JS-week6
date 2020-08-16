<template lang="pug">
  .container.mt-3
    loading(:active.sync='isLoading')
    table.table.mt-4
      thead
        tr
          th 圖片縮圖
          th 操作
      tbody(v-if='storages.length')
        tr(v-for='(item, key) in storages' :key='key')
          td
            img.img-fluid(:src='item.path' width='100px')
          td
            .btn-group.btn-group-sm
              button.btn.btn-outline-danger(@click.prevent='openModal(item)') 刪除
    pagination(:pages='pagination' @emitpages='getData')
    #delModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content.border-0
          .modal-header.bg-danger.text-white
            h5#exampleModalLabel.modal-title
              span 刪除資料
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body 是否刪除該筆資料 (刪除後將無法恢復)。
          .modal-footer
            button.btn.btn-outline-secondary(type='button' data-dismiss='modal') 取消
            button.btn.btn-danger(type='button' @click='deleteData') 確認刪除
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      storages: {},
      tempData: {},
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getData (num = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${num}`
      this.$http.get(api)
        .then((res) => {
          this.storages = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },
    openModal (item) {
      $('#delModal').modal('show')
      this.tempData = Object.assign({}, item)
    },
    deleteData () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${this.tempData.id}`
      this.$http.delete(api)
        .then((res) => {
          this.getData()
          this.isLoading = false
          this.$bus.$emit('message:push', '已成功刪除', 'success')
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
          this.$bus.$emit('message:push', `刪除失敗喔!${err}`, 'danger')
        })
      $('#delModal').modal('hide')
    }
  },
  created () {
    this.getData()
  }
}
</script>
