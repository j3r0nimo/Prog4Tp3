# Trabajo Práctico N° 3

---

## Generalidades

Simulador de Pedidos de Cafetería (TDD + React Testing Library + MSW)

---

## Instalación & ejecución del entorno

- Dentro de la carpeta cafeteria. (OJO!: Dentro de cafeteria)
- npm install
- npm run dev

---

## Ejecución del testing

- npm run test

---

## Carpetas src

| Carpeta    | Resumen de su propósito                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------- |
| components | Contiene el componente principal de la interfaz: Menu.tsx                                      |
| mocks      | Crea un contexto al proveer datos simulados, levanta el server de MSW, simula un backend real. |
| schemas    | Incluye los esquemas de validación de datos (construidos con Zod).                             |
| tests      | Agrupa las pruebas unitarias y de integración que verifican el comportamiento del sistema.     |

---

## Ciclo de testing 1. Preparación del entorno de mocks

- npm run test inicia el servicio de vitest. (es el mismo comando que npx vitest)
- El proceso revisa el archivo vite.config.ts, que entonces procesa el archivo (setupFiles: "./src/setupTests.ts")
- Antes de todos los tests (beforeAll), se levanta el mock server de MSW: server.listen();
- Entre tests (afterEach), se resetean los handlers para no arrastrar mocks de otros tests: server.resetHandlers();
- Al finalizar todos los tests (afterAll), se apaga el server: server.close();
- Objetivo: simular peticiones HTTP reales sin depender del backend.

---

## Ciclo de testing 2. Configuración del escenario

- Cada test puede redefinir cómo responderá el mock:
- por ejemplo, recibir un listado: http.get("/api/productos", () => HttpResponse.json([]))
- o recibir un error: http.get("/api/productos", () => HttpResponse.error())
- Objetivo: aislar el comportamiento del componente frente a distintos escenarios de red.

---

## Ciclo de testing 3. Render del componente

- Objetivo: montar el componente en un entorno DOM simulado (JSDOM) para observar su comportamiento.

```
render(<Menu />);
```

---

## Ciclo de testing 4. Esperar resultados asíncronos

- El componente probablemente hace un fetch al montar. Por eso se usa:
- await waitFor(() => expect(...).toBeInTheDocument());
- Objetivo: esperar a que el componente reaccione a la respuesta de la API mockeada (mostrar mensaje, lista, error, etc.).

---

## Bibliotecas & propósito

| Biblioteca                  | Proposito                    | Resumen                                                                                                                       |
| --------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| vitest                      | Ejecutor de pruebas          | Framework para pruebas con Vite. Los archivos de prueba tendrán un nombre como MyComponent.test.tsx.                          |
| @testing-library/react      | Component React para pruebas | Renderiza componentes y verifica lo que hay en la pantalla, simulando cómo vería un usuario la interfaz de usuario.           |
| @testing-library/user-event | Simula acciones de usuario   | Simula clicks, escritura, selección, etc., en las pruebas.                                                                    |
| @testing-library/jest-dom   | Comparadores personalizados  | Proporciona adicionales como toBeInTheDocument() o toHaveTextContent(), permitiendo que las pruebas sean mas fáciles de leer. |
| msw (Mock Service Worker)   | Simulador de API             | Permite simular llamadas a API REST o GraphQL durante las pruebas, por lo cual no se necesita un backend real.                |
| zod                         | Validación de esquema        | Valida y analiza datos, utilizada para garantizar que las respuestas de la API o las entradas de formulario sean correctas.   |

---

## Integrantes Grupo 11

- Jeronimo Baltian Ortiz
- Marcos Diaz
- Carlos Alberto Arce
- Jimena Martinez Arana
