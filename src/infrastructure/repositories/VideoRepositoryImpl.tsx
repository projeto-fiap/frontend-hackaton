import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class VideoRepositoryImpl {
  private async getAuthData() {
    const token = Cookies.get("auth_token");
    let personId = Cookies.get("person_id");

    if (token && !personId) {
      const res = await fetch(`${baseUrl}/person`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const list = await res.json();
        const email = JSON.parse(atob(token.split(".")[1])).preferred_username;
        const me = list.find((p: any) => p.email === email);

        if (me) {
          personId = String(me.id);

          Cookies.set("person_id", personId, {
            expires: 1,
            secure: window.location.protocol === "https:",
            sameSite: "Strict",
          });
        }
      }
    }

    if (!token || !personId) throw new Error("Usuário não autenticado");
    return { token, personId };
  }

  async uploadVideoToAPI(file: File) {
    const { token, personId } = await this.getAuthData();

    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${baseUrl}/video/upload/${personId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Erro no upload do vídeo");
    return await response.json(); // [{ id, nome, status, url }]
  }

  async getAllVideos() {
    const { token, personId } = await this.getAuthData();

    const response = await fetch(`${baseUrl}/video/${personId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao buscar vídeos");
    return await response.json();
  }

  async getVideoStatus(videoId: string) {
    const { token } = await this.getAuthData();

    const response = await fetch(`${baseUrl}/video/status/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao verificar status");
    return await response.json();
  }
}
