import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@auth/prisma-adapter'

import { z } from 'zod';
import { prisma } from '@/scripts'

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string
  };


  export const authConfig = {
    pages: {
      signIn: '/login'
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt"
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
  
        const isAllowedToSignIn = user.role !== ''
        if (isAllowedToSignIn) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
  
      async jwt({token, user}) {
        if(user) {
  
          return {
            ...token,
           username: user.username,
            role: user.role,
          }
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        // session.accessToken = token.accessToken
        // session.user.id = token.id
        // console.log('from session', session)
  
  
        if(token) {
  
          return {
            ...session,
            username : token.username,
            role: token.role,
          }
        }
        return session
      },
      authorized({ auth, request: { nextUrl } }) {
  
        // console.log('from auth', auth)
        
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/account');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/account', nextUrl));
        }
        return true;
      },    async redirect({ url, baseUrl }) {
  
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
      providers: [], // Add providers with an empty array for now
  
  } satisfies NextAuthConfig;


async function getUser(username: string): Promise<User | undefined | null> {


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

          const passwordsMatch = password === userInfo.password;

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

