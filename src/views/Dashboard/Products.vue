<template lang='pug'>
  .container.mt-3
    loading(:active.sync="isLoading")
    .text-right.mt-4
      button.btn.btn-primary(@click="openModal('new')") 建立新的產品
    table.table.mt-4
      thead
        tr
          th 分類
          th 產品名稱
          th 原價
          th 售價
          th 是否啟用
          th 編輯
      tbody
        tr(v-for='item in products' :key='item.id')
          td {{ item.category}}
          td {{ item.title}}
          td.text-right {{item.origin_price}}
          td.text-right {{item.price}}
          td
            span.text-success(v-if='item.enabled') 啟用
            span(v-else='v-else') 未啟用
          td
            .btn-group
              button.btn.btn-outline-primary.btn-sm(@click="openModal('edit', item)") 編輯
              button.btn.btn-outline-danger.btn-sm(@click="openModal('delete', item)") 刪除
    //  pagination
    pagination(:pages="pagination" @emit-pages="getProducts")
    //  Modal
    .modal.fade#productModal(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog.modal-xl(role='document')
        .modal-content.border-0
          .modal-header.bg-dark.text-white
            h5.modal-title#exampleModalLabel
              span 新增產品
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            .row
              .col-sm-4
                .form-group(v-for="i in 5" :key="i")
                  label(:for="`image${i}`") 輸入圖片網址
                  input.form-control.imageUrl(:id="`image${i}`" type='text' placeholder='請輸入圖片連結' v-model='tempProduct.imageUrl[i-1]')
                  img.img-fluid
                .form-group
                  label(for="customFile") 或 上傳圖片
                  input#customFile.form-control(type="file" ref="file" @change="uploadFile")
                  img(alt class="img-fluid" :src="tempProduct.imageUrl[0]")
              .col-sm-8
                .form-group
                  label(for='title') 標題
                  input.form-control#title(v-model='tempProduct.title' type='text' placeholder='請輸入標題')
                .form-row
                  .form-group.col-md-6
                    label(for='category') 分類
                    input.form-control#category(v-model='tempProduct.category' type='text' placeholder='請輸入分類')
                  .form-group.col-md-6
                    label(for='price') 單位
                    input.form-control#unit(v-model='tempProduct.unit' type='unit' placeholder='請輸入單位')
                .form-row
                  .form-group.col-md-6
                    label(for='origin_price') 原價
                    input.form-control#origin_price(v-model='tempProduct.origin_price' type='number' placeholder='請輸入原價')
                  .form-group.col-md-6
                    label(for='price') 售價
                    input.form-control#price(v-model='tempProduct.price' type='number' placeholder='請輸入售價')
                hr
                .form-group
                  label(for='description') 產品描述
                  textarea.form-control#description(v-model='tempProduct.description' type='text' placeholder='請輸入產品描述')
                .form-group
                  label(for='content') 說明內容
                  textarea.form-control#description(v-model='tempProduct.content' type='text' placeholder='請輸入說明內容')
                .form-group
                  .form-check
                    input.form-check-input#is_enabled(v-model='tempProduct.enabled' type='checkbox')
                    label.form-check-label(for='is_enabled') 是否啟用
                .form-group
                  //- p 修改於`${sec}`前
          .modal-footer
            button.btn.btn-outline-secondary(type='button' data-dismiss='modal') 取消
            button.btn.btn-primary(type='button' @click='updateProduct') 確認
    .modal.fade#delProductModal(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content.border-0
          .modal-header.bg-danger.text-white
            h5.modal-title#exampleModalLabel
              span 刪除產品
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | 是否刪除
            strong.text-danger {{ tempProduct.title }}
            |  商品(刪除後將無法恢復)。
          .modal-footer
            button.btn.btn-outline-secondary(type='button' data-dismiss='modal') 取消
            button.btn.btn-danger(type='button' @click='delProduct') 確認刪除
</template>

<script>
import Pagination from '@/components/Pagination.vue'
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {
        imageUrl: []
      },
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  props: ['token'],
  methods: {
    getProduct (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.$http.get(api)
        .then((res) => {
          this.tempProduct = res.data.data
          this.isLoading = false
          // Vue loading overlay doesn't allow it to have focusable el. that's
          // why we need to move modal('show') here
          $('#productModal').modal('show')
        })
        .catch((err) => console.log(err))
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          }
          $('#productModal').modal('show')
          break
        case 'edit':
          this.getProduct(item.id)
          break
        case 'delete':
          this.tempProduct = Object.assign({}, item)
          $('#delProductModal').modal('show')
          break
        default:
          break
      }
    },
    updateProduct () {
      if (this.tempProduct.id) {
        this.isLoading = true
        this.products.forEach((item, i) => {
          if (item.id === this.tempProduct.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`
            this.$http.patch(api, this.tempProduct)
              .then((res) => {
                this.getProducts()
                this.isLoading = false
                this.$bus.$emit('message:push', '更新產品成功', 'success')
              })
              .catch((err) => {
                this.isLoading = false
                console.log(err)
                this.$bus.$emit('message:push', `更新產品失敗喔!${err}`, 'danger')
              })
          }
        })
      } else {
        this.isLoading = true
        const id = new Date().getTime()
        const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`
        this.tempProduct.id = id
        this.$http.post(api, this.tempProduct)
          .then((res) => {
            this.getProducts()
            this.isLoading = false
            this.$bus.$emit('message:push', '建立新產品成功', 'success')
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err)
            this.$bus.$emit('message:push', `建立產品失敗喔!${err}`, 'danger')
          })
      }
      $('#productModal').modal('hide')
    },
    delProduct () {
      if (this.tempProduct.id) {
        this.isLoading = true
        this.products.forEach((item, i) => {
          if (item.id === this.tempProduct.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`
            this.$http.delete(api)
              .then((res) => {
                this.getProducts()
                this.isLoading = false
                this.$bus.$emit('message:push', '刪除產品成功', 'success')
              })
              .catch((err) => {
                this.isLoading = false
                console.log(err)
                this.$bus.$emit('message:push', `刪除產品失敗喔!${err}`, 'danger')
              })
          }
        })
      } else {
        console.log('取不到產品id，請回報')
      }
      $('#delProductModal').modal('hide')
    },
    getProducts (num = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },
    uploadFile () {
      // 從這裡開始
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()

      // 用append的方式把欄位加進表單中
      formData.append('file', uploadedFile)
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      // this.status.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        // what's this
        // this.status.fileUploading = false

        if (res.status === 200) {
          this.tempProduct.imageUrl.push(res.data.data.path)
        }
        this.$bus.$emit('message:push', '新增圖片成功', 'success')
      }).catch((err) => {
        // this.status.fileUploading = false
        console.log(err)
        this.$bus.$emit('message:push', `新增圖片失敗喔!${err}`, 'danger')
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
