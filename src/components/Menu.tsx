// HU1: componente que hace el fetch("/api/productos") y renderiza <ul><li>
// HU2: componente que crea la lista de pedidos
// HU3: componente que calcula el total dinamicamente, cuando agrego o quito productos
// HU4: componente que permite eliminar un ítem del pedido

import React, { useEffect, useState } from "react";
import type { Product } from "../schemas/productSchema";

export default function Menu() {
  const [productos, setProductos] = useState<Product[]>([]); // Para el test HU1, para ver el menú

  const [pedido, setPedido] = useState<Product[]>([]); // Para el test HU2, para el pedido y la orden

  const [total, setTotal] = useState<number>(0); // Para el test HU3, para el calculo dinamico de costos

  const [mensaje, setMensaje] = useState<string | null>(null); // Para confirmar el estado del Pedido

  // Llamado a la API para traer los datos simulados, desde handlers.ts
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  // Función para agregar productos
  const agregarItem = (producto: Product) => {
    setPedido((prevPedido) => {
      const nuevoPedido = [...prevPedido, producto];
      calcularTotal(nuevoPedido);
      return nuevoPedido;
    });
  };

  const calcularTotal = (pedidoActual: Product[]) => {
    const nuevoTotal = pedidoActual.reduce((acc, item) => acc + item.price, 0);
    setTotal(nuevoTotal);
  };

  // Función para eliminar productos
  const eliminarItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // evita conflictos si hay botones anidados
    setPedido((prevPedido) => {
      const nuevoPedido = prevPedido.filter((_, i) => i !== index);
      calcularTotal(nuevoPedido);
      return nuevoPedido;
    });
  };

  // Boton Enviar Pedido
  const enviarPedido = async () => {
    if (pedido.length === 0) return;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) throw new Error("Error al enviar pedido");

      setPedido([]);
      setTotal(0);
      setMensaje("Pedido confirmado");
    } catch (err) {
      console.error(err);
    }
  };

  // Ejercicio HU1: <ul data-testid="menu-list">
  // Ejercicio HU2: <h2>Pedido</h2>
  // Ejercicio HU3: <h3>Total: ${total}</h3>
  // Ejercicio HU4: <button>Eliminar</button>
  // Ejercicio HU5:
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
            {item.name} - ${item.price}{" "}
            <button onClick={(e) => eliminarItem(index, e)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={enviarPedido}>Enviar pedido</button>

      <h3>Total: ${total}</h3>

      {mensaje && <p>{mensaje}</p>}
      
    </div>
  );
}
