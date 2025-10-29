import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App";

describe("Agregar ítem al pedido", () => {
  it("debe agregar un producto al pedido cuando se hace clic en 'Agregar'", async () => {
    render(<App />);

    // 1. Esperar a que aparezca el primer producto en el menú
    await screen.findByText(/Cafe/i);

    // 2. Buscar el boton Agregar de ese producto
    const botonAgregar = screen.getAllByRole("button", { name: /agregar/i })[0];

    // 3. Click
    fireEvent.click(botonAgregar);

    // 4. Verificar que la lista de pedidos tiene un itme por lo menos
    const listaPedido = screen.getByTestId("order-list");
    const items = within(listaPedido).getAllByRole("listitem");

    expect(items.length).toBeGreaterThan(0);
    expect(items[0].textContent).toContain("Cafe");
  });
});
