// application/controllers/VideoController.ts
import { VideoService } from "../services/VideoService";

export class VideoController {
  constructor(private videoService = new VideoService()) {}

  async handleUpload(file: File) {
    return this.videoService.executeUpload(file); // retorna array<VideoDTO>
  }

  async getVideos() {
    return this.videoService.fetchAll();
  }

  async checkStatus(videoId: string) {
    return this.videoService.checkVideoStatus(videoId);
  }
}
