<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.store'
import type { Product } from '@/models/product.model'
import TheWelcome from '@/components/TheWelcome.vue'

export default defineComponent({
  components: {
    TheWelcome
  },

  data() {
    return {
      product: {} as Product
    }
  },

  computed: {
    ...mapState(useProductStore, ['products'])
  },

  async created() {
    try {
      const gg = await this.getProducts()

      console.log(gg)

      this.product = this.products.find((product) => product.id === 1)!
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
