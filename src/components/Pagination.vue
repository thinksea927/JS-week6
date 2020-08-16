<template lang="pug">
  nav(aria-label='Page navigation example')
    ul.pagination
      li.page-item(:class="{'disabled': pages.current_page === 1}")
        a.page-link(href='#' @click.prevent="emitPages(pages.current_page - 1)") Previous
      li.page-item(v-for="i in pages.total_pages" :key="i" :class="{'active': pages.current_page === i}")
        a.page-link(href="#" @click.prevent="emitPages(i)") {{i}}
      li.page-item(:class="{'disabled': pages.current_page === pages.total_pages}")
        a.page-link(href='#' @click.prevent="emitPages(pages.current_page + 1)") Next
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    emitPages (i) {
      this.$emit('emit-pages', i)
    }
  }

}
</script>
