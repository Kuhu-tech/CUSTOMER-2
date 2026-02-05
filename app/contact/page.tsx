import Link from "next/link"
import { TopNav } from "@/components/TopNav"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="mt-4 text-muted-foreground">Get in touch. Placeholder content.</p>
        <Link href="/" className="mt-6 inline-block text-sm text-primary hover:underline">← Home</Link>
      </main>
    </div>
  )
}
