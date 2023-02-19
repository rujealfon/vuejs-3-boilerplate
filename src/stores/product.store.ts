import { defineStore } from 'pinia'
import Product from '@/api/product.api'

export const useProductStore = defineStore({
  id: 'product',

  state: () => ({
    products: []
  }),

  // getters: {
  //   getProducts: (state) => state.products
  // },

  actions: {
    async getProducts() {
      try {
        const res = await Product.search()
        this.products = res
        return res
      } catch (err) {
        return err
      }
    },

    async getProductById(id: number) {
      try {
        const res = await Product.detail(id)
        this.products = res
        return res
      } catch (err) {
        return err
      }
    },

    async addProduct(payload: any) {
      try {
        const res = await Product.create(payload)
        this.products = res
        return res
      } catch (err) {
        return err
      }
    },

    async updateProduct(payload: any) {
      try {
        const res = await Product.update(payload)
        this.products = res
        return res
      } catch (err) {
        return err
      }
    },

    async deleteProduct(id: number) {
      try {
        const res = await Product.delete(id)
        this.products = res
        return res
      } catch (err) {
        return err
      }
    }
  }

  // persist: true
})
