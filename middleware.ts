// Protection des routes admin — redirection vers login si non authentifié
export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: ['/admin/:path*'],
}
