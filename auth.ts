import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@auth/prisma-adapter'

import { z } from 'zod';
import { prisma } from '@/scripts'
import bcrypt from 'bcrypt'

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };




export async function getUser(username: string): Promise<User | undefined | null> {


    try {
      const user = await prisma.users.findFirst({
        where: {
            username: username,
        },
        select: {
            id: true,
            name:true,
            username: true,
            email: true,
            password:true,
            role: true
        }
      });

    //   console.log(user)

    return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
 
  export async function getUserFromEmail(email: string): Promise<User | undefined | null> {


    try {
      const user = await prisma.users.findFirst({
        where: {
            email: email,
        },
        select: {
            id: true,
            name:true,
            username: true,
            email: true,
            password:true,
            role: true,
            photo: true
        }
      });

    //   console.log(user)

    return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

  export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const userInfo = await getUser(username);
          if (!userInfo) return null;

          const userPass = userInfo.password.startsWith('$2y$') ? userInfo.password.replace('$2y$', '$2b$') : userInfo.password;
          // const passwordsMatch = password === userInfo.password;
          const passwordsMatch = await bcrypt.compare(password,userPass);

          const user = {
            id: `${userInfo.id}`,
            name: userInfo.name,
            email: userInfo.email,
            username: userInfo.username,
            role: userInfo.role
          }


          if(passwordsMatch) {
            return user
          }
         
        }

        console.log('Invalid credential')

        return null
      },
  }
    ),
  ],
});

