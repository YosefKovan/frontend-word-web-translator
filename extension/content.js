async function getOrCreateUserId() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['userId'], (result) => {
      if (result.userId) {
        resolve(result.userId);
      } else {
        const newId = "usr_" + Math.random().toString(36).substr(2, 9);
        chrome.storage.local.set({ userId: newId }, () => {
          console.log("נוצר יוזר חדש:", newId);
          resolve(newId);
        });
      }
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

  showLoadingPopup(x, y);

  const currentUserId = await getOrCreateUserId();

  const duplicateCheck = await chrome.runtime.sendMessage({ 
    action: 'CHECK_DUPLICATE', 
    word: word, 
    userId: currentUserId 
  });

  const enrichedData = await chrome.runtime.sendMessage({ 
    action: 'ENRICH_WORD', 
    word: word 
  });

  updatePopupToEnriched(enrichedData, context, x, y, currentUserId, duplicateCheck.exists);
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

function updatePopupToEnriched(data, context, x, y, currentUserId, isDuplicate) {
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
        context: context
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