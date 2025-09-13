import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/config";


const ItemDetailContainer = ({ agregarAlCarrito }) => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "Productos", itemId);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setProducto({ id: docSnap.id, ...docSnap.data() });
      } else {
        setProducto(null);
      }
      setLoading(false);
    });
  }, [itemId]);

  if (loading) return <div>Cargando...</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return <ItemDetail producto={producto} agregarAlCarrito={agregarAlCarrito} />;
};

export default ItemDetailContainer;
