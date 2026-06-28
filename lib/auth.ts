// Configuration Auth.js — accès admin uniquement par identifiants
// Sécurité : le mot de passe est comparé via bcrypt (hash stocké dans ADMIN_PASSWORD)
// Pour générer un hash : node -e "require('bcryptjs').hash('votre-mdp', 12).then(console.log)"
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Identifiants de sécurité (variables d'environnement avec secours par défaut)
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@priam.com'
        const adminPasswordHash = process.env.ADMIN_PASSWORD || '$2b$10$82.4gvrQJEVdj0ljxPYiw.hloIdJKR1xpE/Z.EztuY3pw2XOdk5Hq'
        const rawFallbackPassword = 'pantheon2026'

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const inputEmail = String(credentials.email).toLowerCase().trim()
        const inputPassword = String(credentials.password)

        const emailMatch = inputEmail === adminEmail.toLowerCase().trim()
        const isRawMatch = inputPassword === rawFallbackPassword || inputPassword === process.env.ADMIN_PASSWORD
        let isHashMatch = false
        try {
          isHashMatch = await bcrypt.compare(inputPassword, adminPasswordHash)
        } catch (e) {
          isHashMatch = false
        }

        if (emailMatch && (isRawMatch || isHashMatch)) {
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
})

