export interface Product {
  id: string
  name: string
  price: number
  categoryId: string
  company?: string
  sellerName?: string
  sellerPhone?: string
  image?: string
  description?: string
  createdAt?: { toMillis: () => number } | unknown
}
