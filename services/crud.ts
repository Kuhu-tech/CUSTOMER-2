import { getDb } from "@/utils/firebase"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  Timestamp,
  getDoc,
} from "firebase/firestore"
import type { Category } from "@/types/category"
import type { Product } from "@/types/product"
import type { UserProfile } from "@/types/user"

/* ------------------ Categories ------------------ */
export const fetchCategories = async (): Promise<Category[]> => {
  const db = getDb()
  const snap = await getDocs(collection(db, "categories"))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Category[]
}

/** Create a category and save to Firebase `categories` collection */
export const createCategory = async (data: {
  name: string
  icon?: string
}) => {
  try {
    const db = getDb()
    const docData: Record<string, unknown> = {
      name: data.name.trim(),
      createdAt: Timestamp.now(),
    }
    if (data.icon != null && data.icon !== "") {
      docData.icon = data.icon
    }
    const ref = await addDoc(collection(db, "categories"), docData)
    return ref.id
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("permission") || message.includes("PERMISSION_DENIED")) {
      throw new Error("Firestore permission denied. In Firebase Console → Firestore → Rules, allow read, write for 'categories' (see firestore.rules in this project).")
    }
    throw err
  }
}

export const updateCategory = async (
  id: string,
  data: Partial<Pick<Category, "name" | "icon">>
) => {
  const db = getDb()
  await updateDoc(doc(db, "categories", id), data as Record<string, unknown>)
}

export const deleteCategory = async (id: string) => {
  const db = getDb()
  await deleteDoc(doc(db, "categories", id))
}

/* ------------------ Products ------------------ */
export const fetchProducts = async (): Promise<Product[]> => {
  const db = getDb()
  const snap = await getDocs(collection(db, "products"))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[]
}

export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const db = getDb()
  const q = query(
    collection(db, "products"),
    where("categoryId", "==", categoryId)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[]
}

export const searchProducts = async (searchQuery: string): Promise<Product[]> => {
  if (!searchQuery.trim()) return fetchProducts()
  const db = getDb()
  const snap = await getDocs(collection(db, "products"))
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[]
  const q = searchQuery.toLowerCase()
  return list.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.company && p.company.toLowerCase().includes(q))
  )
}

export const createProduct = async (data: Omit<Product, "id" | "createdAt">) => {
  const db = getDb()
  const ref = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: Timestamp.now(),
  })
  return ref.id
}

export const updateProduct = async (
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
) => {
  const db = getDb()
  await updateDoc(doc(db, "products", id), data as Record<string, unknown>)
}

export const deleteProduct = async (id: string) => {
  const db = getDb()
  await deleteDoc(doc(db, "products", id))
}

/* ------------------ Users (Profile) ------------------ */
