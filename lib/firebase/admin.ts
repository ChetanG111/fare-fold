import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  
  // Decoded from Base64 to ensure PEM integrity across all environments
  let privateKey = '';
  if (process.env.FIREBASE_PRIVATE_KEY_B64) {
    privateKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_B64, 'base64').toString('utf8');
  } else {
    // Fallback to standard env var if B64 is missing
    privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
  }

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('Firebase Admin initialized successfully');
    } catch (err) {
      console.error('CRITICAL: Firebase Admin initialization failed. Authentication and Firestore features will be unavailable.', err);
    }
  } else {
    console.warn('Firebase Admin NOT initialized - missing environment variables');
  }
}

let adminAuth: admin.auth.Auth | null = null;
let adminDb: admin.firestore.Firestore | null = null;

if (admin.apps.length > 0) {
  adminAuth = admin.auth();
  adminDb = admin.firestore();
}

export { adminAuth, adminDb };
