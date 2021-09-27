import React, { useState, useEffect, useCallback } from 'react';
import './popup.css';
import { ProductTab, ProductPage } from '../../interfaces/Default';
import Loader from '../../components/Loader';
import ProductScrape from '../../components/ProductScrape';

const Popup = () => {
  const [tab, setTab] = useState<ProductTab | null>(null);
  const [product, setProduct] = useState<ProductPage | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = {
        id: (typeof tabs[0].id === 'number') ? tabs[0].id : 0,
        title: (typeof tabs[0].title === 'string') ? tabs[0].title : 'Unknown',
        url: (typeof tabs[0].url === 'string') ? tabs[0].url : 'Unknown',
        favIconUrl: (typeof tabs[0].favIconUrl === 'string') ? tabs[0].favIconUrl : 'Unknown'
      };
      setTab(activeTab);
      scrape(activeTab);
    });
  }, [setTab]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      if (msg.command === 'scrape-finished') setProduct(msg.data);
      if (msg.command === 'change-image') setProduct(msg.data);
    });
    return () => {
      chrome.runtime.onMessage.removeListener((msg, sender, response) => { });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let activeTab = {
          id: (typeof tabs[0].id === 'number') ? tabs[0].id : 0
        };
        chrome.tabs.sendMessage(activeTab.id, { command: "unhighlight-images" });
      });
    }
  }, [setProduct]);

  const scrape = useCallback((activeTab) => {
    chrome.tabs.sendMessage(activeTab.id, { command: "scrape" });
  }, []);

  return (product && tab) ?
    (
      <div className="App">
        <ProductScrape product={product} tab={tab} />
        <div style={{ marginTop: '10px' }}>
          <button>Save</button>
        </div>
      </div>
    ) : <div className="App"><Loader /></div>
};

export default Popup;
