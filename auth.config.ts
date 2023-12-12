import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { redirect } from "next/navigation"
import { prisma } from './scripts';
import {PrismaAdapter} from '@auth/prisma-adapter'
import { auth } from "./auth"


export const authConfig = {
  pages: {
    signIn: '/login'
  },
  adapter: PrismaAdapter(prisma),
  secret: "XsEZ90UkSqnhHXhGgCpfLManfxsFK1RxOPwjET1WQqw=",
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      const isAllowedToSignIn = user.email !== ''
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
