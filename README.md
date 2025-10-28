## Entorno para testing de frontend

Entorno configurado para desarrollar el testing de un frontend.

## Descarga del entorno via pull

- Crear una rama propia en GitHub, para no emplear esta, por ej: micaela_tp3
- En modo local, desde VS Code y desde la raiz de la carpeta vacia, ejecutamos
- git init
- git clone https://github.com/j3r0nimo/Prog4Tp3.git
- La acción anterior crea una sub carpeta y la llama Prog4Tp3
- Ingresamos a esa nueva carpeta. OJO, es fundamental ingresar a esa nueva carpeta en toda acción con git
- En la terminal, entonces, sería: cd Prog4Tp3
- git status
- ese comando nos dirá en que rama estamos,
- Respuesta esperada: "On branch main"
- git branch -a
- ese comando nos dirá que ramas existen y queremos ver si muestra la rama micaela_tp3
- git checkout micaela_tp3
- ese comando nos cambia a la rama que creamos
- git status para verificarlo
- Respuesta esperada: "On branch micaela_tp3"
- git pull

## Instalación & ejecución del entorno

- continuando el paso anterior y dentro de Prog4Tp3
- npm install
- npm run dev

## Ejecución del testing

- npm run test

## Bibliotecas & propósito

| Biblioteca                  | Proposito                    | Resumen                                                                                                                       |
| --------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| vitest                      | Ejecutor de pruebas          | Framework para pruebas con Vite. Los archivos de prueba tendrán un nombre como MyComponent.test.tsx.                          |
| @testing-library/react      | Component React para pruebas | Renderiza componentes y verifica lo que hay en la pantalla, simulando cómo vería un usuario la interfaz de usuario.           |
| @testing-library/user-event | Simula acciones de usuario   | Simula clicks, escritura, selección, etc., en las pruebas.                                                                    |
| @testing-library/jest-dom   | Comparadores personalizados  | Proporciona adicionales como toBeInTheDocument() o toHaveTextContent(), permitiendo que las pruebas sean mas fáciles de leer. |
| msw (Mock Service Worker)   | Simulador de API             | Permite simular llamadas a API REST o GraphQL durante las pruebas, por lo cual no se necesita un backend real.                |
| zod                         | Validación de esquema        | Valida y analiza datos, utilizada para garantizar que las respuestas de la API o las entradas de formulario sean correctas.   |

## Responsable

- Carlos Alberto Arce
