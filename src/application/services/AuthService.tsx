import Cookies from "js-cookie";
import { User } from "../../domain/entities/User";
import { RegisterDTO } from "../../domain/dtos/RegisterDTO";
import { PersonResponse } from "../../domain/dtos/PersonResponse";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class AuthService {
  async login(email: string, password: string): Promise<User> {
    // 1) login básico (igual ao seu)
    const res = await fetch(`${baseUrl}/person/login`, {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${email}:${password}`) },
    });
    if (!res.ok) throw new Error("Falha no login");

    const token = await res.text();
    Cookies.set("auth_token", token, {
      expires: 1,
      secure: import.meta.env.PROD,
      sameSite: "Strict",
    });

    // 2) decodifica só para pegar o e‑mail
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userEmail = payload.sub as string;

    // 3) busca lista de pessoas
    const listRes = await fetch(`${baseUrl}/person`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!listRes.ok) throw new Error("Falha ao buscar pessoas");

    const people: PersonResponse[] = await listRes.json();
    const me = people.find((p) => p.email === userEmail);

    const personId = me?.id?.toString() ?? "unknown";
    Cookies.set("person_id", personId, {
      expires: 1,
      secure: import.meta.env.PROD,
      sameSite: "Strict",
    });

    return {
      id: personId,
      nome: me?.nome ?? userEmail,
      cpf: me?.cpf ?? "",
      email: userEmail,
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
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: Cookies.get("person_id") ?? "unknown",
      nome: payload.nome ?? payload.sub,
      cpf: payload.cpf ?? "",
      email: payload.sub,
    };
  }
}
