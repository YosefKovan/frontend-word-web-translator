const BASE_URL = 'http://localhost:3000';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.action === 'CHECK_DUPLICATE') {
    fetch(`${BASE_URL}/api/words/check-duplicate?word=${request.word}&user_id=${request.userId}`)
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true; 
  }

  if (request.action === 'ENRICH_WORD') {
    fetch(`${BASE_URL}/api/words/enrich?word=${request.word}&lang=he`)
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  if (request.action === 'INGEST_WORD') {
    fetch(`${BASE_URL}/api/words/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.payload)
    })
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
});