"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function NewProductPage() {
  const router = useRouter()
  const { createProduct } = useProducts(null)
  const { categories } = useCategories()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [company, setCompany] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [sellerPhone, setSellerPhone] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const categoryList = categories.data ?? []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numPrice = parseFloat(price)
    if (!name.trim() || Number.isNaN(numPrice) || numPrice < 0 || !categoryId)
      return
    createProduct.mutate(
      {
        name: name.trim(),
        price: numPrice,
        categoryId,
        company: company.trim() || undefined,
        sellerName: sellerName.trim() || undefined,
        sellerPhone: sellerPhone.trim() || undefined,
        image: image.trim() || undefined,
        description: description.trim() || undefined,
      },
      { onSuccess: () => router.push("/dashboard/products") }
    )
  }

  return (
    <div>
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        ← Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Create product</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a new product listing.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Price *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select category</option>
            {categoryList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Seller name</label>
          <input
            type="text"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Seller phone</label>
          <input
            type="tel"
            value={sellerPhone}
            onChange={(e) => setSellerPhone(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={createProduct.isPending}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
          >
            {createProduct.isPending ? "Creating…" : "Create"}
          </button>
          <Link
            href="/dashboard/products"
            className="rounded-xl border border-border px-5 py-2.5 text-sm hover:bg-accent"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
