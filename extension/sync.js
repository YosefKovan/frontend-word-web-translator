// Runs only on localhost:5173 — syncs auth data from the app's localStorage to chrome.storage.local
// so the extension can access it on any other website.

function syncAuthToStorage() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  chrome.storage.local.set({ token, userId });
  console.log('[WordCatcher sync] token:', token ? 'found' : 'null', '| userId:', userId ? 'found' : 'null');
}

// Sync on page load
syncAuthToStorage();

// Sync whenever localStorage changes (e.g. login / logout)
window.addEventListener('storage', syncAuthToStorage);
