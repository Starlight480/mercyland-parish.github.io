/**
 * RCCG MercyLand Parish — Live Site Data Loader
 * ===============================================
 * Reads parish configuration from Firebase Firestore and updates
 * all tagged page elements automatically. No page reload needed.
 *
 * How elements are targeted:
 *   <span data-ml="pastor">Pastor Name</span>       ← text content replaced
 *   <a data-ml-href="driveUrl">Upload</a>            ← href replaced
 *   <input data-ml-val="bankName" />                 ← value replaced
 */

(function () {
  const COLLECTION = "parish";
  const DOC_ID = "config";

  /**
   * Fill a single field: text, href, or input value.
   */
  function fill(key, value) {
    if (!value) return;

    // Text content elements: data-ml="key"
    document.querySelectorAll(`[data-ml="${key}"]`).forEach(el => {
      el.textContent = value;
    });

    // Anchor href: data-ml-href="key"
    document.querySelectorAll(`[data-ml-href="${key}"]`).forEach(el => {
      el.href = value;
    });

    // Input / textarea value: data-ml-val="key"
    document.querySelectorAll(`[data-ml-val="${key}"]`).forEach(el => {
      el.value = value;
    });
  }

  /**
   * Apply all fields from the config document.
   */
  function applyConfig(data) {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => fill(key, value));

    // Special: show bank block if we have account info
    const bankBlock = document.getElementById("bank-details-block");
    if (bankBlock && data.bankName && data.acctNum) {
      bankBlock.style.display = "";
    }

    // Special: show service times block if set
    const sundayTimes = document.getElementById("sunday-times-block");
    if (sundayTimes && data.sunday1) {
      sundayTimes.style.display = "";
    }
  }

  /**
   * Load config from Firestore on page load.
   */
  window.addEventListener("DOMContentLoaded", async () => {
    if (!window.db) return; // Firebase not configured yet

    try {
      const snap = await window.db.collection(COLLECTION).doc(DOC_ID).get();
      if (snap.exists) {
        applyConfig(snap.data());
      }
    } catch (err) {
      console.error("[MercyLand] Could not load site data:", err);
    }
  });

  /**
   * Expose a global write helper used by admin.html
   */
  window.MercyLandAdmin = {
    async saveConfig(data) {
      if (!window.db) {
        alert("Firebase is not configured yet. Follow the setup steps in assets/js/firebase-init.js first.");
        return false;
      }
      try {
        await window.db
          .collection(COLLECTION)
          .doc(DOC_ID)
          .set(data, { merge: true });
        return true;
      } catch (err) {
        console.error("[MercyLand] Save failed:", err);
        alert("Save failed: " + err.message);
        return false;
      }
    },

    async loadConfig() {
      if (!window.db) return null;
      try {
        const snap = await window.db.collection(COLLECTION).doc(DOC_ID).get();
        return snap.exists ? snap.data() : {};
      } catch (err) {
        console.error("[MercyLand] Load failed:", err);
        return null;
      }
    }
  };
})();
