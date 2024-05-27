// src/application/use-cases/MessageUseCases.ts
import { Message } from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";
import { GroqService } from "../services/GroqService";
import { TelegramService } from "../services/TelegramService";

export class MessageUseCases {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly telegramService: TelegramService,
    private readonly groqService: GroqService
  ) {}

  async createMessage(message: Message): Promise<Message> {
    try {
      await this.messageRepository.create(message);
      await this.telegramService.sendMessage(message.content);
      const res = await this.groqService.getGroqChatCompletion(message.content);
      const msgGroq : Message = {
        receiver_id: message.sender_id,
        sender_id: message.receiver_id,
        id: "31",
        created_at: new Date().toString(),
        content: res.choices[0].message.content!
      }
      return msgGroq!
    } catch (error) {
      console.log(`Error creating message: ${error}`);
      throw error;
    }
  }

  // Implement other CRUD operations (read, update, delete) as needed
}
