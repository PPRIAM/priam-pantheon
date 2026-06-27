// Configuration Auth.js — accès admin uniquement par identifiants
// Sécurité : le mot de passe est comparé via bcrypt (hash stocké dans ADMIN_PASSWORD)
// Pour générer un hash : node -e "require('bcryptjs').hash('votre-mdp', 12).then(console.log)"
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Vérification de la présence des identifiants et du hash configuré
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = process.env.ADMIN_PASSWORD

        if (!credentials?.email || !credentials?.password || !adminEmail || !adminPasswordHash) {
          return null
        }

        // Comparaison sécurisée : email en clair, mot de passe via bcrypt
        const emailMatch = credentials.email === adminEmail
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          adminPasswordHash
        )

        if (emailMatch && passwordMatch) {
          return {
            id: '1',
            name: 'Priam',
            email: credentials.email as string,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    // Protection automatique — autorise le login sans être connecté, sinon exige la session
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth
      const isOnLogin = nextUrl.pathname === '/admin/login'
      if (isOnLogin) {
        if (isLoggedIn) {
          // Rediriger vers l'espace d'administration si déjà connecté
          return Response.redirect(new URL('/admin/projects', nextUrl))
        }
        return true
      }
      return isLoggedIn
    },
  },
})

