import bcrypt from 'bcrypt';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserUseCases {
    constructor(private userRepository: IUserRepository) {}

    async createUser(user: Partial<User>): Promise<User> {
      if (!user.password) {
        throw new Error('Password is required');
      }
  
      user.password = await bcrypt.hash(user.password, 10);
      return this.userRepository.create(user as User);
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        return this.userRepository.update(id, user as User);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
