import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import Menu from "../../components/Menu";

test("el clic en 'Enviar pedido' envía el pedido y muestra 'Pedido confirmado'", async () => {
  render(<Menu />);

  // Esperar el menú cargado
  const botonesAgregar = await screen.findAllByText("Agregar");

  // Agregar dos ítems
  fireEvent.click(botonesAgregar[0]);
  fireEvent.click(botonesAgregar[1]);

  // Verificar que el pedido tiene dos ítems
  const listaPedido = screen.getByTestId("order-list");
  const itemsPedidoAntes = within(listaPedido).getAllByRole("listitem");
  expect(itemsPedidoAntes.length).toBe(2);

  // Clic en "Enviar pedido"
  const botonEnviar = screen.getByText("Enviar pedido");
  fireEvent.click(botonEnviar);

  // Esperar mensaje de confirmación
  await waitFor(() =>
    expect(screen.getByText("Pedido confirmado")).toBeInTheDocument()
  );

  // Verificar que se limpió el estado (pedido vacío)
  const itemsPedidoDespues = within(listaPedido).queryAllByRole("listitem");
  expect(itemsPedidoDespues.length).toBe(0);
});
