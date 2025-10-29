// HU1: componente que hace fetch("/api/productos") y renderiza <ul><li>
// HU2: componente que

import { useEffect, useState } from "react";

interface Producto {
  id: string;
  name: string;
  price: number;
}

export default function Menu() {
  // Para el test HU1, para ver el menú
  const [productos, setProductos] = useState<Producto[]>([]);

  // Para el test HU2, para el pedido y la orden
  const [pedido, setPedido] = useState<Producto[]>([]);

  // Llamado a la API, que va al mock en components/handlers.ts
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  // Función para agregar productos
  const agregarItem = (producto: Producto) => {
    setPedido([...pedido, producto]);
  };

  // Ejercicio HU1: Se agrega un boton, que es para el HU2
  // Ejercicio HU2: <h2>Pedido</h2>
  return (
    <div>
      <h1>Menú de La Cafetería</h1>

      <ul data-testid="menu-list">
        {productos.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}{" "}
            <button onClick={() => agregarItem(p)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Pedido</h2>
      <ul role="list" data-testid="order-list">
        {pedido.map((item, index) => (
          <li key={index} role="listitem">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
