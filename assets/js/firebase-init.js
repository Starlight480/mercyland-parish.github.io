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
  apiKey: "AIzaSyDOA4GH2PQo83yCRAAb7vEeaQzzyDnVT28",
  authDomain: "mercyland-parish.firebaseapp.com",
  projectId: "mercyland-parish",
  storageBucket: "mercyland-parish.firebasestorage.app",
  messagingSenderId: "710817403984",
  appId: "1:710817403984:web:61f67ae7599fb4b665ed55"
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
