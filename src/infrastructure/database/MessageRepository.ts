// src/infrastructure/database/MessageRepositoryImpl.ts
import { Message } from '../../domain/entities/Message';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import pool from './config';

export class MessageRepository implements IMessageRepository {
  constructor() {}
  findAll(): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Message | null> {
    throw new Error('Method not implemented.');
  }
  update(id: string, message: Message): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<Message | null> {
    throw new Error('Method not implemented.');
  }

  async create(message: Message): Promise<Message> {
    const client = await pool.connect();
    try {
      const result = await client.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)', [message.sender_id, message.receiver_id, message.content]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Implement other CRUD methods as needed
}
