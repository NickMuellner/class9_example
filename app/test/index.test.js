const fastify = require('fastify');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const buildServer = () => {
    const app = fastify();

    app.get('/ping', async (_, reply) => {
        try {
            await prisma.counter.create({
                data: {},
            });

            const count = await prisma.counter.count();

            return reply.status(200).send({ count });
        } catch (error) {
            return reply.status(500).send({ error: error?.message });
        }
    });

    return app;
};

describe('GET /ping', () => {
    let app;

    beforeAll(async () => {
        app = buildServer();
        await app.ready();
    });

    afterAll(async () => {
        await prisma.counter.deleteMany(); // Clean up
        await app.close();
        await prisma.$disconnect();
    });

    it('should return 200 and increment the counter', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/ping',
        });

        expect(response.statusCode).toBe(200);

        const body = JSON.parse(response.body);
        expect(body).toHaveProperty('count');
        expect(typeof body.count).toBe('number');
        expect(body.count).toBeGreaterThan(0);
    });
});
