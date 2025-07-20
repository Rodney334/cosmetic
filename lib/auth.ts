// /lib/auth.ts
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Ici, ajoutez votre logique de validation (ex: appel à une API)
        if (credentials?.email === "test@test.com" && credentials.password === "test") {
          return { id: "1", email: "test@test.com" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/public/login',
  }
};