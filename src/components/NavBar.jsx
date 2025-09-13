

import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

const NavBar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">Club del Ciclomotor</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/category/garelli">Repuestos Garelli</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/category/zanella">Repuestos Zanella</Link></li>
        </ul>
      </div>
      <div className="d-flex">
        <Link to="/cart">
          <CartWidget cartCount={cartCount} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
