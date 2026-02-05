# Firebase setup

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase project values from [Firebase Console](https://console.firebase.google.com) → Project settings → General → Your apps.

## 2. Firestore (we are not using security rules for now)

For the app to read/write data, Firestore needs to allow it. Right now we are **not using** restrictive rules.

- Open [Firebase Console](https://console.firebase.google.com) → your project → **Firestore Database** → **Rules**.
- Paste the contents of `firestore.rules` from this project (open read/write for development).
- Click **Publish**.

After that, create category and products will save to Firebase.
