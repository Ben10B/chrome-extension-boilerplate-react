console.log('This is the background page.');
console.log('Put the background scripts here.');

const contextMenu = {
  'select.image': {
    contexts: ['image'],
    title: 'Select image for product'
  }
};

chrome.runtime.onInstalled.addListener(function () {
  for (const key of Object.keys(contextMenu)) {
    chrome.contextMenus.create({
      id: key,
      type: 'normal',
      title: contextMenu[key].title,
      contexts: contextMenu[key].contexts
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'select.image') {
    chrome.tabs.sendMessage(tab.id, { command: 'select-image', data: info.srcUrl })
  }
});