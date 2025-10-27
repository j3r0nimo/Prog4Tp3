# Trabajo Práctico N° 3

## Generalidades

Simulador de Pedidos de Cafetería (TDD + React Testing Library + MSW)

## Bibliotecas & propósito

| Biblioteca                  | Proposito                    | Resumen                                                                                                                       |
| --------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| vitest                      | Ejecutor de pruebas          | Framework para pruebas con Vite. Los archivos de prueba tendrán un nombre como MyComponent.test.tsx.                          |
| @testing-library/react      | Component React para pruebas | Renderiza componentes y verifica lo que hay en la pantalla, simulando cómo vería un usuario la interfaz de usuario.           |
| @testing-library/user-event | Simula acciones de usuario   | Simula clicks, escritura, selección, etc., en las pruebas.                                                                    |
| @testing-library/jest-dom   | Comparadores personalizados  | Proporciona adicionales como toBeInTheDocument() o toHaveTextContent(), permitiendo que las pruebas sean mas fáciles de leer. |
| msw (Mock Service Worker)   | Simulador de API             | Permite simular llamadas a API REST o GraphQL durante las pruebas, por lo cual no se necesita un backend real.                |
| zod                         | Validación de esquema        | Valida y analiza datos, utilizada para garantizar que las respuestas de la API o las entradas de formulario sean correctas.   |

## Integrantes Grupo 11

- Jeronimo Baltian Ortiz
- Marcos Diaz
- Carlos Alberto Arce
- Jimena Martinez Arana
