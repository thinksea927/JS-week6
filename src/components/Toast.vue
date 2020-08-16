<template lang="pug">
  div(style='position: fixed; top: 20px; right: 20px; min-width: 300px; z-index: 11000;')
    .toast.fade.show.shadow(v-for='(item, i) in messages' :id='`toast-${i}`' :key='i' role='alert' aria-live='assertive' aria-atomic='true' data-autohide='false')
      .toast-header.d-flex(style="color: white" :class='`bg-${ item.status }`')
        //- .inline-block.rounded.mr-2(style='width: 20px; height: 20px' :class='`bg-${ item.status }`')
        strong.mr-auto 終於把 toast 做好惹
        small 現在
        button.ml-2.mb-1.close(type='button' data-dismiss='toast' aria-label='Close' @click='closeToast(`toast-${i}`)')
          span(style="color: white" aria-hidden='true') ×
      .toast-body {{ item.message }}
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    closeToast (element) {
      $(`#${element}`).toast('hide')
    }
  }
}
</script>
