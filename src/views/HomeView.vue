<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.store'
import TheWelcome from '@/components/TheWelcome.vue'

export default defineComponent({
  components: {
    TheWelcome
  },

  data() {
    return {
      product: ''
    }
  },

  computed: {
    ...mapState(useProductStore, ['products'])
  },

  async created() {
    try {
      await this.getProducts()

      this.product = this.products.find((product) => product.id === 1)
      console.log()
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    ...mapActions(useProductStore, ['getProducts'])
  }
})
</script>

<template>
  <main>
    <pre> {{ products }}</pre>
    {{ product }}
    <TheWelcome />
  </main>
</template>
