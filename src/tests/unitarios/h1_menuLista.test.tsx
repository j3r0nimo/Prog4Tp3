import { render, screen, waitFor, within } from "@testing-library/react";
import App from "../../App";

test("muestra todos los productos como lista de items", async () => {
  render(<App />);

  // Espera hasta que haya al menos 1 <li> en el DOM
  await waitFor(() => {
    const items = screen.getAllByRole("listitem");
    // hay al menos 1 producto
    expect(items.length).toBeGreaterThan(0);
  });

  // Verificar nombres de productos usando regex para ignorar espacios extra

  // Restringir el ámbito de las consultas, que solo busque en el menú
  const menuList = screen.getByTestId("menu-list");

  // busca "Cafe" ignorando mayúsculas
  const cafeItem = within(menuList).getByText(/Cafe/i);
  expect(cafeItem).toBeInTheDocument();

  // <-- flexible con acento
  const teItem = within(menuList).getByText(/Te|Té/i);
  expect(teItem).toBeInTheDocument();
});
