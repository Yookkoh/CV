import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        // Support both plaintext ADMIN_PASSWORD and hashed ADMIN_PASSWORD_HASH
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail) return null;
        if (credentials.email !== adminEmail) return null;

        let isValid = false;

        if (adminPassword) {
          // Direct plaintext comparison (simple local dev)
          isValid = credentials.password === adminPassword;
        } else if (adminPasswordHash && adminPasswordHash.startsWith("$2")) {
          // Bcrypt hash comparison
          isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
        } else {
          console.error(
            "[auth] Neither ADMIN_PASSWORD nor a valid ADMIN_PASSWORD_HASH is set."
          );
          return null;
        }

        if (!isValid) return null;
        return { id: "1", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};
