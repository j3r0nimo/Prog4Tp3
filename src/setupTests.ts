import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//config global de testing (MSW+ jest-dom)
// MSW: Mock Service Worker, para mockear llamadas a APIs en tests, desarrollo y testeo la app sin backend real. MSW intercepta llamadas HTTP y responde con datos mockeados definidos en endpoints en handlers.ts, data.ts contien los datos ficticios, y server.ts inicializa y configura el servidor MSW para tests.