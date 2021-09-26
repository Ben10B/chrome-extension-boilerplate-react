import { useState, useEffect, useCallback } from 'react';
import '../pages/Popup/popup.css';
import { ProductPage, ProductTab } from '../interfaces/Default';
import React from 'react';

interface ProductScrapeProps {
  product: ProductPage;
  tab: ProductTab;
}

const ProductScrape = ({ product, tab }: ProductScrapeProps) => {
  const [editMode, setEditMode] = useState(false);
  const enterEditMode = () => {
    setEditMode(true);
    chrome.tabs.sendMessage(tab.id, { command: "highlight-images" });
  };
  const exitEditMode = () => {
    setEditMode(false);
    chrome.tabs.sendMessage(tab.id, { command: "unhighlight-images" });
  };

  return (
    <div className="product-info">
      <div className="main">
        <div className="main-image">
          <img src={product.image} alt={product.image} />
          {editMode ? <span className="edit" onClick={exitEditMode}>✅</span> :
            <span className="edit" onClick={enterEditMode}>🔁</span>}
        </div>
        <div className="main-details">
          <a className="favicon-url" href={tab.url} target="_blank">
            <img src={tab.favIconUrl} alt={tab.favIconUrl} />
          </a>
          <div className="input-wrapper">
            <label>Title</label>
            <input type="text" defaultValue={product.title} />
          </div>
          <div className="input-wrapper">
            <label>Price</label>
            <input type="text" defaultValue={product.price} />
          </div>
          <div className="input-wrapper">
            <label>Notes</label>
            <textarea placeholder="Details, Specs, Discounts, etc..." />
          </div>
          <div className="input-wrapper">
            <label>Add to List</label>
            <select>
              <option value=""></option>
              <option value="create">Create New List</option>
            </select>
          </div>
        </div>
      </div>
      <div className="notes">
        {editMode && <p className="">To change image, hover mouse over image then click the checkmark.</p>}
      </div>
    </div>
  )
}

export default ProductScrape;