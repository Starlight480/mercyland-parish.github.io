/**
 * RCCG MercyLand Parish — Live Site Data Loader & Admin Engine
 * ==============================================================
 * Synchronizes website data from Firebase Firestore & LocalStorage
 * seamlessly across all pages.
 */

(function () {
  const COLLECTION = "parish";
  const DOC_ID = "config";
  const STORAGE_KEY = "mercyland_config";

  /**
   * Update all DOM elements with matching data-ml attributes
   */
  function fill(key, value) {
    if (!value || typeof value !== "string") return;
    const trimmed = value.trim();
    if (!trimmed) return;

    // 1. Text Content: data-ml="key"
    document.querySelectorAll(`[data-ml="${key}"]`).forEach(el => {
      // If element has a child .replace placeholder, replace content cleanly
      el.textContent = trimmed;
      el.classList.remove("replace");
    });

    // 2. Links & URLs: data-ml-href="key"
    document.querySelectorAll(`[data-ml-href="${key}"]`).forEach(el => {
      if (key === "phone") {
        el.href = `tel:${trimmed.replace(/[^\d+]/g, "")}`;
      } else if (key === "email") {
        el.href = `mailto:${trimmed}`;
      } else {
        el.href = trimmed;
      }
      el.classList.remove("replace");
    });

    // 3. Form input default values: data-ml-val="key"
    document.querySelectorAll(`[data-ml-val="${key}"]`).forEach(el => {
      el.value = trimmed;
    });
  }

  /**
   * Apply entire config object to current page
   */
  function applyConfig(data) {
    if (!data || typeof data !== "object") return;
    Object.entries(data).forEach(([key, val]) => {
      if (typeof val === "string") {
        fill(key, val);
      }
    });

    // Format specific UI sections if needed
    if (data.sunday1) {
      document.querySelectorAll("[data-ml-sunday-summary]").forEach(el => {
        el.textContent = data.sunday2 
          ? `1st Service: ${data.sunday1} · 2nd Service: ${data.sunday2}`
          : `Service Time: ${data.sunday1}`;
      });
    }

    // Social links visibility in footer if custom URLs provided
    const socialLinks = {
      facebook: data.facebook,
      youtube: data.youtube,
      instagram: data.instagram,
      whatsapp: data.whatsapp
    };
    const hasAnySocial = Object.values(socialLinks).some(Boolean);
    const socialContainer = document.getElementById("footer-social-links");
    if (socialContainer && hasAnySocial) {
      socialContainer.style.display = "flex";
      const placeholder = document.getElementById("footer-social-placeholder");
      if (placeholder) placeholder.style.display = "none";
    }
  }

  /**
   * Auto-run on page load: Apply cache immediately, then fetch from Firebase
   */
  function init() {
    // Phase 1: Immediate hydration from local cache
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        applyConfig(JSON.parse(cached));
      }
    } catch (e) {
      console.warn("[MercyLand] Could not read local cache:", e);
    }

    // Phase 2: Live sync from Firebase Firestore
    if (window.db) {
      window.db.collection(COLLECTION).doc(DOC_ID).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            applyConfig(data);
          }
        })
        .catch(err => {
          console.warn("[MercyLand] Firestore load warning:", err.message);
        });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /**
   * Global Admin API for saving and loading site data
   */
  window.MercyLandAdmin = {
    async saveConfig(newData) {
      // Merge with existing cached data
      let current = {};
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) current = JSON.parse(cached);
      } catch (e) {}

      const merged = { ...current, ...newData, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      applyConfig(merged);

      // Save to Firebase Firestore if connected
      if (window.db) {
        try {
          await window.db.collection(COLLECTION).doc(DOC_ID).set(merged, { merge: true });
          return { success: true, firestore: true };
        } catch (err) {
          console.error("[MercyLand] Firestore save error:", err);
          return { success: false, firestore: false, error: err.message, code: err.code };
        }
      } else {
        return { success: true, firestore: false, message: "Saved locally. Firebase not initialized." };
      }
    },

    async loadConfig() {
      // 1. Try Firebase first
      if (window.db) {
        try {
          const doc = await window.db.collection(COLLECTION).doc(DOC_ID).get();
          if (doc.exists) {
            const data = doc.data();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return data;
          }
        } catch (err) {
          console.warn("[MercyLand] Firestore loadConfig error:", err);
        }
      }

      // 2. Fallback to LocalStorage
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {}

      return {};
    }
  };
})();
