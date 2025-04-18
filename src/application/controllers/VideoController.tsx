import { VideoService } from "../services/VideoService";

export class VideoController {
  constructor(private videoService = new VideoService()) {}

  async handleUpload(file: File) {
    return this.videoService.executeUpload(file);
  }

  async getVideos() {
    return this.videoService.fetchAll();
  }

  async checkStatus(videoId: string) {
    return this.videoService.checkVideoStatus(videoId);
  }
}
