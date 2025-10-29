// componente para listado de productos
import { useEffect, useState } from 'react';
import { Product } from '../types/product';

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