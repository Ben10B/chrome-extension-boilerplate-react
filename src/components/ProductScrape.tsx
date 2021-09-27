import { useState } from 'react';
import '../pages/Popup/popup.css';
import { ProductPage, ProductTab } from '../interfaces/Default';
import React from 'react';

interface ProductScrapeProps {
  product: ProductPage;
  tab: ProductTab;
}

const ProductScrape = ({ product, tab }: ProductScrapeProps) => {
  const [messageMode, setMessageMode] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>(product.notes);
  const toggleMessage = () => setMessageMode(!messageMode);
  const addNote = () => {
    let temp = notes;
    if (note !== '') {
      temp.push(note);
      setNotes(temp);
      setNote('');
    }
  };
  const delNote = (noteIndex: number) => {
    let temp = notes;
    temp = temp.filter((x, index) => index !== noteIndex);
    setNotes(temp);
  };
  const onChangeNote = (value: string, index: number) => {
    let temp = notes;
    temp[index] = value;
    setNotes(temp);
  }
  return (
    <div className="product-info">
      <div className="main">
        <div className="main-image">
          <img src={product.image} alt={product.image} />
          <span className="edit" onClick={toggleMessage}>❔</span>
        </div>
        <div className="main-details">
          <a className="favicon-url" href={tab.url} target="_blank">
            <img src={tab.favIconUrl} alt={tab.favIconUrl} />
          </a>
          <div className="input-wrapper">
            <label>Title:</label>
            <input type="text" defaultValue={product.title} />
          </div>
          <div className="input-wrapper">
            <label>Price:</label>
            <input type="text" defaultValue={product.price} />
          </div>
          <div className="input-wrapper">
            <label>Notes:</label>
            <ul className="notes">
              <li>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                <button onClick={addNote}>Add</button>
              </li>
              {notes.map((x, index) => (
                <li key={index}>
                  <input type="text" defaultValue={x} onChange={(e) => onChangeNote(e.target.value, index)} />
                  <button onClick={() => delNote(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="input-wrapper">
            <label>Add to List:</label>
            <select>
              <option value=""></option>
              <option value="create">Create New List</option>
            </select>
          </div>
        </div>
      </div>
      <div className="messages">
        {messageMode && <p className="">To change image, right-click preferred image then click 'Select image for product'.</p>}
      </div>
    </div>
  )
}

export default ProductScrape;