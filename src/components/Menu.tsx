// componente para listado de productos
import { useEffect, useState } from 'react';
import type { Product } from '../types/product' ;
// la palabra type le dice al compilador que esto es solo un tipo, y que no se debe generar ningun import real en el JS final, sino intenta importar alg q  no exsiste en tiempo de ejecucion (solo exsiste en compilacion). se usa para checkeo de tipos no se traduce a JS 

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando menú...</div>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  );
}