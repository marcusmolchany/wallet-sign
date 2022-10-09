import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders headers", () => {
  render(<App />);
  const linkElement = screen.getByText(/wallet sign/i);
  expect(linkElement).toBeInTheDocument();
});
