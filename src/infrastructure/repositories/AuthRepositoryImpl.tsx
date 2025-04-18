import axios from "axios";
import { User } from "../../domain/entities/User";

export class AuthRepositoryImpl {
  async login(email: string, password: string): Promise<User> {
    const { data } = await axios.post<User>("/api/login", { email, password });
    return data;
  }
}
