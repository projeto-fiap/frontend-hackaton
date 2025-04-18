import { Video } from "../entities/Video";

// Lógica pura de upload (pode ser verificação de tamanho, etc.)
export async function uploadVideo(file: File): Promise<Video> {
  // Exemplo de validação
  if (file.size === 0) {
    throw new Error("Arquivo inválido");
  }

  // Retorna um Video só pra exemplificar
  return {
    id: "abc",
    title: file.name,
    status: "PENDING",
  };
}
