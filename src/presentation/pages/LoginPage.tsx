import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setErrorMsg("Email ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white text-center mb-32 tracking-wide">
          <span className="font-bold">Hackaton</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#B11226]"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#B11226]"
          />

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <p className="text-center mt-2 text-sm text-white">
            Não tem cadastro?{" "}
            <Link
              to="/cadastro"
              className="text-[#B11226] underline hover:opacity-80"
            >
              Criar conta
            </Link>
          </p>

          <button
            type="submit"
            className="w-full border border-[#B11226] text-white font-semibold py-2 rounded-md hover:bg-[#B11226] transition duration-300"
          >
            CONECTAR
          </button>
        </form>
      </div>
    </div>
  );
}
