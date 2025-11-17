//Test flujo completo, de integracion, test principal

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import App from "../App";

test("flujo completo: carga menú, agrega item, calcula total, envía pedido y resetea UI", async () => {
  render(<App />);

  // 1) Cargar menú desde mock
  const itemMenu = await screen.findByText(/Café con chocolate/i);
  expect(itemMenu).toBeInTheDocument();

  // 2) Agregar producto al pedido
  const botonAgregar = screen.getAllByRole("button", { name: /agregar/i })[0];
  await userEvent.click(botonAgregar);

  // 3) Verificar que aparece en el área del pedido
  const pedido = screen.getByRole('complementary', { name: /tu pedido/i });
  expect(pedido).toHaveTextContent(/Café con chocolate/i);

  // 4) Total actualizado
  expect(pedido).toHaveTextContent(/Total:\s*\$5000/i);

  // 5) Enviar pedido (el handler POST ya está en src/mocks/handlers.ts)
  const btnEnviar = screen.getByRole("button", { name: /enviar pedido/i });
  await userEvent.click(btnEnviar);

  // 6) Esperar confirmación y verificar que el pedido se limpió
  const confirmacion = await screen.findByRole('status');
  expect(confirmacion).toHaveTextContent(/pedido confirmado/i);

  // 7) El aside del pedido ya no existe (UI reseteada)
  await waitFor(() => {
    expect(screen.queryByRole('complementary', { name: /tu pedido/i })).toBeNull();
  });
});
