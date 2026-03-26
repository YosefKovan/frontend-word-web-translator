const BASE_URL = 'https://data1-words-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + request.token);

  if (request.action === 'CHECK_DUPLICATE') {
    fetch(`${BASE_URL}/api/words/check-duplicate?word=${request.word}&user_id=${request.userId}`, { headers })
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true; 
  }

  if (request.action === 'ENRICH_WORD') {
    fetch(`${BASE_URL}/api/words/enrich?word=${request.word}&lang=he`, { headers })
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  if (request.action === 'INGEST_WORD') {
    fetch(`${BASE_URL}/api/words/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + request.payload.token },
      body: JSON.stringify(request.payload)
    })
      .then(res => res.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
});