/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT: Pédagogie Prompt
   FILE: utils.js v1.0
   CONTEXT: Standalone - Fonctions utilitaires
   LAST UPDATE: 2025-12-25
   DISC: D
   DEPENDENCIES: Aucune
   ═══════════════════════════════════════════════════════════════════════════ */

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

async function copyToClipboard(text) {
  // Méthode moderne
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch(e) {
      // Fallback si échec (file://, permissions...)
    }
  }
  
  // Fallback textarea
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, 99999);
  
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch(e) {
    success = false;
  }
  
  document.body.removeChild(ta);
  return success;
}

function downloadAsFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
