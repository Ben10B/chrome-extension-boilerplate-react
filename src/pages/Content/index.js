import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
window.ScrapeExt = {
  title: '', price: '', image: '', notes: [], list: []
}
function scrapePrice() {
  let prices = [
    document.body.querySelector('.a-color-price'), // amazon.com
    document.body.querySelector('.finalPrice .sc-bqGGPW'), // lowes.com
    document.body.querySelector('.finalPrice'),
    document.body.querySelector('[itemprop=price]'),
    document.body.querySelector('.price'),
    document.body.querySelector('#price'),
  ];
  if (document.body && prices.filter(x => x !== null)) {
    let _price = prices.filter(x => x !== null)[0];
    if (_price.children.length > 0) window.ScrapeExt.price = _price.children.item(0).innerText;
    else if (_price) window.ScrapeExt.price = _price.innerText;
    return;
  } window.requestAnimationFrame(scrapePrice);
}
window.requestAnimationFrame(scrapePrice);
function scrapeTitle() {
  let titles = [
    document.body.querySelector('#productTitle'), // amazon.com
    document.body.querySelector('h1'),
  ];
  if (document.body && titles.filter(x => x !== null)) {
    let _title = titles.filter(x => x !== null)[0];
    if (_title.children.length > 0) window.ScrapeExt.title = _title.children.item(0).innerText;
    else if (_title) window.ScrapeExt.title = _title.innerText;
    return;
  } window.requestAnimationFrame(scrapeTitle);
}
window.requestAnimationFrame(scrapeTitle);
function scrapeImage() {
  if (document.body && document.body.getElementsByTagName('img')) {
    let productImages = document.body.getElementsByTagName('img');
    let mainImage = { height: 0, width: 0, src: "" };
    for (let i = 0; i < productImages.length; i++) {
      if (productImages.item(i).height > mainImage.height && productImages.item(i).width > mainImage.width) {
        mainImage = productImages.item(i);
      }
    }
    window.ScrapeExt.image = mainImage.src;
    return;
  } window.requestAnimationFrame(scrapeImage);
}
window.requestAnimationFrame(scrapeImage);

function changeImage(src) {
  window.ScrapeExt.image = src;
  chrome.runtime.sendMessage({ command: 'change-image', data: window.ScrapeExt })
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command === "scrape") {
    scrapeTitle();
    scrapePrice();
    scrapeImage();
    chrome.runtime.sendMessage({ command: 'scrape-finished', data: window.ScrapeExt })
  }
  if (msg.command === 'select-image') {
    changeImage(msg.data);
  }
});
