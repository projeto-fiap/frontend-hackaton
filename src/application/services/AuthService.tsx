import Cookies from "js-cookie";
import { User } from "../../domain/entities/User";
import { RegisterDTO } from "../../domain/dtos/RegisterDTO";
import { PersonResponse } from "../../domain/dtos/PersonResponse";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class AuthService {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${baseUrl}/person/login`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      },
      credentials: "include", // bom manter se o backend usa sessão ou cookie
    });

    if (!response.ok) throw new Error("Falha no login");

    const token = await response.text();
    console.log("Token JWT recebido:", token);

    // Salva o token
    Cookies.set("auth_token", token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Decodifica o token
    const payload = JSON.parse(atob(token.split(".")[1]));
    const personId = payload.id?.toString(); // agora vem do backend

    // Salva o ID também
    if (personId) {
      Cookies.set("person_id", personId, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
    }

    return {
      id: personId ?? "unknown",
      nome: payload.nome ?? payload.sub,
      cpf: payload.cpf ?? "",
      email: payload.sub,
    };
  }

  async register(data: RegisterDTO): Promise<PersonResponse> {
    const res = await fetch(`${baseUrl}/person/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Falha no registro");

    return await res.json();
  }

  logout() {
    Cookies.remove("auth_token");
    Cookies.remove("person_id");
  }

  getCurrentUser(): User | null {
    const token = Cookies.get("auth_token");
    const id = Cookies.get("person_id");

    if (!token || !id) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id,
        nome: payload.nome ?? payload.sub,
        cpf: payload.cpf ?? "",
        email: payload.sub,
      };
    } catch {
      return null;
    }
  }
}
