import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartContext } from './context/CartContext';

function App() {
  const { cartItems, cartCount, addToCart, removeFromCart, addUnit} = useContext(CartContext);

  return (
    <BrowserRouter>
      <NavBar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="¡Bienvenido al Club del Ciclomotor!" agregarAlCarrito={addToCart} />}
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer agregarAlCarrito={addToCart} />}
        />
        <Route
          path="/item/:itemId"
          element={<ItemDetailContainer agregarAlCarrito={addToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} onRemove={removeFromCart} onAdd={addUnit} />}
        />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
