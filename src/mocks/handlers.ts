// handlers de MSW (qué responder cuando se llama a /api/productos)

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/productos", () => {
    return HttpResponse.json([
      { id: 1, name: "Cafe", price: 100 },
      { id: 2, name: "Té", price: 80 },
      { id: 3, name: "Coffe", price: 115 },
      { id: 4, name: "Kaffee", price: 135 },
    ]);
  }),
];
