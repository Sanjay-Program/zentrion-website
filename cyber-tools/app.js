/**
 * Global Utilities for Cyber Tools Suite
 */

const CyberUtils = {
  /**
   * Safely escapes HTML to prevent XSS
   * @param {string} str 
   * @returns {string}
   */
  escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Copies text to clipboard using the modern Clipboard API
   * @param {string} text 
   * @returns {Promise<boolean>}
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        this.showToast('Copied to clipboard!', 'success');
        return true;
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showToast('Copied to clipboard!', 'success');
        return true;
      }
    } catch (err) {
      this.showToast('Failed to copy', 'error');
      console.error('Copy failed:', err);
      return false;
    }
  },

  /**
   * Triggers a download of text content
   * @param {string} filename 
   * @param {string} text 
   */
  downloadText(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },

  /**
   * Formats bytes into human readable format
   * @param {number} bytes 
   * @param {number} decimals 
   * @returns {string}
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Validates input against basic rules
   * @param {string} input 
   * @param {boolean} allowEmpty 
   * @returns {boolean}
   */
  validateInput(input, allowEmpty = false) {
    if (input == null) return false;
    const trimmed = input.toString().trim();
    if (!allowEmpty && trimmed === '') return false;
    return true;
  },

  /**
   * Shows a toast notification
   * @param {string} message 
   * @param {'success' | 'error' | 'info'} type 
   */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${this.escapeHTML(message)}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  },

  /**
   * Sets loading state on a button and disables it
   * @param {HTMLButtonElement} btnEl 
   * @param {boolean} isLoading 
   * @param {string} defaultText 
   */
  setLoading(btnEl, isLoading, defaultText = 'Process') {
    if (!btnEl) return;
    if (isLoading) {
      btnEl.disabled = true;
      btnEl.dataset.originalText = btnEl.innerHTML;
      btnEl.innerHTML = '⏳ Processing...';
      btnEl.style.opacity = '0.7';
    } else {
      btnEl.disabled = false;
      btnEl.innerHTML = btnEl.dataset.originalText || defaultText;
      btnEl.style.opacity = '1';
    }
  },

  /**
   * Shows standard error in UI
   * @param {HTMLElement} resultEl 
   * @param {string} message 
   */
  showError(resultEl, message) {
    if (!resultEl) return;
    resultEl.classList.remove('empty');
    resultEl.innerHTML = `<span style="color: var(--c-danger);">⚠️ Error: ${this.escapeHTML(message)}</span>`;
    this.showToast(message, 'error');
  },

  /**
   * Clears a result element
   * @param {HTMLElement} resultEl 
   * @param {string} placeholderText 
   */
  clearResults(resultEl, placeholderText = 'Results will appear here...') {
    if (!resultEl) return;
    resultEl.classList.add('empty');
    resultEl.textContent = placeholderText;
  }
};

window.CyberUtils = CyberUtils;
