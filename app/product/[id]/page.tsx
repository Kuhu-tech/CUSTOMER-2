"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { TopNav } from "@/components/TopNav"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { products } = useProducts(null)
  const { categories } = useCategories()
  const product = products.data?.find((p) => p.id === id)
  const category = product
    ? categories.data?.find((c) => c.id === product.categoryId)
    : null

  if (products.isLoading || !product) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading product…</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          ← Back to Home
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-muted text-muted-foreground">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {category && (
              <span className="text-sm font-medium text-muted-foreground">
                {category.name}
              </span>
            )}
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-primary">
              ${Number(product.price).toFixed(2)}
              <span className="ml-1 text-lg font-normal text-muted-foreground">/ unit</span>
            </p>
            {product.description && (
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-8 rounded-xl border border-border bg-muted/20 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Seller / Contact
              </h2>
              <dl className="mt-4 space-y-4">
                {product.sellerName && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{product.sellerName}</dd>
                  </div>
                )}
                {product.company && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Company</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{product.company}</dd>
                  </div>
                )}
                {product.sellerPhone && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${product.sellerPhone}`}
                        className="font-medium text-primary transition hover:underline"
                      >
                        {product.sellerPhone}
                      </a>
                    </dd>
                  </div>
                )}
                {!product.sellerName && !product.company && !product.sellerPhone && (
                  <p className="text-sm text-muted-foreground">No seller contact added.</p>
                )}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
