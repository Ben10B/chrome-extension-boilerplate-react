import { useState, useRef, createRef } from 'react';
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
  const [list, setList] = useState('');
  const [lists, setLists] = useState<string[]>(product.lists);
  const noteInput = useRef<HTMLInputElement>(null);
  const listInput = useRef<HTMLInputElement>(null);

  const toggleMessage = () => setMessageMode(!messageMode);
  const addNote = () => {
    let temp = notes;
    if (note !== '') {
      temp.push(note);
      setNotes(temp);
      setNote('');
      noteInput.current?.focus();
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
  };
  const addList = () => {
    let temp = lists;
    if (list !== '') {
      temp.push(list);
      setLists(temp);
      setList('');
      listInput.current?.focus();
    }
  }
  const delList = (listIndex: number) => {
    let temp = lists;
    temp = temp.filter((x, index) => index !== listIndex);
    setLists(temp);
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
              {notes.map((x, index) => (
                <li key={index}>
                  <input type="text" defaultValue={x} onChange={(e) => onChangeNote(e.target.value, index)} />
                  <button onClick={() => delNote(index)}>Delete</button>
                </li>
              ))}
              <li>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} ref={noteInput} />
                <button onClick={addNote}>Add</button>
              </li>
            </ul>
          </div>
          <div className="input-wrapper">
            <label>Add to List:</label>
            <ul className="lists">
              {lists.map((x, index) => (
                <li className="list-item" key={index} value={x}>
                  <span>{x}</span><span className="del" onClick={() => delList(index)}>✖</span>
                </li>
              ))}
            </ul>
            <div>
              <input type="text" value={list} onChange={(e) => setList(e.target.value)} ref={listInput} />
              <button onClick={addList}>Add</button>
            </div>
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