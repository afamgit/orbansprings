import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/scripts';
import bcrypt from 'bcrypt';
import type { User } from 'next-auth';
 
async function getUser(username: string) {
  try {
    const user = await prisma.users.findFirst({
        where: {
            OR: [
                { email: username },
                { username: username },
            ]
        },
        select: {
            id: true,
            name:true,
            username: true,
            email: true,
            password:true,
            role: true,
        }
      });
    if (user) {
      return { ...user, id: user.id.toString() };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserFromEmail(email: string) {
  try {
    const user = await prisma.users.findFirst({
        where: { email: email },
        select: {
            id: true,
            name:true,
            username: true,
            email: true,
            password:true,
            role: true,
        }
      });
    if (user) {
      return { ...user, id: user.id.toString() };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const sentPassword = password.trim();
          const user = await getUser(username);
          if (!user) return null;
              const userPass = user.password.startsWith('$2y$') ? user.password.replace('$2y$', '$2b$') : user.password;

          const passwordsMatch =  await bcrypt.compare(sentPassword, userPass);
          if (passwordsMatch) {
            return user;
          }
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

