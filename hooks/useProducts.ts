"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchProducts,
  getProductsByCategory,
  createProduct as createProductFn,
  updateProduct as updateProductFn,
  deleteProduct as deleteProductFn,
} from "@/services/crud"
import type { Product } from "@/types/product"

export const useProducts = (categoryId?: string | null) => {
  const qc = useQueryClient()
  const queryKey = categoryId
    ? ["products", "category", categoryId]
    : ["products"]

  const products = useQuery({
    queryKey,
    queryFn: () =>
      categoryId ? getProductsByCategory(categoryId) : fetchProducts(),
  })

  const createProduct = useMutation({
    mutationFn: (data: Omit<Product, "id" | "createdAt">) =>
      createProductFn(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const updateProduct = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<Product, "id" | "createdAt">>
    }) => updateProductFn(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const removeProduct = useMutation({
    mutationFn: deleteProductFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] })
    },
  })

  return {
    products,
    createProduct,
    updateProduct,
    removeProduct,
  }
}
