document.getElementById('scrape-button').addEventListener('click', scrapeProductData);

function scrapeProductData() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const url = tabs[0].url;
        if (url.startsWith('https://www.amazon.com/')) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
            });
        } else {
            alert('Please open an Amazon product page to scrape data.');
        }
    });
}
