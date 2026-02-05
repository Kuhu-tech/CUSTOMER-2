"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchCategories,
  createCategory,
  updateCategory as updateCategoryFn,
  deleteCategory,
} from "@/services/crud"
import type { Category } from "@/types/category"

export const useCategories = () => {
  const qc = useQueryClient()

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const addCategory = useMutation({
    mutationFn: (data: { name: string; icon?: string }) => createCategory(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  })

  const updateCategory = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Pick<Category, "name" | "icon">>
    }) => updateCategoryFn(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  })

  const removeCategory = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  })

  return { categories, addCategory, updateCategory, removeCategory }
}
