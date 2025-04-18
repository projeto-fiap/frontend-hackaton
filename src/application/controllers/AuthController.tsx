import { AuthService } from "../services/AuthService";
import { User } from "../../domain/entities/User";

export class AuthController {
  constructor(private authService: AuthService) {}

  login(email: string, password: string): Promise<User> {
    return this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }

  getUser(): User | null {
    return this.authService.getCurrentUser();
  }
}
