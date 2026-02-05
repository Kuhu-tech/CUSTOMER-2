"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useSearchProducts } from "@/hooks/useSearchProducts"
import { TopNav } from "@/components/TopNav"

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") ?? ""
  const { data: results, isFetching } = useSearchProducts(q)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Search {q ? `"${q}"` : ""}
      </h1>
      {isFetching ? (
        <div className="mt-8 flex items-center gap-3">
          <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Searching…</p>
        </div>
      ) : !results?.length ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {results.map((p) => (
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Suspense fallback={
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Search</h1>
          <div className="mt-8 flex items-center gap-3">
            <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading…</p>
          </div>
        </main>
      }>
        <SearchContent />
      </Suspense>
    </div>
  )
}
