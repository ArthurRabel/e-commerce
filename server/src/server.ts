import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { startStandaloneServer } from '@apollo/server/standalone';
import { UserResolver } from './user/user.resolver';

export interface Context {
  prisma: PrismaClient;
}

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ]
  });

  const server = new ApolloServer({
    schema
  });

  const prisma = new PrismaClient();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async (): Promise<Context> => ({ prisma }),
  });

  console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                                                                ║
    ║   🚀\x1b[32m Server is running! 🚀\x1b[0m                               ║
    ║                                                          ║
    ║   🌐 URL: ${url}                         ║
    ║                                                          ║
    ║   📅 Date: ${new Date().toLocaleDateString()}                                    ║
    ║                                                          ║
    ║   ⏰ Time: ${new Date().toLocaleTimeString()}                                      ║
    ║                                                          ║
    ║   💾 ORM: Prisma                                         ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    `);
}

bootstrap();