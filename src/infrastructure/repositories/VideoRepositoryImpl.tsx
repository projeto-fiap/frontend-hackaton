// infrastructure/repositories/VideoRepositoryImpl.ts
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class VideoRepositoryImpl {
  // Extrai token e personId de forma centralizada
  private getAuthData() {
    const token = Cookies.get("auth_token");
    const personId = Cookies.get("person_id");
    if (!token || !personId) throw new Error("Usuário não autenticado");
    return { token, personId };
  }

  async uploadVideoToAPI(file: File) {
    const { token, personId } = this.getAuthData();

    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${baseUrl}/video/upload/${personId}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro no upload do vídeo");
    return await response.json(); // [{ id, nome, status, url }]
  }

  async getAllVideos() {
    const { token, personId } = this.getAuthData();

    const response = await fetch(`${baseUrl}/video/${personId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao buscar vídeos");
    return await response.json(); // lista<VideoDTO>
  }

  async getVideoStatus(videoId: string) {
    const { token } = this.getAuthData();

    const response = await fetch(`${baseUrl}/video/status/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao verificar status");
    return await response.json(); // VideoStatusDTO
  }
}
