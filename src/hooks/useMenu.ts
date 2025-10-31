import { useEffect, useState } from 'react';
import { ProductSchema, type Product } from '../types/product';


export function useMenu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        const parsed = ProductSchema.array().safeParse(data);
        if (parsed.success) setProducts(parsed.data);
        else setError('Error al cargar menú');
      })
      .catch(() => setError('Error al cargar menú'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}