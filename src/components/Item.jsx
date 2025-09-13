import { Link } from 'react-router-dom';

const Item = ({ id, nombre, precio, imagenUrl, stock, agregarAlCarrito }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imagenUrl} className="card-img-top" alt={nombre} />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/item/${id}`}>{nombre}</Link>
        </h5>
        <p className="card-text">Precio: ${precio}</p>
        <p className="card-text">
          {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
        </p>
        <button
          className="btn btn-primary"
          onClick={agregarAlCarrito}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default Item;
