import Link from "next/link"

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
      <p className="mb-8 text-muted-foreground">
        Manage categories and products. Anyone can add or edit.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/categories"
          className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          <span className="text-lg font-semibold text-foreground">Categories</span>
          <p className="mt-1 text-sm text-muted-foreground">View and manage categories</p>
          <span className="mt-4 text-sm font-medium text-primary group-hover:underline">Open →</span>
        </Link>
        <Link
          href="/dashboard/products"
          className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          <span className="text-lg font-semibold text-foreground">Products</span>
          <p className="mt-1 text-sm text-muted-foreground">View and manage products</p>
          <span className="mt-4 text-sm font-medium text-primary group-hover:underline">Open →</span>
        </Link>
      </div>
    </div>
  )
}
