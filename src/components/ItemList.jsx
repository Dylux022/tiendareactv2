// src/components/ItemList.jsx

import Item from './Item';

const ItemList = ({ agregarAlCarrito, productos }) => {
  // En el listado, agregar una unidad por defecto
  const handleAdd = (prod) => agregarAlCarrito(prod, 1);
  return (
    <div className="container mt-4">
      <div className="row g-3">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-3">
            <Item {...prod} agregarAlCarrito={() => handleAdd(prod)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
