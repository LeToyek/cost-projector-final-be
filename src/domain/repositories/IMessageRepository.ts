import { Message } from '../entities/Message';

export interface IMessageRepository {
    create(message: Message): Promise<Message>;
    findAll(): Promise<Message[]>;
    findById(id: string): Promise<Message | null>;
    update(id: string, message: Message): Promise<Message>;
    delete(id: string): Promise<void>;
    findByEmail(email: string): Promise<Message | null>;
}
