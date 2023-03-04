<script lang="ts" setup>
import { onMounted } from 'vue'
import TheWelcome from '@/components/TheWelcome.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'

const { products, product } = storeToRefs(useProductStore())
const { getProducts } = useProductStore()

onMounted(() => {
  // Get products
  getProducts()
  // searchProducts('Samsung Universe 9')
})
</script>

<template>
  <main>
    <pre> {{ products }}</pre>
    {{ product }}
    <TheWelcome />
  </main>
</template>
