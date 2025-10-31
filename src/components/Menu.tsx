import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import type { Product } from '../types/product';

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Network error');
        const data = (await res.json()) as Product[];
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Cargando menú...</div>;
  if (error) return <div role="alert">Error al cargar menú</div>;
  if (products.length === 0) return <div>No hay productos disponibles</div>;

  return (
    <ul role="list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
