import { AuthService } from "@/application/services/AuthService";

describe("AuthService", () => {
  it("deve logar com admin", async () => {
    const service = new AuthService();
    const user = await service.login("admin", "admin");
    expect(user.name).toBe("Administrador");
  });

  it("deve falhar com credenciais erradas", async () => {
    const service = new AuthService();
    await expect(service.login("fake", "user")).rejects.toThrow();
  });
});
