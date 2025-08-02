import { db } from '../database';
import { usersTable } from '../db/schema';

class UsersRepository {
  async findAll() {
    const users = await db.selectDistinct().from(usersTable);
    const users2 = await db.selectDistinct().from(usersTable);
    const users3 = await db.selectDistinct().from(usersTable);
    const users4 = await db.selectDistinct().from(usersTable);
    const users5 = await db.selectDistinct().from(usersTable);
    const users6 = await db.selectDistinct().from(usersTable);
    return users;
  }
}

export { UsersRepository };
