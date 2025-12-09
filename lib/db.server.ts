import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import "dotenv/config";
import { PrismaClient } from '@/prisma/generated/client';

// Use a global variable to persist the Prisma Client instance across reloads in development
declare global {
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5
});

// Instantiate the client:
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export { prisma };
