import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { AuthProvider } from "@/presentation/contexts/AuthContext";

describe("LoginPage", () => {
  it("exibe erro com login inválido", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Usuário"), {
      target: { value: "x" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "y" },
    });

    fireEvent.click(screen.getByText("CONECTAR"));

    const errorMsg = await screen.findByText(/email ou senha inválidos/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
