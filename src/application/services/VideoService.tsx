import { VideoRepositoryImpl } from "../../infrastructure/repositories/VideoRepositoryImpl";

export class VideoService {
  private repository = new VideoRepositoryImpl();

  async executeUpload(file: File) {
    return this.repository.uploadVideoToAPI(file);
  }

  async fetchAll() {
    return this.repository.getAllVideos();
  }

  async checkVideoStatus(videoId: string) {
    return this.repository.getVideoStatus(videoId);
  }
}
