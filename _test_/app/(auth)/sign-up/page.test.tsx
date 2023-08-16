import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "@/app/(auth)/sign-up/page";

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

describe("SignUp", () => {
    it("Should renders the form elements", () => {
        render(<SignUp />);

        expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Author Type/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it("Should submits the form with valid data", async () => {
        render(<SignUp />);

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn(),
        });

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Author Type/i), {
            target: { value: "Author" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith("/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: "John Doe",
                    email: "john@example.com",
                    author_type: "Author",
                    password: "password123",
                }),
            });
        });
    });
});
