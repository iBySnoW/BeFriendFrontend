import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = [
  '/profile',
]

const publicRoutes = [
  '/auth/login',
  '/auth/register',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  // et tente d'accéder à une route protégée
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Rediriger vers le tableau de bord si l'utilisateur est authentifié
  // et tente d'accéder à une route publique
  if (token && publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
