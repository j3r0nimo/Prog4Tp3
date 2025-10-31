import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import Menu from "../../components/Menu";

test("muestra mensaje de error al fallar la API", async () => {  

  server.use(
    http.get("/api/productos", () => {
      return new HttpResponse("Error interno", { status: 500 });
    })
  );

  render(<Menu />);

  await waitFor(() =>
    expect(screen.getByText("Error al cargar el menú")).toBeInTheDocument()
  );
});

test("muestra mensaje 'No hay productos disponibles' cuando la lista está vacía", async () => {  
  server.use(
    http.get("/api/productos", () => {
      return HttpResponse.json([]);
    })
  );

  render(<Menu />);

  await waitFor(() =>
    expect(screen.getByText("No hay productos disponibles")).toBeInTheDocument()
  );
});
