import { Video } from "../entities/Video";

export async function uploadVideo(file: File): Promise<Video> {
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
