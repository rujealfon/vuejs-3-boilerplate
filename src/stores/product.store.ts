import { defineStore } from 'pinia'
import ProductApi from '@/api/product.api'
import type { Product } from '@/models/product.model'

export const useProductStore = defineStore({
  id: 'product',

  state: () => ({
    products: [] as Product[],
    product: {} as Product
  }),

  // getters: {
  //   getProducts: (state) => state.products
  // },

  actions: {
    async getProducts(params?: Record<string, string | number>) {
      // query
      const query: Record<string, string | number> = {
        _page: 1,
        _limit: 3
      }

      // page
      if (params && params.page) {
        query._page = params.page
      }

      // limit
      if (params && params.per_page) {
        query._limit = params.per_page
      }

      try {
        const res = await ProductApi.search(query)

        this.products = res.data

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async getProductById(id: number) {
      try {
        const res = await ProductApi.detail(id)

        this.product = res.data

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async addProduct(payload: any) {
      try {
        const res = await ProductApi.create(payload)

        this.products.push(res.data)

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async updateProduct(payload: any) {
      try {
        const res = await ProductApi.update(payload)
        const index = this.products.findIndex(
          (product) => product.id === res.data.id
        )

        Object.assign(this.products[index], res)

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async deleteProduct(id: number) {
      try {
        const res = await ProductApi.delete(id)
        const index = this.products.findIndex((product) => product.id === id)

        this.products.splice(index, 1)

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }

  // persist: true
})
