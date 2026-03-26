function getAuthData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['token', 'userId'], (result) => {
      resolve({ token: result.token || null, userId: result.userId || null });
    });
  });
}

document.addEventListener('dblclick', async (event) => {
  const selection = window.getSelection();
  const word = selection.toString().trim().toLowerCase();

  if (!word || word.includes(' ')) return;

  const context = selection.anchorNode.parentNode.innerText || "";

  const x = event.pageX;
  const y = event.pageY;

  const { token, userId } = await getAuthData();
  console.log('[WordCatcher] token:', token ? 'found' : 'null', '| userId:', userId ? 'found' : 'null');

  if (!token || !userId) {
    showLoginRequiredPopup(x, y);
    return;
  }

  showLoadingPopup(x, y);

  const duplicateCheck = await chrome.runtime.sendMessage({
    action: 'CHECK_DUPLICATE',
    word: word,
    userId: userId,
    token: token
  });

  const enrichedData = await chrome.runtime.sendMessage({
    action: 'ENRICH_WORD',
    word: word,
    token: token
  });

  updatePopupToEnriched(enrichedData, context, x, y, userId, token, duplicateCheck.exists);
});


let currentPopup = null;

function createBasePopup(x, y) {
  if (currentPopup) currentPopup.remove();
  currentPopup = document.createElement('div');
  currentPopup.className = 'word-catcher-popup';
  currentPopup.style.left = `${x}px`;
  currentPopup.style.top = `${y + 20}px`;
  document.body.appendChild(currentPopup);
}

function showLoadingPopup(x, y) {
  createBasePopup(x, y);
  currentPopup.innerHTML = `<div class="wc-loader">טוען נתונים...</div>`;
}

function showLoginRequiredPopup(x, y) {
  createBasePopup(x, y);
  currentPopup.innerHTML = `<div class="wc-loader">יש להתחבר כדי לשמור מילים</div>`;
}

function updatePopupToEnriched(data, context, x, y, currentUserId, webToken, isDuplicate) {
  const buttonHtml = isDuplicate
    ? `<button id="wc-save-btn" disabled style="background: #10b981; cursor: default; box-shadow: none;">כבר שמור אצלך ✔️</button>`
    : `<button id="wc-save-btn">שמור למסלול שלי</button>`;

  currentPopup.innerHTML = `
    <div class="wc-header">
      <span class="wc-word">${data.word}</span>
      <span class="wc-level">${data.difficulty_level || 'B2'}</span>
    </div>
    <div class="wc-translation">${data.translation}</div>
    <div class="wc-definition">${data.definition}</div>
    ${buttonHtml}
  `;

  if (!isDuplicate) {
    document.getElementById('wc-save-btn').addEventListener('click', async () => {
      const btn = document.getElementById('wc-save-btn');
      btn.innerText = "שומר...";
      btn.disabled = true;
      
      const payload = {
        word: data.word,
        user_id: currentUserId, 
        source: "extension",
        context: context,
        token: webToken
      };

      const ingestResponse = await chrome.runtime.sendMessage({
        action: 'INGEST_WORD',
        payload: payload
      });

      if (ingestResponse && ingestResponse.status === "created") {
        currentPopup.innerHTML = `<div class="wc-success">המילה נשמרה בהצלחה! 🎉</div>`;
        setTimeout(() => {
          if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
          }
        }, 2000);
      } else {
        btn.innerText = "שגיאה, נסה שוב";
        btn.disabled = false;
      }
    });
  }
}

document.addEventListener('mousedown', (e) => {
  if (currentPopup && !currentPopup.contains(e.target)) {
    currentPopup.remove();
    currentPopup = null;
  }
});