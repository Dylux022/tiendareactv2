# Club del Ciclomotor - Tienda Online

## Descripción
Club del Ciclomotor es una tienda online donde se pueden ver productos para ciclomotores, agregarlos al carrito y finalizar la compra. Los productos y las órdenes se guardan en **Firebase**.

---

## Funcionalidades

- Ver listado de productos y filtrar por categoría.
- Ver detalle de cada producto con descripción, precio y stock.
- Seleccionar cantidad de productos con `ItemCount`.
- Agregar productos al carrito y modificar cantidades.
- Carrito muestra todos los productos y el total.
- Checkout con formulario de datos del comprador obligatorio.
- Al finalizar la compra:
  - Se crea la orden en Firebase.
  - Se descuenta el stock de los productos.
  - Se vacía el carrito y se muestra un mensaje de confirmación con el ID de la orden.

---

## Tecnologías utilizadas

- React
- Bootstrap para el diseño
- Firebase Firestore para la base de datos
- React Router para navegar entre secciones

---

## dominio del sitio

https://tiendareactv2.netlify.app/

