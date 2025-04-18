export interface Video {
  id: string;
  title: string;
  status: "PENDING" | "PROCESSING" | "DONE" | "ERROR";
  url?: string;
}
