import { useState, useEffect, useCallback } from 'react';
import '../pages/Popup/popup.css';
import { ProductPage, ProductTab } from '../interfaces/Default';
import React from 'react';

interface ProductScrapeProps {
  product: ProductPage;
  tab: ProductTab;
}

const ProductScrape = ({ product, tab }: ProductScrapeProps) => {
  return (
    <div className="product-info">
      <div className="main-image">
        <img src={product.image} alt={product.image} />
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
      </div>
    </div>
  )
}

export default ProductScrape;