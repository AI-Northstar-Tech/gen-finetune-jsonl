// add download button to the page
var downloadButton = document.createElement('button');
downloadButton.innerText = 'Download';
// give it a generic download icon
downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11h-4V5H8v6H4l8 8 8-8h-4z"/></svg>';
// insert in the DOM at the end of the line of buttons found by //button[contains(., 'View code')]
var xpath = "//button[contains(., 'View code')]";
var viewCodeButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (viewCodeButton) {
  viewCodeButton.parentNode.insertBefore(downloadButton, viewCodeButton.nextSibling);
}
// add event listener to the download button that runs the function in bookmarklet-code.js
downloadButton.addEventListener('click', async (event) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["bookmarklet-code.js"]
  });
});