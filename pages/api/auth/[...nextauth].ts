import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from '../../../lib/config';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.username || !credentials?.password) {
          return null; // Return null instead of throwing error for better UX
        }
        
        // Use secure comparison to prevent timing attacks
        // In production, you should use a proper crypto library for constant-time comparison
        // or better yet, use a hashed password with bcrypt
        const usernameValid = credentials.username.trim() === authConfig.username.trim();
        const passwordValid = credentials.password === authConfig.password;
        
        if (usernameValid && passwordValid) {
          return { 
            id: '1', 
            name: authConfig.username, 
            email: authConfig.email || 'admin@example.com',
            role: 'admin'
          };
        }
        
        return null; // Return null instead of throwing error for better UX
      }
    })
  ],
  pages: {
    signIn: '/blog/admin',
    error: '/blog/admin?error=true'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token as JWT & { role?: string }).role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};

export default NextAuth(authOptions);