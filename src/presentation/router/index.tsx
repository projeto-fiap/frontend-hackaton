import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CadastroPage } from "../pages/CadastroPage";
import { PrivateRoute } from "./PrivateRoute";
import Cookies from "js-cookie";

export function AppRouter() {
  const token = Cookies.get("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rota protegida */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Rota desconhecida */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
