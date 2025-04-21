import { AuthController } from "../../../src/application/controllers/AuthController";
import { AuthService } from "../../../src/application/services/AuthService";
import { User } from "../../../src/domain/entities/User";

describe("AuthController", () => {
  const mockUser: User = {
    id: "1",
    nome: "Teste",
    cpf: "",
    email: "test@example.com",
  };

  const authService = {
    login: jest.fn().mockResolvedValue(mockUser),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
  } as unknown as AuthService;

  const controller = new AuthController(authService);

  it("delegates login to AuthService", async () => {
    const res = await controller.login("e@mail", "123");
    expect(authService.login).toHaveBeenCalledWith("e@mail", "123");
    expect(res).toEqual(mockUser);
  });

  it("delegates logout to AuthService", () => {
    controller.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it("gets current user via AuthService", () => {
    controller.getUser();
    expect(authService.getCurrentUser).toHaveBeenCalled();
  });
});
