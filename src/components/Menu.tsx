// componente que hace fetch("/api/productos") y renderiza <ul><li>

import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export default function Menu() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  return (
    <div>
      <h1>Menú de La Cafetería</h1>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
