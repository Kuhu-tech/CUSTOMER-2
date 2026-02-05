"use client"

import Link from "next/link"
import { useState } from "react"
import { TopNav } from "@/components/TopNav"
import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/* Category icons: grid (All Deals), lightning (Electronics), hanger (Apparel), gear (Industrial), home (Home & Garden), cross (Healthcare) */
const iconAllDeals = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)
const categoryIcons: Record<string, React.ReactNode> = {
  electronics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  apparel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M6 2v6l4 2 4-2V2" />
      <path d="M4 22h16" />
      <path d="M8 22v-4l4-2 4 2v4" />
      <path d="M12 10v12" />
    </svg>
  ),
  industrial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  "home & garden": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  healthcare: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <path d="M12 2v20M2 12h20" />
      <path d="M12 8v8M8 12h8" />
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
  if (key.includes("apparel") || key.includes("textile")) return categoryIcons.apparel
  if (key.includes("industrial")) return categoryIcons.industrial
  if (key.includes("home") || key.includes("garden")) return categoryIcons["home & garden"]
  if (key.includes("health")) return categoryIcons.healthcare
  return categoryIcons.default
}

function ProductCard({ product, isFav, onToggleFav }: { product: Product; isFav: boolean; onToggleFav: (e: React.MouseEvent) => void }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
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
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={(e) => onToggleFav(e)}
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-white"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={isFav ? "text-red-500" : "text-muted-foreground"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Button>
        </div>
        <CardContent className="flex flex-1 flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.company || "—"}
          </p>
          <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] font-semibold text-foreground">
            {product.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ${Number(product.price).toFixed(2)} / unit
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Min. order: —
          </p>
          <span className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            View Details
          </span>
        </CardContent>
      </Link>
    </Card>
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

      {/* Hero */}
      <section className="relative min-h-[320px] w-full overflow-hidden bg-[#1e3a5f] md:min-h-[380px]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605745341112-85918b700319?w=1600')",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 md:py-24">
          <span className="mb-4 inline-block w-fit rounded bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
            B2B MARKETPLACE FOR SMALL BUSINESS
          </span>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Source directly from{" "}
            <span className="text-[#7eb8da]">Global Manufacturers.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
            Connect with 200,000+ verified wholesale suppliers across 50+ industrial categories.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="px-6" asChild>
              <Link href="/categories">Get Quotes Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white bg-transparent px-6 text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/dashboard">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {/* Category tabs */}
        <section className="mb-8 border-b border-border">
          <div className="flex gap-1 overflow-x-auto pb-0">
            <Link
              href="/categories"
              onClick={() => setActiveCategoryId(null)}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition",
                activeCategoryId === null
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {iconAllDeals}
              All Deals
            </Link>
            {categories.isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-24 shrink-0 animate-pulse rounded bg-muted" />
              ))
            ) : (
              categoryList.map((cat) => {
                const isActive = activeCategoryId === cat.id
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {getCategoryIcon(cat.name)}
                    {cat.name}
                  </Link>
                )
              })
            )}
          </div>
        </section>

        {/* Featured Wholesale Products */}
        <section>
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Featured Wholesale Products
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Direct from manufacturers and verified distributors
              </p>
            </div>
            <Link
              href="/categories"
              className="mt-2 shrink-0 text-sm font-semibold text-primary hover:underline sm:mt-0"
            >
              See all products →
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

        {/* CTA blocks */}
        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-primary text-primary-foreground">
            <CardContent className="relative z-10 px-6 py-8 md:px-8 md:py-10">
              <h3 className="text-xl font-bold">Post Your Requirement</h3>
              <p className="mt-2 text-sm opacity-90">
                Get immediate quotes from top verified suppliers for your specific business needs.
              </p>
              <Button variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/search">Post Requirement</Link>
              </Button>
            </CardContent>
            <svg className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
          </Card>
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-[#0f172a] text-white">
            <CardContent className="relative z-10 px-6 py-8 md:px-8 md:py-10">
              <h3 className="text-xl font-bold">Global Shipping Support</h3>
              <p className="mt-2 text-sm text-white/90">
                End-to-end logistics and customs clearance support for international orders.
              </p>
              <Button variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">Learn More</Link>
              </Button>
            </CardContent>
            <svg className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <span className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-sm bg-primary" />
                  ))}
                </span>
                B2B Core
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                The world&apos;s largest B2B wholesale marketplace connecting global buyers with verified manufacturers and suppliers.
              </p>
              <div className="mt-4 flex gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.214 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
                </a>
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Share">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Buyers</h4>
              <nav className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/search" className="text-foreground hover:text-primary">Post Requirement</Link>
                <Link href="/categories" className="text-foreground hover:text-primary">Search Products</Link>
                <Link href="/privacy" className="text-foreground hover:text-primary">Buyer Protection</Link>
                <Link href="/categories" className="text-foreground hover:text-primary">Bulk Orders</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suppliers</h4>
              <nav className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/dashboard" className="text-foreground hover:text-primary">Sell on B2B Core</Link>
                <Link href="/dashboard" className="text-foreground hover:text-primary">Seller Dashboard</Link>
                <Link href="/contact" className="text-foreground hover:text-primary">Membership Plans</Link>
                <Link href="/contact" className="text-foreground hover:text-primary">Trade Assurance</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support</h4>
              <nav className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/contact" className="text-foreground hover:text-primary">Help Center</Link>
                <Link href="/privacy" className="text-foreground hover:text-primary">Safety Tips</Link>
                <Link href="/privacy" className="text-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="/contact" className="text-foreground hover:text-primary">Contact Us</Link>
              </nav>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} B2B Core Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground">Sustainable Trading</Link>
              <Link href="/categories" className="text-xs text-muted-foreground hover:text-foreground">Global Network</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
