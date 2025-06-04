import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = fastify();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

server.get('/ping', async (_, reply) => {
  try {
    await prisma.counter.create({
      data: {},
    });

    const count = await prisma.counter.count();

    return reply.status(200).send({ count });
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.listen({
  host: HOST,
  port: Number(PORT),
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`)
});
