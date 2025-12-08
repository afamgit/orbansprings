import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;

export function proxy(request: NextRequest) {
  // Your proxy logic here
  return NextResponse.next();
}

 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|image|.*\\.png$).*)'],
};