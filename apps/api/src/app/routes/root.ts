import { FastifyInstance } from 'fastify';
import { UsersRepository } from '@org/database';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    const users = await new UsersRepository().findAll();
    return users;
  });
}
