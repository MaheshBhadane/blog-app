import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "@/app/(auth)/sign-in/page";

// Mocking useRouter and useToast hooks
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}));
jest.mock("@/components/ui/use-toast", () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}));

describe("SignIn", () => {
    it("Should renders the form elements", () => {
        render(<SignIn />);

        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByText(/do not have an account/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    });

    it("Should submits the form with valid data", async () => {
        render(<SignIn />);

        // Mock fetch function to return a successful response
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn(),
        });

        fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
            target: { value: "john@example.com" },
        });

        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });
});