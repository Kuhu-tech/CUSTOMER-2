"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { TopNav } from "@/components/TopNav"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string
  const { products } = useProducts(categoryId)
  const { categories } = useCategories()
  const category = categories.data?.find((c) => c.id === categoryId)
  const productList = products.data ?? []

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/categories" className="text-muted-foreground transition hover:text-foreground">
            ← All categories
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/" className="text-muted-foreground transition hover:text-foreground">
            Home
          </Link>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          {category?.name ?? "Category"}
        </h1>

        {products.isLoading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-muted-foreground">
            No products in this category.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {productList.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="line-clamp-2 font-semibold text-foreground">{p.name}</p>
                  <p className="mt-1 font-medium text-primary">${Number(p.price).toFixed(2)}</p>
                  {p.company && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.company}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
