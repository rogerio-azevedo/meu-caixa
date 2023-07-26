import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
        },
        document: {
          label: 'CPF',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (credentials == undefined) return null

        let person = await prisma.person.findFirst({
          where: {
            document: credentials.document,
          },
        })

        if (!person) return null

        let passwordMatches = await bcrypt.compare(
          credentials.password,
          person.password,
        )

        if (!passwordMatches) return null

        return {
          id: person.id,
          document: person.document,
          name: person.name,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub

      session.user.isAdmin =
        (
          await prisma.person.findUnique({
            where: {
              id: session.user.id,
            },
          })
        )?.isAdmin ?? false

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)
