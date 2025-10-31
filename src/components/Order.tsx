//componente para el area del pedido
//muestra prods agregados al pedidio, total y un botn para enviar el pedido
import React, { useState } from 'react';
import { useOrder } from '../hooks/useOrder';

export default function Order() {
  const { order, removeFromOrder, clearOrder, total } = useOrder();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const enviarPedido = async () => {
    try {
      setStatus('loading');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: order, total }),
      });
      if (!res.ok) throw new Error('Error');
      const data = await res.json() as { message?: string };
      clearOrder();
      setServerMessage(data?.message ?? 'Pedido confirmado');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <div role="status">{serverMessage ?? 'Pedido confirmado'}</div>;
  }

  if (order.length === 0) {
    return <div>No hay productos en el pedido.</div>;
  }

  return (
    <aside aria-labelledby="pedido-heading">
      <h2 id="pedido-heading">Tu pedido</h2>
      <ul role="list">
        {order.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.name} - ${item.price}
            <button
              style={{ marginLeft: 8 }}
              onClick={() => removeFromOrder(item.id)}
              aria-label={`Eliminar ${item.name}`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => clearOrder()} disabled={status === 'loading'}>Vaciar pedido</button>
        <button onClick={enviarPedido} disabled={status === 'loading'} style={{ marginLeft: 8 }}>
          {status === 'loading' ? 'Enviando...' : 'Enviar pedido'}
        </button>
        {status === 'error' && (
          <div role="alert" style={{ color: 'crimson', marginTop: 8 }}>
            Error al enviar pedido
          </div>
        )}
      </div>
    </aside>
  );
}