"use client"

import Link from "next/link"
import { TopNav } from "@/components/TopNav"
import { useCategories } from "@/hooks/useCategories"

export default function CategoriesPage() {
  const { categories } = useCategories()
  const list = categories.data ?? []

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">All categories</h1>
        <p className="mt-2 text-muted-foreground">Click a category to see products under it.</p>
        {categories.isLoading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {list.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="rounded-xl border border-border bg-card p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="font-semibold text-foreground">{cat.name}</span>
                <p className="mt-1 text-sm text-muted-foreground">View products →</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
