import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from './prismaDb'


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {

    async jwt({ token, user,trigger, session }) {

      if (trigger === "update") {
          await prisma.user.update({
          where: { id: session.user.id },
          data: {
            sid:session.user.sid,
            role: session.user.role,
          },
        });
        return { ...token, ...session.user };
      }
      
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        sid: (dbUser.sid) ? dbUser.sid: " ",
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
    async session({ session,token  }) {
      if (token) {
        session.user.id = token.id;
        session.user.sid = token.sid;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
   
  },
  secret: process.env.NEXTAUTH_SECRET,
};