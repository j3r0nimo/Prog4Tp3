// handlers de MSW (qué responder cuando se llama a /api/productos)
//Define cómo MSW debe responder cuando el frontend hace requests a /api/menu y /api/orders.
// msw version 2.2 usa "http" en lugar de "rest"
import { http, HttpResponse} from "msw";
import { productsMock } from "./data";

export const handlers = [
  // Endpoint para obtener el menu
  http.get("/api/menu", () => {
    return HttpResponse.json(productsMock, { status: 200 });
  }),

  // Endpoint para enviar pedidos (simulado)
  http.post("/api/orders", () => {
    // simular que siempre confirma el pedido
    return HttpResponse.json({ message: "Pedido recibido" }, { status: 201 });
  }),


];