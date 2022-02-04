import User from "../models/user.model";
import DatabaseError from "../errors/database.error.model";

import db from '../db';

const tableName = 'application_user';
const salt_key = `${process.env['SALT_kEY']}`

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `SELECT uuid,username FROM ${tableName}`;
        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try {
            const query = `SELECT uuid,username FROM ${tableName} WHERE uuid = $1`;
            const values = [uuid];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (e) {
            throw new DatabaseError('Find by id failed', e);
        }
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User> {
        try {
            const query = `SELECT uuid,username FROM ${tableName} WHERE username = $1 AND password = crypt($2, '${salt_key}')`;
            const values = [username, password];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user || null;
        } catch (e) {
            throw new DatabaseError('Invalid User', e);
        }
    }

    async create(user: User): Promise<string> {
        const script = `INSERT INTO ${tableName} (username, password) VALUES ($1, crypt($2, '${salt_key}')) RETURNING uuid`;

        const values = [user.username, user.password];
        const { rows } = await db.query<{ uuid: string}>(script, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = `UPDATE ${tableName} SET username = $1, password = crypt($2, '${salt_key}') WHERE uuid = $3`;

        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
    }

    async remove(uuid: string): Promise<void> {
        const script = `DELETE FROM ${tableName} WHERE uuid = $1`;
        const values = [uuid];
        await db.query(script, values);
    }
}

export default new UserRepository();