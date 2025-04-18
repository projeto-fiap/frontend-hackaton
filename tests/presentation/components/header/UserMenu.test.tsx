import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import UserMenu from "@/presentation/components/header/UserMenu";
import AuthContext from "@/presentation/contexts/AuthContext";

describe("UserMenu", () => {
  it("mostra o nome e permite logout", () => {
    const mockUser = { id: "1", name: "Gabriel", email: "gabriel@teste.com" };

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: mockUser,
            login: jest.fn(),
            logout: jest.fn(),
          }}
        >
          <UserMenu />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Gabriel")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });
});
