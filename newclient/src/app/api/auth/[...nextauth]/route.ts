import bcrypt from 'bcrypt';

import { prisma } from '@/app/lib/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import type { NextAuthOptions } from 'next-auth';
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
       
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            // start of authorize func
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                if (!credentials?.email || !credentials?.password) {
                  throw new Error('Please enter an email and password');
                }
              
                const dbUser = await prisma.user.findUnique({
                  where: {
                    email: credentials.email,
                  },
                });
              
                if (!dbUser || !dbUser?.hashed_password) {
                  return null;
                }
              
                const passwordMatch = await bcrypt.compare(credentials.password, dbUser.hashed_password);
              
                if (!passwordMatch) {
                  return null;
                }
              
                const user = {
                    id: dbUser.id + '',
                    email: dbUser.email,
                    first_name: dbUser.first_name,
                    last_name: dbUser.last_name,

                };
                
                return user;
                
              },
        }),  
    ],
    secret: process.env.SECRET || "a-default-secret", // Replace with a default secret if needed
    session: {
        strategy: "jwt" as const,
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };