"use client"

import { useCategories } from "@/hooks/useCategories"
import { useState } from "react"

export default function CategoryForm() {
  const [name, setName] = useState("")
  const { addCategory } = useCategories()

  return (
    <div className="flex gap-2">
      <input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md border border-input px-3 py-2 text-sm"
      />
      <button
        type="button"
        onClick={() => addCategory.mutate({ name })}
        disabled={addCategory.isPending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {addCategory.isPending ? "Adding…" : "Add"}
      </button>
    </div>
  )
}
