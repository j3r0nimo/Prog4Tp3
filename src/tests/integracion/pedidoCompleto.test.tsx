import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "../../App";

test("flujo completo: carga menú, agrega ítems, calcula total, envía pedido y resetea interfaz", async () => {
    render(<App />);

    // 1) Cargar menú mockeado
    const botonesAgregar = await screen.findAllByText("Agregar");
    expect(botonesAgregar.length).toBeGreaterThan(0);

    // 2) Agregar ítems al pedido
    fireEvent.click(botonesAgregar[0]);
    fireEvent.click(botonesAgregar[1]);

    // 3) Verificar total calculado dinámicamente
    const total = await screen.findByText(/Total: \$\d+/i);
    expect(total).toBeInTheDocument();

    // 4) Enviar pedido (POST mock)
    const botonEnviar = screen.getByText("Enviar pedido");
    fireEvent.click(botonEnviar);

    // 5) Esperar confirmación y resetear interfaz
    await waitFor(() => {
        expect(screen.getByText("Pedido confirmado")).toBeInTheDocument();
    });
    const listaPedido = screen.getByTestId("order-list");
    const itemsRestantes = within(listaPedido).queryAllByRole("listitem");
    expect(itemsRestantes.length).toBe(0);
});