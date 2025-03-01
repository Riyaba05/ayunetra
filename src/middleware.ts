import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Initialize the Supabase client with specific cookie options
  const supabase = createMiddlewareClient({ 
    req, 
    res,
    options: {
      cookies: {
        name: 'sb-auth',
        lifetime: 60 * 60 * 24 * 7, // 1 week
        domain: '',
        path: '/',
        sameSite: 'lax'
      }
    }
  });

  // Refresh session if it exists
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    await supabase.auth.refreshSession();
  }

  // Define protected routes
  const protectedRoutes = ['/chatbot'];
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = req.nextUrl.pathname === '/signin';

  // If accessing a protected route without a session, redirect to signin
  if (isProtectedRoute && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/signin';
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing auth route with a session, redirect to chatbot
  if (isAuthRoute && session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/chatbot';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Update matcher to only include specific routes we want to protect
export const config = {
  matcher: ['/chatbot', '/signin'],
}; 