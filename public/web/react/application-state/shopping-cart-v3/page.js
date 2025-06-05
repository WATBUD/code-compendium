"use client";
import React, { useState, useMemo } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editingData, setEditingData] = useState(null); 

  const totalAmount = useMemo(() => {
    return data.reduce((total, item) => 
    {
      if(editingData && editingData.id===item.id){
         
        return total + editingData.price;
      }
      return total + item.price;
    },0)
  },[data,editingData])
  
  const totalAmount3 = useMemo(() => {
    return data.reduce((total, item) => 
    {
      return total + item.price;
    }, 0)
  },[data]);

  const totalAmount4 =data.reduce((total, item) => 
    {
      return total + item.price;
    },0)//initialValue

  const addData = () => {
    if (title.trim() === "" || price.trim() === "") return;
    setData([
      ...data,
      { id: Date.now(), title: title, price: parseFloat(price) },
    ]);
  };
  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const saveEdit = () => {
    if (editingData) {
      setData(
        data.map((item) =>
          item.id === editingData.id ? { ...editingData } : item
        )
      );
    }
    setEditingData(null);
  };

  const editingTitleChange = (e) => {
    setEditingData({ ...editingData, title: e.target.value });
  };

  const editingPriceChange = (e) => {
    setEditingData({ ...editingData, price: parseFloat(e.target.value) });
  };

  const editData = (item) => {
    setEditingData({ ...item}); 
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addData}>Add</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {editingData?.id === item.id ? (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={editingData.title}
                  onChange={editingTitleChange}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editingData.price}
                  onChange={editingPriceChange}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={()=>setEditingData(null)}>Cancel</button>
              </>
            ) : (
              <div>
                {`${item.title} : ${item.price} `}
                <button onClick={() => editData(item)}>Edit</button>
                <button onClick={() => deleteData(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Total: {totalAmount}</h2>
    </div>
  );
}
