// WiddPost API service for handling interactions with the widdpost API
import { env } from "@/config/env";

export interface WiddPostResponse {
  status: "success" | "error" | "loading";
  content?: string;
  imageUrl?: string;
  message?: string;
}

export class WiddPostService {
  /**
   * Send captured photo to the widdpost API with mood and hints
   * @param imageFile The captured image file
   * @param mood The selected mood for the post
   * @param hints Additional context or hints for the post content
   * @returns A response containing generated content and image URL
   */
  async createPost(
    imageFile: File,
    mood: string,
    hints: string
  ): Promise<WiddPostResponse> {
    try {
      // Create a FormData object to send the image and parameters
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("mood", mood);
      formData.append("hints", hints);

      // Send to the widdpost API endpoint using the API URL from environment
      const response = await fetch(`${env.apiUrl}/widdpost/generate`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: "success",
        content: data.content,
        imageUrl: data.imageUrl,
        message: "Post created successfully!",
      };
    } catch (error) {
      console.error("Error sending to widdpost API:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create post",
      };
    }
  }
}

// Export a singleton instance of the service
export const widdPostService = new WiddPostService();