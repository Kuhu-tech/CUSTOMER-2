"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useSearchProducts } from "@/hooks/useSearchProducts"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/dashboard", label: "Dashboard" },
]

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function IconBell() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

export function TopNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState("")
  const [debounced, setDebounced] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: searchResults, isFetching } = useSearchProducts(debounced)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(t)
  }, [search])

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex shrink-0 items-center justify-center rounded p-2 text-foreground hover:bg-muted md:hidden"
          aria-label="Menu"
        >
          <IconMenu />
        </button>
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-primary transition hover:opacity-90"
        >
          B2B Core
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-3 py-2 text-sm font-semibold transition ${
                pathname === href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {pathname === href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          ))}
        </nav>
        <div className="relative min-w-0 flex-1 max-w-md">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <IconSearch />
          </span>
          <input
            type="search"
            placeholder="Search products or suppliers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                router.push(`/search?q=${encodeURIComponent(search.trim())}`)
              }
            }}
            className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {debounced && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-72 overflow-auto rounded-lg border border-border bg-white py-1 shadow-xl">
              {isFetching ? (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                  <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Searching…
                </div>
              ) : searchResults?.length ? (
                <ul className="py-1">
                  {searchResults.slice(0, 8).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}`}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setSearch("")}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-3 text-sm text-muted-foreground">No products found</p>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <IconBell />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
