"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { products, updateProduct } = useProducts(null)
  const { categories } = useCategories()
  const product = products.data?.find((p) => p.id === id)
  const categoryList = categories.data ?? []

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [company, setCompany] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [sellerPhone, setSellerPhone] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(String(product.price))
      setCategoryId(product.categoryId)
      setCompany(product.company ?? "")
      setSellerName(product.sellerName ?? "")
      setSellerPhone(product.sellerPhone ?? "")
      setImage(product.image ?? "")
      setDescription(product.description ?? "")
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numPrice = parseFloat(price)
    if (!name.trim() || Number.isNaN(numPrice) || numPrice < 0 || !categoryId)
      return
    updateProduct.mutate(
      {
        id,
        data: {
          name: name.trim(),
          price: numPrice,
          categoryId,
          company: company.trim() || undefined,
          sellerName: sellerName.trim() || undefined,
          sellerPhone: sellerPhone.trim() || undefined,
          image: image.trim() || undefined,
          description: description.trim() || undefined,
        },
      },
      { onSuccess: () => router.push("/dashboard/products") }
    )
  }

  if (products.isLoading || !product) {
    return (
      <div>
        <Link href="/dashboard/products" className="text-sm text-muted-foreground hover:underline">← Back</Link>
        <p className="mt-4 text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/dashboard/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">← Back to products</Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Edit product</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update product details.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Price *</label>
          <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category *</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
            {categoryList.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Seller name</label>
          <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Seller phone</label>
          <input type="tel" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={updateProduct.isPending} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50">
            {updateProduct.isPending ? "Saving…" : "Save"}
          </button>
          <Link href="/dashboard/products" className="rounded-xl border border-border px-5 py-2.5 text-sm hover:bg-accent">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
