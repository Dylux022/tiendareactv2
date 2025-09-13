import React, { useState } from 'react';

const ItemCount = ({ initial = 1, stock = 10, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleAdd = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleSub = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="d-flex flex-column align-items-center my-3">
      <div className="d-flex align-items-center mb-2">
        <button className="btn btn-secondary" onClick={handleSub}>-</button>
        <span className="mx-3">{count}</span>
        <button className="btn btn-secondary" onClick={handleAdd}>+</button>
      </div>
      <button className="btn btn-success" onClick={() => onAdd(count)}>
        Agregar {count} al carrito
      </button>
    </div>
  );
};

export default ItemCount;
