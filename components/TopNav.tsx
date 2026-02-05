"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useSearchProducts } from "@/hooks/useSearchProducts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
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

function LogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-0.5" aria-hidden>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 rounded-sm bg-primary" />
      ))}
    </div>
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

  const submitSearch = () => {
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen((o) => !o)}
          className="shrink-0 md:hidden"
          aria-label="Menu"
        >
          <IconMenu />
        </Button>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-primary transition hover:opacity-90"
        >
          <LogoGrid />
          <span>B2B Core</span>
        </Link>
        <div className="relative hidden min-w-0 flex-1 max-w-md md:block">
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            <IconSearch />
          </span>
          <Input
            type="search"
            placeholder="Search for products, manufacturers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch()
            }}
            className="h-9 rounded-lg border-border bg-muted/50 pl-10 pr-20 focus:bg-background"
          />
          <Button
            type="button"
            size="sm"
            onClick={submitSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
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
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative px-3 py-2 text-sm font-semibold transition",
                pathname === href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
              {pathname === href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      {/* Mobile search */}
      <div className="relative max-w-md px-4 pb-2 md:hidden">
        <span className="pointer-events-none absolute left-7 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
          <IconSearch />
        </span>
        <Input
          type="search"
          placeholder="Search for products, manufacturers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch()
          }}
          className="h-9 rounded-lg border-border bg-muted/50 pl-10 pr-20 focus:bg-background"
        />
        <Button type="button" size="sm" onClick={submitSearch} className="absolute right-2 top-1/2 -translate-y-1/2">
          Search
        </Button>
        {debounced && (
          <div className="absolute top-full left-4 right-4 z-20 mt-1 max-h-72 overflow-auto rounded-lg border border-border bg-white py-1 shadow-xl">
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

      {menuOpen && (
        <div className="border-t border-border bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium",
                  pathname === href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                )}
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
