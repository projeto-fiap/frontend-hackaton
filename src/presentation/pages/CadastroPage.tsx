import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../application/services/AuthService";

export function CadastroPage() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const authService = new AuthService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cpf || !email || !password || !confirmPassword) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    try {
      await authService.register({
        nome: name,
        cpf,
        senha: password,
        email,
      });
      setErrorMsg("");
      navigate("/");
    } catch {
      setErrorMsg("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white text-center mb-16 tracking-wide">
          <span className="font-bold">Cadastro</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#B11226]"
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#B11226]"
          />

          <input
            type="email"
            placeholder="E-mail"
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

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#B11226]"
          />

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full border border-[#B11226] text-white font-semibold py-2 rounded-md hover:bg-[#B11226] transition duration-300 cursor-pointer active:scale-95 focus:outline-none"
          >
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroPage;
