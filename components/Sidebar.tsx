"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/categories", label: "Categories" },
  { href: "/dashboard/products", label: "Products" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-5 py-5">
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tight text-foreground transition hover:opacity-90"
        >
          Dashboard
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
