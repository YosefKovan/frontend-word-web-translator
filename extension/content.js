const MOCK_USER_ID = "user_12345abc";

document.addEventListener('dblclick', async (event) => {
  const selection = window.getSelection();
  const word = selection.toString().trim().toLowerCase();

  if (!word || word.includes(' ')) return;

  const context = selection.anchorNode.parentNode.innerText || "";

  const x = event.pageX;
  const y = event.pageY;

  showLoadingPopup(x, y);

  const duplicateCheck = await chrome.runtime.sendMessage({ 
    action: 'CHECK_DUPLICATE', word: word, userId: MOCK_USER_ID 
  });

  if (duplicateCheck.exists) {
    updatePopupToDuplicate(word);
    return;
  }

  const enrichedData = await chrome.runtime.sendMessage({ 
    action: 'ENRICH_WORD', word: word 
  });

  updatePopupToEnriched(enrichedData, context, x, y);
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

function updatePopupToDuplicate(word) {
  currentPopup.innerHTML = `
    <div class="wc-duplicate">
      <strong>${word}</strong> כבר שמורה אצלך! 😎
    </div>
  `;
  setTimeout(() => currentPopup.remove(), 2500);
}

function updatePopupToEnriched(data, context, x, y) {
  currentPopup.innerHTML = `
    <div class="wc-header">
      <span class="wc-word">${data.word}</span>
      <span class="wc-level">${data.difficulty_level}</span>
    </div>
    <div class="wc-translation">${data.translation}</div>
    <div class="wc-definition">${data.definition}</div>
    <button id="wc-save-btn">שמור למסלול שלי</button>
  `;

  document.getElementById('wc-save-btn').addEventListener('click', async () => {
    document.getElementById('wc-save-btn').innerText = "שומר...";
    
    const payload = {
      word: data.word,
      user_id: MOCK_USER_ID,
      source: "extension",
      context: context
    };

    const ingestResponse = await chrome.runtime.sendMessage({
      action: 'INGEST_WORD',
      payload: payload
    });

    if (ingestResponse.status === "created") {
      currentPopup.innerHTML = `<div class="wc-success">המילה נשמרה בהצלחה! 🎉</div>`;
      setTimeout(() => currentPopup.remove(), 2000);
    }
  });
}

document.addEventListener('mousedown', (e) => {
  if (currentPopup && !currentPopup.contains(e.target)) {
    currentPopup.remove();
    currentPopup = null;
  }
});