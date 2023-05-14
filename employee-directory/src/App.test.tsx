import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Employee Directory Text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Employee Directory/i);
  expect(linkElement).toBeInTheDocument();
});
