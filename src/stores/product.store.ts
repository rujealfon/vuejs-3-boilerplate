import { defineStore } from 'pinia'
import ProductApi from '@/api/product.api'
import type { Product } from '@/models/product.model'

export const useProductStore = defineStore({
  id: 'product',

  state: () => ({
    products: [] as Product[],
    total: 0 as number,
    skip: 0 as number,
    limit: 0 as number,
    product: {} as Product
  }),

  actions: {
    async getProducts(params?: Record<string, string | number>) {
      // query
      const query: Record<string, string | number> = {
        skip: 0,
        limit: 10
      }

      // skip
      if (params && params.skip) {
        query.skip = params.skip
      }

      // limit
      if (params && params.limit) {
        query.limit = params.limit
      }

      try {
        const res = await ProductApi.get(query)

        this.products = res.data.products
        this.total = res.data.total
        this.skip = res.data.skip
        this.limit = res.data.limit

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async searchProducts(params: string | number) {
      // query
      const query = {
        q: params
      }

      try {
        const res = await ProductApi.search(query)

        this.products = res.data.products
        this.total = res.data.total
        this.skip = res.data.skip
        this.limit = res.data.limit

        return res.data
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async getProductById(id: number) {
      try {
        const res = await ProductApi.read(id)

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
