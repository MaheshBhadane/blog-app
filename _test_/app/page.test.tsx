import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home Component", () => {
  it("renders the 'Home' text and a button", () => {
    render(<Home />);

    // Assert that the text "Home" is present
    const homeText = screen.getByText("Home");
    expect(homeText).toBeInTheDocument();

    // Assert that the button is present
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });
});
