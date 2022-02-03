import User from "../models/user.model";
import DatabaseError from "../errors/database.error.model";

import db from '../db';

const tableName = 'application_user';

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
            throw new DatabaseError('Erro na consulta por ID', e);
        }
    }

    async create(user: User): Promise<string> {
        const script = `INSERT INTO ${tableName} (username, password) VALUES ($1, crypt($2, 'my_salt')) RETURNING uuid`;

        const values = [user.username, user.password];
        const { rows } = await db.query<{ uuid: string}>(script, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = `UPDATE ${tableName} SET username = $1, password = crypt($2, 'my_salt') WHERE uuid = $3`;

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