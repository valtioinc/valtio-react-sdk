import React from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BaseComponent } from "../src/base";
import { ValtioApp, ValtioRequest } from "../src";

test("renders the BaseComponent", () => {
  render(<BaseComponent host="https://example.com" />);

  const element = screen.getByTestId("valtio-iframe");

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute("src", "https://example.com/#embedded=true");
});

test("renders the ValtioApp component", () => {
  render(<ValtioApp host="https://example.com" />);

  const element = screen.getByTestId("valtio-iframe");

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute("src", "https://example.com/#embedded=true");
});

test("renders the ValtioRequest component", () => {
  render(<ValtioRequest host="https://example.com" />);

  const element = screen.getByTestId("valtio-iframe");

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute(
    "src",
    "https://example.com/e/request#embedded=true",
  );
});
