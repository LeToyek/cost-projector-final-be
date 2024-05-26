// src/application/use-cases/MessageUseCases.ts
import { Message } from '../../domain/entities/Message';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { TelegramService } from '../services/TelegramService';

export class MessageUseCases {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly telegramService: TelegramService
  ) {}

  async createMessage(message: Message): Promise<void> {
    await this.messageRepository.create(message);
    await this.telegramService.sendMessage(message.content);
  }

  // Implement other CRUD operations (read, update, delete) as needed
}
