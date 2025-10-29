// setup del server de MSW para Node (tests)

import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// MSW: Mock Service Worker, para mockear llamadas a APIs en tests, desarrollo y testeo la app sin backend real. MSW intercepta llamadas HTTP y responde con datos mockeados definidos en endpoints en handlers.ts, data.ts contien los datos ficticios, y server.ts inicializa y configura el servidor MSW para tests.