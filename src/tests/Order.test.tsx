//test de agregar/eliminar productos al pedido , calcular el total
// es test unitario 
// src/tests/Order.test.tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../components/Menu';
import Order from '../components/Order';
import { OrderProvider } from '../context/OrderContext';
import App from '../App';
import {test, expect} from 'vitest';

//HU2
test('agregar producto actualiza el pedido y el total', async () => {
  render(
    <OrderProvider>
      <Menu />
      <Order />
    </OrderProvider>
  );

  // Esperar que cargue el menú
  const cafe = await screen.findByText(/Café con chocolate/i);
  expect(cafe).toBeInTheDocument();

  // Click en "Agregar" del primer producto
  const botonesAgregar = screen.getAllByText(/Agregar/i);
  await userEvent.click(botonesAgregar[0]);

  // Buscar la sección del pedido
  const pedidoSection = screen.getByRole('complementary'); // <aside> usa este rol semántico

  // Verificar que el producto está dentro del pedido
  const itemEnPedido = await within(pedidoSection).findByText(/Café con chocolate/i);
  expect(itemEnPedido).toBeInTheDocument();

  // Verificar que el total se actualiza
  const total = screen.getByRole('heading', { name: 'Total: $5000' });
  expect(total).toBeInTheDocument();

});
//HU3
test ('agreger multiples productos', async () => {
   render(<App />);

  // Esperar a que cargue el menú
  const cafe = await screen.findByText(/Café con chocolate/i);
  expect(cafe).toBeInTheDocument();

  const addButtons = screen.getAllByRole('button', { name: /agregar/i });
  // Agregar 2 productos conocidos: Café (5000) y Té (2500)
  await userEvent.click(addButtons[0]);
  await userEvent.click(addButtons[1]);

  // Buscar el área del pedido (aside)
  const pedido = screen.getByRole('complementary', { name: /tu pedido/i });

  // Verificar total: 5000 + 2500 = 7500
  within(pedido).getByRole('heading', { name: /total:\s*\$7500/i });
});

//H4

test('eliminar un ítem remueve solo ese producto y actualiza el total', async () => {
  render(<App />);

   const cafe = await screen.findByText(/Café con chocolate/i);
  expect(cafe).toBeInTheDocument();


  const addButtons = screen.getAllByRole('button', { name: /agregar/i });
  // Agrego Café (5000) y Té (2500)
  await userEvent.click(addButtons[0]);
  await userEvent.click(addButtons[1]);


  const pedido = screen.getByRole('complementary', { name: /tu pedido/i });
  within(pedido).getByRole('heading', { name: /total:\s*\$7500/i });

  // Eliminar solo "Café con chocolate"
  const eliminarCafe = within(pedido).getByRole('button', {
    name: /eliminar café con chocolate/i,
  });
  await userEvent.click(eliminarCafe);

  // Debe quedar solo el Té (2500)
  within(pedido).getByRole('heading', { name: /total:\s*\$2500/i });
  expect(within(pedido).queryByText(/café con chocolate/i)).toBeNull();
});
//HU5
test('envía el pedido, muestra confirmación y limpia el estado', async () => {
  render(<App />);

  const cafe = await screen.findByText(/Café con chocolate/i);
  expect(cafe).toBeInTheDocument();

  const addButtons = screen.getAllByRole('button', { name: /agregar/i });
  await userEvent.click(addButtons[0]);
  await userEvent.click(addButtons[1]);

const enviar = screen.getByRole('button', { name: /enviar pedido/i });
  await userEvent.click(enviar);

const ok = await screen.findByRole('status');
expect(ok).toHaveTextContent(/pedido confirmado/i);


  expect(screen.queryByRole('complementary', { name: /tu pedido/i })).toBeNull();
});