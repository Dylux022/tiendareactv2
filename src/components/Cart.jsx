import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemove, onAdd }) => {
  if (!cartItems || cartItems.length === 0) {
    return <div className="container mt-4"><h3>El carrito está vacío.</h3></div>;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + (item.precio ? item.precio : 0) * item.cantidad,
    0
  );

  return (
    <div className="container mt-4">
      <h3>Carrito de compras</h3>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.nombre}</strong> <br />
              Cantidad: {item.cantidad} <br />
              Precio unitario: ${item.precio || 0}
            </div>
            <div>
              <button className="btn btn-sm btn-danger me-2" onClick={() => onRemove(item.id)}>-</button>
              <button className="btn btn-sm btn-success" onClick={() => onAdd(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="fw-bold mb-3">Total: ${total}</div>

      {/* Botón de checkout */}
      <Link to="/checkout" className="btn btn-success">
        Finalizar compra
      </Link>
    </div>
  );
};

export default Cart;
