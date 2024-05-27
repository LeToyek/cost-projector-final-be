import { ChatCompletion } from "groq-sdk/resources/chat/completions";

export interface GroqService {
  getGroqChatCompletion(message: string): Promise<ChatCompletion>;
}
