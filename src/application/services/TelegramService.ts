// src/application/services/TelegramService.ts
export interface TelegramService {
  sendMessage(message: string): Promise<void>;
}
