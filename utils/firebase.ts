import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"

/** Build config at runtime so env vars are read when Firebase is first used (client-side) */
function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  }
}

function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be used in the browser (client-side)")
  }
  const config = getFirebaseConfig()
  if (!config.apiKey || !config.projectId) {
    throw new Error(
      "Missing Firebase env. Add NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID to .env.local and restart the dev server."
    )
  }
  if (getApps().length > 0) {
    return getApp() as FirebaseApp
  }
  return initializeApp(config)
}

let _db: Firestore | null = null

export function getDb(): Firestore {
  if (_db) return _db
  const app = getFirebaseApp()
  _db = getFirestore(app)
  return _db
}
