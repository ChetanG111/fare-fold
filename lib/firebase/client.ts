import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
let auth: any = null;

if (typeof window !== 'undefined') {
  if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    (auth as any).isConfigured = true;
  } else {
    console.warn('Firebase Client NOT initialized - missing NEXT_PUBLIC_FIREBASE_API_KEY');
    // Export a dummy object that doesn't crash on 'app' access
    auth = new Proxy({}, {
      get: (target, prop) => {
        if (prop === 'isConfigured') return false;
        return undefined;
      }
    });
  }
}

export { app, auth };
