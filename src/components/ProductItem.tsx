//componente para cada producto

import type { Product } from '../types/product';
import { useOrder } from '../hooks/useOrder';

export default function ProductItem({ product }: { product: Product }) {
  const { addToOrder } = useOrder();

  return (
    <li>
      {product.name} - ${product.price}
      <button onClick={() => addToOrder(product)}>Agregar</button>
    </li>
  );
}
