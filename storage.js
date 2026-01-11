const CDS_Storage = {
  useWindowStorage: typeof window.storage !== 'undefined',
  
  /**
   * Recupere une valeur du storage
   * @param {string} key - Cle storage
   * @returns {Promise<any|null>} Valeur parsee ou null
   */
  async get(key) {
    if (this.useWindowStorage) {
      try {
        const result = await window.storage.get(key);
        return result ? JSON.parse(result.value) : null;
      } catch (e) {
        console.warn(`Storage get error (${key}):`, e);
        return null;
      }
    } else {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.warn(`LocalStorage get error (${key}):`, e);
        return null;
      }
    }
  },
  
  /**
   * Enregistre une valeur dans le storage
   * @param {string} key - Cle storage
   * @param {any} value - Valeur a enregistrer (sera JSONifiee)
   * @returns {Promise<boolean>} Succes operation
   */
  async set(key, value) {
    const jsonStr = JSON.stringify(value);
    
    if (this.useWindowStorage) {
      try {
        await window.storage.set(key, jsonStr);
        return true;
      } catch (e) {
        console.warn(`Storage set error (${key}):`, e);
        return false;
      }
    } else {
      try {
        localStorage.setItem(key, jsonStr);
        return true;
      } catch (e) {
        console.warn(`LocalStorage set error (${key}):`, e);
        return false;
      }
    }
  },
  
  /**
   * Supprime une cle du storage
   * @param {string} key - Cle a supprimer
   * @returns {Promise<boolean>} Succes operation
   */
  async delete(key) {
    if (this.useWindowStorage) {
      try {
        await window.storage.delete(key);
        return true;
      } catch (e) {
        console.warn(`Storage delete error (${key}):`, e);
        return false;
      }
    } else {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.warn(`LocalStorage delete error (${key}):`, e);
        return false;
      }
    }
  },
  
  /**
   * Verifie si une cle existe
   * @param {string} key - Cle a verifier
   * @returns {Promise<boolean>} Existence
   */
  async has(key) {
    const value = await this.get(key);
    return value !== null;
  },
  
  /**
   * Vide completement le storage
   * @returns {Promise<boolean>} Succes operation
   */
  async clear() {
    if (this.useWindowStorage) {
      try {
        const keys = await window.storage.list();
        for (const key of keys.keys) {
          await window.storage.delete(key);
        }
        return true;
      } catch (e) {
        console.warn('Storage clear error:', e);
        return false;
      }
    } else {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.warn('LocalStorage clear error:', e);
        return false;
      }
    }
  },
  
  /**
   * Liste toutes les cles disponibles
   * @param {string} prefix - Prefixe optionnel pour filtrer
   * @returns {Promise<string[]>} Liste cles
   */
  async keys(prefix = null) {
    if (this.useWindowStorage) {
      try {
        const result = await window.storage.list(prefix || undefined);
        return result.keys || [];
      } catch (e) {
        console.warn('Storage keys error:', e);
        return [];
      }
    } else {
      try {
        const allKeys = Object.keys(localStorage);
        return prefix ? allKeys.filter(k => k.startsWith(prefix)) : allKeys;
      } catch (e) {
        console.warn('LocalStorage keys error:', e);
        return [];
      }
    }
  }
};

// Export pour modules ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CDS_Storage;
}
