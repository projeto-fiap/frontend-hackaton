import React, { useState, useEffect } from "react";
import { VideoController } from "../../application/controllers/VideoController";
import { VideoService } from "../../application/services/VideoService";
import UserMenu from "../components/header/UserMenu";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type VideoStatus = "processando" | "concluido";

interface VideoItem {
  id: string;
  name: string;
  status: VideoStatus;
  url?: string;
}

export function DashboardPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const videoController = new VideoController(new VideoService());

  const mapStatus = (status: string): VideoStatus => {
    switch (status) {
      case "FINALIZADO":
        return "concluido";
      case "ERRO":
      case "PROCESSANDO":
      default:
        return "processando";
    }
  };

  useEffect(() => {
    const fetchExistingVideos = async () => {
      const token = Cookies.get("auth_token");
      const personId = Cookies.get("person_id");

      if (!token || !personId) return;

      try {
        const res = await fetch(`${baseUrl}/video/${personId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao carregar vídeos");

        const data = await res.json();

        setVideos(
          data.map((v: any) => ({
            id: v.id.toString(),
            name: v.nome,
            status: mapStatus(v.status),
            url: v.url,
          }))
        );
      } catch (err) {
        console.error("Erro ao buscar vídeos salvos:", err);
      }
    };

    fetchExistingVideos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...e.target.files]);
    }
  };

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      try {
        const response = await videoController.handleUpload(file);
        const [dto] = response;
        setVideos((prev) => [
          ...prev,
          {
            id: dto.id.toString(),
            name: dto.nome,
            status: mapStatus(dto.status),
            url: dto.url,
          },
        ]);
      } catch (err) {
        console.error("Erro ao enviar:", err);
      }
    }

    setSelectedFiles([]);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedVideos = await Promise.all(
        videos.map(async (video) => {
          if (video.status === "concluido") return video;
          try {
            const updated = await videoController.checkStatus(video.id);
            return {
              ...video,
              status: mapStatus(updated.status),
              url: updated.url,
            };
          } catch (err) {
            return video;
          }
        })
      );
      setVideos(updatedVideos);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Gerenciador de Vídeos</h1>

        <div className="flex items-center gap-4">
          <div>
            <label className="cursor-pointer inline-flex items-center space-x-2 bg-[#B11226] hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md">
              <span>+ Adicionar vídeos</span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {selectedFiles.length > 0 && (
              <button
                onClick={handleUpload}
                className="ml-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Enviar ({selectedFiles.length})
              </button>
            )}
          </div>

          <UserMenu />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="border-b border-gray-700 text-gray-400 uppercase text-xs">
            <tr>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  Nenhum vídeo enviado ainda.
                </td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr
                  key={video.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-4">{video.name}</td>
                  <td className="py-2 px-4">
                    {video.status === "concluido" ? (
                      <span className="text-green-400">Concluído</span>
                    ) : (
                      <span className="text-yellow-400">Processando...</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {video.status === "concluido" && video.url ? (
                      <a
                        href={video.url}
                        download
                        className="text-[#B11226] hover:underline"
                      >
                        Baixar
                      </a>
                    ) : (
                      <span className="text-gray-500">Aguardando</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
