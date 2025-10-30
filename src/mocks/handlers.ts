// handlers de MSW (qué responder cuando se llama a /api/productos)

import { http, HttpResponse } from "msw";
import type { Product } from "../schemas/productSchema";

export const handlers = [
  // Mock para cumplir con el response de datos
  http.get("/api/productos", () => {
    return HttpResponse.json([
      { id: 1, name: "Cafe", price: 100 },
      { id: 2, name: "Té", price: 80 },
      { id: 3, name: "Coffe", price: 115 },
      { id: 4, name: "Kaffee", price: 135 },
    ]);
  }),

  // Mock para enviar pedido
  http.post("/api/orders", async ({ request }) => {
    const body = (await request.json()) as Product[];

    if (!Array.isArray(body) || body.length === 0) {
      return HttpResponse.json({ message: "Pedido vacío" }, { status: 400 });
    }

    return HttpResponse.json({ message: "Pedido confirmado" });
  }),
];
