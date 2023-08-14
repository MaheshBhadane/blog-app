import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(blog)/page";

describe("Home Component", () => {
  it("Should renders the title correctly", () => {
    render(<Home />);
    const titleElement = screen.getByText(
      "Richird Norton photorealistic rendering as real photos"
    );
    expect(titleElement).toBeInTheDocument();
  });

  it("Should renders the description correctly", () => {
    render(<Home />);
    const descriptionElement = screen.getByText("real photos");
    expect(descriptionElement).toBeInTheDocument();
  });
});
