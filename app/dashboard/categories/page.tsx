"use client"

import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"

export default function DashboardCategoriesPage() {
  const { categories, addCategory, updateCategory, removeCategory } =
    useCategories()
  const [newName, setNewName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const list = categories.data ?? []

  const handleCreate = () => {
    if (!newName.trim()) return
    addCategory.mutate(
      { name: newName.trim() },
      {
        onSuccess: () => {
          setNewName("")
          setSuccessMessage("Category saved to Firebase.")
          setTimeout(() => setSuccessMessage(null), 4000)
        },
        onError: () => {
          setSuccessMessage(null)
        },
      }
    )
  }

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return
    updateCategory.mutate(
      { id, data: { name: editName.trim() } },
      { onSuccess: () => { setEditingId(null); setEditName(""); } }
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this category?")) removeCategory.mutate(id)
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Categories</h1>
      <p className="mb-2 text-sm text-muted-foreground">Add, edit, or remove categories. All changes are saved to Firebase.</p>
      {successMessage && (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          {successMessage}
        </p>
      )}
      {addCategory.isError && (
        <p className="mb-4 text-sm font-medium text-destructive">
          {addCategory.error instanceof Error
            ? addCategory.error.message
            : String(addCategory.error)}
        </p>
      )}
      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="min-w-[200px] rounded-xl border border-input bg-background px-4 py-2.5 text-sm transition focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={addCategory.isPending}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
          aria-label="Create category and save to Firebase"
        >
          {addCategory.isPending ? "Saving to Firebase…" : "Create"}
        </button>
      </div>

      {categories.isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
            >
              {editingId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 rounded-lg border border-input px-3 py-2 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  <div className="ml-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdate(cat.id)}
                      className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setEditName(""); }}
                      className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(cat.id)
                        setEditName(cat.name)
                      }}
                      className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id)}
                      className="rounded-lg px-3 py-1.5 text-sm text-destructive transition hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
