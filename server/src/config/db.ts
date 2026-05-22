import { PrismaClient } from '@prisma/client';

// Add this to ensure we don't create multiple instances of Prisma Client in development
// when using HMR (Hot Module Replacement)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully to Neon PostgreSQL');
  } catch (error) {
    console.error(
      '❌ Error while trying to connect to the database:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
};

export default prisma;
