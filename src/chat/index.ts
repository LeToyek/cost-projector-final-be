// src/chat/index.ts
import { Server } from "socket.io";
import { GroqService } from "../application/services/GroqService";
import { TelegramService } from "../application/services/TelegramService";
import { MessageUseCases } from "../application/use-cases/MessageUseCases";
import { MessageRepository } from "../infrastructure/database/MessageRepository";
import { SocketIOChatHandler } from "./handler/SocketIOChatHandler";

export const initChat = (
  io: Server,
  telegramService: TelegramService,
  groqService: GroqService
): void => {
  const messageRepository = new MessageRepository();
  const messageUseCase = new MessageUseCases(
    messageRepository,
    telegramService,
    groqService
  );
  const chatHandler = new SocketIOChatHandler(io, messageUseCase);
  chatHandler.init();
};
