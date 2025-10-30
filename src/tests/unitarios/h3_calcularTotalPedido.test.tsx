import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";

test("calcula y muestra el total del pedido al agregar productos", async () => {
  render(<App />);

  // Esperar a que se cargue el menú
  await waitFor(() => {
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  // Seleccionar botones "Agregar"
  const botonesAgregar = await screen.findAllByRole("button", {
    name: /agregar/i,
  });

  // agregar dos productos.
  fireEvent.click(botonesAgregar[1]); // Te $ 80
  fireEvent.click(botonesAgregar[3]); // Kaffee $ 135

  // Esperar y verificar el total (80 + 135 = $180)
  await waitFor(() => {
    expect(screen.getByText(/Total: \$215/i)).toBeInTheDocument();
  });
});
