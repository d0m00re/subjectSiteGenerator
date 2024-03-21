import { BACKEND_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as networkAuth from "@/network/auth.network";


async function refreshToken(token: JWT): Promise<JWT> {
  const res = await networkAuth.refreshToken({refreshToken : token.backendTokens.refreshToken});
  
  console.log("refreshed")

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "jsmith"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password)
          return null;
        const { username, password } = credentials;
        const res = await networkAuth.login({username, password});
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({token, user}) {
      console.log("jwt");
      if (user)
        return { ...token, ...user};

        
      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;
      return await refreshToken(token);
    },

    async session({token, session}) {
      console.log("session")
      session.user = token.user;
      console.log(token)
      session.backendTokens = token.backendTokens;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };