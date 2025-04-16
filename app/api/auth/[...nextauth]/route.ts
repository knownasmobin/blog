import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Starting authorization...');
        
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        // Log environment variables (be careful with this in production)
        console.log('Environment check:');
        console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
        console.log('ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);

        const adminUsername = process.env.ADMIN_USERNAME?.replace(/"/g, '');
        const adminPassword = process.env.ADMIN_PASSWORD?.replace(/"/g, '');

        if (!adminUsername || !adminPassword) {
          console.log('Admin credentials not configured properly');
          throw new Error('Admin credentials not configured');
        }

        console.log('Comparing credentials...');
        console.log('Provided username:', credentials.username);
        console.log('Expected username:', adminUsername);

        // Simple direct comparison with environment variables
        const isValidUsername = credentials.username === adminUsername;
        const isValidPassword = credentials.password === adminPassword;

        if (!isValidUsername || !isValidPassword) {
          console.log('Invalid credentials');
          console.log('Username match:', isValidUsername);
          console.log('Password match:', isValidPassword);
          return null;
        }

        console.log('Authentication successful');
        return {
          id: '1',
          name: adminUsername,
          email: `${adminUsername}@admin.com`,
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST }; 