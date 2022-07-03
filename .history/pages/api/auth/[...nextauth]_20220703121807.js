import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID||"815127384825-op546t0hmm705865aquqlnde7c64kuut.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||"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",
    }),
    // ...add more providers here
  ],
    pages:{
      signIn:'/auth/signin',
    },
    
    callbacks: {
      async session({ session, token }) {
        session.user.username = session.user.name
          .split(" ")
          .join("")
          .toLocaleLowerCase();
        session.user.uid = token.sub;
        return session;
      },
    },
})

