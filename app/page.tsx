"use client"

import Link from "next/link"
import { useState } from "react"
import { TopNav } from "@/components/TopNav"
import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types/product"

/* Category icons: monitor (Electronics), gear (Industrial), hanger (Textiles) */
const categoryIcons: Record<string, React.ReactNode> = {
  electronics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  industrial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  textiles: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M6 2v6l4 2 4-2V2" />
      <path d="M4 22h16" />
      <path d="M8 22v-4l4-2 4 2v4" />
      <path d="M12 10v12" />
    </svg>
  ),
  default: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    </svg>
  ),
}

function getCategoryIcon(name: string) {
  const key = name.toLowerCase()
  if (key.includes("electronic")) return categoryIcons.electronics
  if (key.includes("industrial")) return categoryIcons.industrial
  if (key.includes("textile")) return categoryIcons.textiles
  return categoryIcons.default
}

function ProductCard({ product, isFav, onToggleFav }: { product: Product; isFav: boolean; onToggleFav: (e: React.MouseEvent) => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-md transition hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <span className="text-sm">No image</span>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => onToggleFav(e)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={isFav ? "text-red-500" : "text-gray-400"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.company || "—"}
          </p>
          <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] font-semibold text-foreground">
            {product.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ${Number(product.price).toFixed(2)} / unit
          </p>
          <span className="mt-4 inline-flex justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            View Details
          </span>
        </div>
      </Link>
    </div>
  )
}

export default function Home() {
  const { categories } = useCategories()
  const { products } = useProducts(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categoryList = categories.data ?? []
  const productList = products.data ?? []
  const featured = productList.slice(0, 4)

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {/* Category chips */}
        <section className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap">
            {categories.isLoading ? (
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-11 w-28 animate-pulse rounded-full bg-muted" />
                ))}
              </div>
            ) : (
              categoryList.map((cat) => {
                const isActive = activeCategoryId === cat.id
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow"
                        : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {getCategoryIcon(cat.name)}
                    {cat.name}
                  </Link>
                )
              })
            )}
          </div>
        </section>

        {/* Featured Wholesale */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Featured Wholesale
            </h2>
            <Link
              href="/categories"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See all
            </Link>
          </div>
          {products.isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-muted-foreground">
              No products yet. Add some from the Dashboard.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFav={favorites.has(p.id)}
                  onToggleFav={(e) => toggleFav(e, p.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </nav>
          <div className="mt-6 flex justify-center gap-2">
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Language">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Share">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Help">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} B2B Core Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
