import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  // Ne pas rediriger si on est déjà sur la page de login ou register
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    return NextResponse.next()
  }

  // Vérification de l'expiration du token
  let isTokenValid = false
  if (token) {
    try {
      const decoded = jwt.decode(token)
      if (decoded && typeof decoded === "object" && decoded.exp) {
        isTokenValid = decoded.exp * 1000 > Date.now()
      }
    } catch (e) {
      isTokenValid = false
    }
  }

  // Redirige si pas de token ou token expiré (pour toutes les routes sauf exceptions du matcher)
  if (!token || !isTokenValid) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
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
