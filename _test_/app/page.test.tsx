import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home Component", () => {
  it("Should renders the 'Home' text and a button", () => {
    render(<Home />);

    // Assert that the text "Home" is present
    const homeText = screen.getByText("Home");
    expect(homeText).toBeInTheDocument();

    // Assert that the button is present
    const button = screen.getByText("Sign Up");
    expect(button).toBeInTheDocument();
  });
});
