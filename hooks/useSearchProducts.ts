"use client"

import { useQuery } from "@tanstack/react-query"
import { searchProducts } from "@/services/crud"

export const useSearchProducts = (searchQuery: string) => {
  const products = useQuery({
    queryKey: ["products", "search", searchQuery],
    queryFn: () => searchProducts(searchQuery),
    enabled: searchQuery.length > 0,
  })
  return products
}
