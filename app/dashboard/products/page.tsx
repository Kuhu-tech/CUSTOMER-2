"use client"

import Link from "next/link"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function DashboardProductsPage() {
  const { products, removeProduct } = useProducts(null)
  const { categories } = useCategories()
  const list = products.data ?? []
  const categoryList = categories.data ?? []

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) removeProduct.mutate(id)
  }

  const getCategoryName = (categoryId: string) =>
    categoryList.find((c) => c.id === categoryId)?.name ?? categoryId

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your product listings.</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          + Create product
        </Link>
      </div>

      {products.isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-muted-foreground">
          No products yet. Create one to get started.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id} className="border-b border-border/80 transition hover:bg-muted/20">
                    <td className="px-5 py-4 font-medium text-foreground">{p.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">${Number(p.price).toFixed(2)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{getCategoryName(p.categoryId)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.company ?? "—"}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/products/${p.id}/edit`}
                        className="mr-3 text-sm font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        className="text-sm font-medium text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
