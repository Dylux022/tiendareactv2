import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/config';

const Checkout = () => {
  const { cartItems = [], vaciarCarrito } = useContext(CartContext);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ordenCreada, setOrdenCreada] = useState(false);
  const [ordenId, setOrdenId] = useState('');
  const [procesando, setProcesando] = useState(false);

  // Total protegido si cartItems es undefined
  const total = cartItems?.reduce(
    (acc, item) => acc + (item.precio ? item.precio : 0) * item.cantidad,
    0
  ) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!nombre.trim() || !email.trim() || !telefono.trim()) {
      alert('Por favor, completa todos los campos antes de finalizar la compra.');
      return;
    }

    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    setProcesando(true);

    const nuevaOrden = {
      comprador: { nombre, email, telefono },
      items: cartItems,
      total,
      fecha: new Date()
    };

    try {
      // 1️⃣ Crear la orden en Firestore
      const docRef = await addDoc(collection(db, 'ordenes'), nuevaOrden);

      // 2️⃣ Descontar stock de cada producto
      for (const item of cartItems) {
        const productRef = doc(db, 'Productos', item.id);
        await updateDoc(productRef, {
          stock: item.stock - item.cantidad
        });
      }

      // 3️⃣ Vaciar carrito
      vaciarCarrito();

      // 4️⃣ Guardar ID de la orden y mostrar mensaje de éxito
      setOrdenId(docRef.id);
      setOrdenCreada(true);

    } catch (error) {
      console.error('Error creando la orden:', error);
      alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  // Render condicional: mostrar mensaje de orden creada
  if (ordenCreada) {
    return (
      <div className="container mt-4">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido creada con ID: <strong>{ordenId}</strong></p>
      </div>
    );
  }

  // Formulario de checkout
  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="tel"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 fw-bold">Total a pagar: ${total}</div>
        <button type="submit" className="btn btn-success" disabled={procesando}>
          {procesando ? 'Procesando...' : 'Finalizar Compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
