/**
 * RCCG MercyLand Parish — Firebase Configuration
 * ================================================
 */

const firebaseConfig = {
  apiKey: "AIzaSyDOA4GH2PQo83yCRAAb7vEeaQzzyDnVT28",
  authDomain: "mercyland-parish.firebaseapp.com",
  projectId: "mercyland-parish",
  storageBucket: "mercyland-parish.firebasestorage.app",
  messagingSenderId: "710817403984",
  appId: "1:710817403984:web:61f67ae7599fb4b665ed55"
};

window.firebaseConfig = firebaseConfig;
window.db = null;

if (typeof firebase !== "undefined" && firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("REPLACE")) {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.firestore();
    console.log("[MercyLand] Firebase Firestore connected successfully.");
  } catch (err) {
    console.error("[MercyLand] Firebase initialization error:", err);
  }
} else {
  console.warn("[MercyLand] Firebase SDK not loaded or config missing.");
}
