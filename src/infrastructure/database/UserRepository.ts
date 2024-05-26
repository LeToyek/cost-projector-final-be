import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import pool from './config';

export class UserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [user.name, user.email, user.password]
        );
        return result.rows[0];
    }

    async findAll(): Promise<User[]> {
        const result = await pool.query(`SELECT * FROM users`);
        return result.rows;
    }

    async findById(id: string): Promise<User | null> {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    async update(id: string, user: User): Promise<User> {
        const result = await pool.query(
            `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
            [user.name, user.email, user.password, id]
        );
        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
}
