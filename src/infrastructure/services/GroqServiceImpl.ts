import { Groq } from "groq-sdk";
import { ChatCompletion } from "groq-sdk/resources/chat/completions";
import { GroqService } from "../../application/services/GroqService";

export class GroqServiceImpl implements GroqService {
  private groq: Groq;
  constructor(private groqInstance: Groq) {
    this.groq = this.groqInstance
  }
  async getGroqChatCompletion(message: string): Promise<ChatCompletion> {
    const res = this.groq.chat.completions.create({
      messages:[
        {
          role: "user",
          content: message
        }
      ],
      model: 'llama3-8b-8192'
    })
    return res
  }
}
