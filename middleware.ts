import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from './lib/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Explicitly ignore local documentation and core routes
  const localRoutes = [
    '/introduction',
    '/methodology',
    '/design',
    '/results',
    '/discussion',
    '/conclusion',
    '/appendix',
    '/references',
    '/about',
    '/contact',
    '/pages',
    '/external-link',
    '/_next',
    '/api',
    '/img',
    '/favicon.ico',
    '/sw.js',
    '/manifest.json'
  ];

  const isLocalRoute = localRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isLocalRoute || pathname === '/') {
    return NextResponse.next();
  }

  // 2. Check for redirected paths
  const redirectedPaths = siteConfig.redirectedPaths || [];
  const shouldRedirect = redirectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (shouldRedirect && siteConfig.mainWebsiteUrl) {
    const targetUrl = `${siteConfig.mainWebsiteUrl}${pathname}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - img (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
  ],
};
