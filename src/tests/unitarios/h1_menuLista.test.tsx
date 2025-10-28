import { render, screen, waitFor } from "@testing-library/react";
import App from "../../App";

test("muestra todos los productos como lista de items", async () => {
  render(<App />);

  // Espera hasta que haya al menos 1 <li> en el DOM
  await waitFor(() => {
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0); // hay al menos 1 producto
  });

  // Verificar nombres de productos usando regex para ignorar espacios extra
  const cafeItem = screen.getByText(/Cafe/i); // busca "Cafe" ignorando mayúsculas
  expect(cafeItem).toBeInTheDocument();

  const teItem = screen.getByText(/Te|Té/i); // <-- flexible con acento
  expect(teItem).toBeInTheDocument();
});
