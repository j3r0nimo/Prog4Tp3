// test TDD: busca "Cafe" en la UI

import { render, screen } from "@testing-library/react";
import App from "../../App";

test("muestra los productos mockeados por la API", async () => {
  render(<App />);  
  expect(
    await screen.findByText((content) => content.includes("Cafe"))
  ).toBeInTheDocument();
});
