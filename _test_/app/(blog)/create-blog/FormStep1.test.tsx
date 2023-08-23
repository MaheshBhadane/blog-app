import React from "react";
import { render, screen } from "@testing-library/react";
import FormStep1 from "@/app/(blog)/write/FormStep1";

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe("FormStep1 UI Tests", () => {
    it(" Should renders form fields and buttons correctly", () => {
        render(<FormStep1 formData={{}} onNext={() => { }} />);

        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Subtitle")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Content")).toBeInTheDocument();
        expect(screen.getByText("Is Editor's Pick?")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();

        expect(screen.getByText("Adventure")).toBeInTheDocument();
        expect(screen.getByText("Travel")).toBeInTheDocument();
        expect(screen.getByText("Fashion")).toBeInTheDocument();
        expect(screen.getByText("Technology")).toBeInTheDocument();
        expect(screen.getByText("Branding")).toBeInTheDocument();

        expect(screen.getByText("Next")).toBeInTheDocument();
    });
});
