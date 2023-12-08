import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string,
    role: string,
    email: string
  }
  interface Session {
    user: User & {
        username: string,
        role: string,
        email: string
      }
    token: {
        username: string,
        role: string,
        email: string
      }
  }
}