const CartWidget = ({ cartCount }) => {
  return (
    <button type="button" className="btn btn-outline-light position-relative">
      🛒
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default CartWidget;
