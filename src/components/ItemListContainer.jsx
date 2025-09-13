import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/config";


const ItemListContainer = ({ greeting, agregarAlCarrito }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productosRef = collection(db, "Productos");
    let q = productosRef;

    if (categoryId) {
      q = query(productosRef, where("categoria", "==", categoryId));
    }

    getDocs(q)
      .then((snapshot) => {
        const productos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(productos);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  console.log(items);


  return (
    <div className="container mt-4">
      <h2 className="text-center">{greeting}</h2>
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <ItemList agregarAlCarrito={agregarAlCarrito} productos={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
