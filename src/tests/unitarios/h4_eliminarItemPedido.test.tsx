import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import App from "../../App";

test("el clic en 'Eliminar' remueve solo ese producto del pedido", async () => {
  render(<App />);

  // Espera a que los botones "Agregar" aparezcan
  const botonesAgregar = await waitFor(() => screen.getAllByText(/Agregar/i));
  expect(botonesAgregar.length).toBeGreaterThan(0);

  // Agrega dos productos (Cafe y Té)
  fireEvent.click(botonesAgregar[0]);
  fireEvent.click(botonesAgregar[1]);

  // Buscar solo los items dentro del pedido
  const orderList = screen.getByTestId("order-list");
  let itemsPedido = within(orderList).getAllByRole("listitem");
  expect(itemsPedido.length).toBe(2);

  // Clic en "Eliminar" del primero
  const botonesEliminar = screen.getAllByText(/Eliminar/i);
  fireEvent.click(botonesEliminar[0]);

  // Verifica que quede solo uno
  itemsPedido = within(orderList).getAllByRole("listitem");
  expect(itemsPedido.length).toBe(1);

  // El total sigue siendo visible
  const total = screen.getByText(/Total: \$\d+/i);
  expect(total).toBeInTheDocument();
});
