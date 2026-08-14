/**
 * RCCG MercyLand Parish — Firebase Configuration
 * ================================================
 * SETUP INSTRUCTIONS (One-time, ~5 minutes):
 *
 * 1. Go to https://console.firebase.google.com
 * 2. Click "Add project" → name it "mercyland-parish" → Continue
 * 3. Disable Google Analytics (optional) → Create project
 * 4. In the project dashboard, click the </> Web icon to add a web app
 * 5. Register app name "mercyland-site" → click "Register app"
 * 6. Copy the firebaseConfig object shown and REPLACE the placeholder below
 * 7. Go to Build → Firestore Database → Create database
 *    → Start in "test mode" → pick any region (e.g. europe-west1) → Enable
 * 8. Push this file to GitHub — the site will then be live-connected!
 */

// REPLACE this entire object with YOUR Firebase project config:
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Initialize Firebase (only if config has been filled in)
let db = null;
if (!firebaseConfig.apiKey.startsWith("REPLACE")) {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log("[MercyLand] Firebase connected.");
} else {
  console.warn("[MercyLand] Firebase not yet configured. Open assets/js/firebase-init.js and follow the setup instructions.");
}
