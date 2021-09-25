console.log('This is the background page.');
console.log('Put the background scripts here.');

// chrome.runtime.onMessage.addListener(receiver);

// function receiver(request, sender, sendResponse) {
//   console.log(request)
// }

let color = '#3aa757';
let site = "https://ibenjammin.com";
let mainImageSrc = "";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: reddenPage
//   });
// });

// function reddenPage() {
//   document.body.style.backgroundColor = 'red';
// }
