// Você pode importar variáveis do .env ou algo assim
export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
};
