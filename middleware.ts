import { updateSession } from '@/lib/supabase/middleware'

import { NextRequest, NextResponse } from 'next/server'

// Define public routes
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/reset-password',
  '/pricing',
  '/manual',
  '/terms',
  '/privacy',
  '/support',
  '/api/webhook',
  '/api/inngest',
  '/api/cron',
  '/api/scan',
  '/api/debug',
  '/test-page',
  '/debug',
  '/test',
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Unified auth check and session update
  const { response, user } = await updateSession(request)

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return response
  }

  // Protected routes: redirect if no user
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
