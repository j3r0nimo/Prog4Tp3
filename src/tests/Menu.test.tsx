//test de visualizacion inicial de menu
// es test de integracion

import { render, screen } from '@testing-library/react';
import Menu from '../components/Menu';
import { OrderProvider } from '../context/OrderContext';
import { server } from '../mocks/server';
import { test, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

test('debe mostrar los productos del menú', async () => {
  render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  );
  expect(await screen.findByText(/Café con chocolate/i)).toBeInTheDocument();
});

// HU6 — lista vacía
test('muestra "No hay productos disponibles" cuando la API devuelve lista vacía', async () => {
  server.use(http.get('/api/menu', () => HttpResponse.json([], { status: 200 })));

  render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  );
  expect(await screen.findByText(/no hay productos disponibles/i)).toBeInTheDocument();
});

// HU6 — error 500
test('muestra "Error al cargar menú" cuando la API responde 500', async () => {
  server.use(http.get('/api/menu', () => new HttpResponse(null, { status: 500 })));

  render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  );
  expect(await screen.findByRole('alert')).toHaveTextContent(/error al cargar menú/i);
});
