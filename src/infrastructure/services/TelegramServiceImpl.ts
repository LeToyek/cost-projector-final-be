// src/infrastructure/services/TelegramServiceImpl.ts
import TelegramBot from 'node-telegram-bot-api';
import { TelegramService } from '../../application/services/TelegramService';

export class TelegramServiceImpl implements TelegramService {
  private bot: TelegramBot;
  readonly chatId = process.env.TELEGRAM_CHAT_ID!; // Replace with actual chat ID

  constructor(private readonly token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.bot.sendMessage(this.chatId, message);
    } catch (error) {
      console.error('Error sending message via Telegram:', error);
      throw error;
    }
  }
}
