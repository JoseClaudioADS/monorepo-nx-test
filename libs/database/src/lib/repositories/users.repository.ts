import { db } from '../database';
import { usersTable } from '../db/schema';

class UsersRepository {
  async findAll() {
    const users = await db.select().from(usersTable);
    return users;
  }
}

export { UsersRepository };
