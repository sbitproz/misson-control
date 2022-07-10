import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react button", () => {
  render(<App />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
