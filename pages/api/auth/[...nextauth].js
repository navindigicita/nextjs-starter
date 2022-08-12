import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { db } from "../../../firebase-config"
import * as firebaseFuntions from 'firebase/firestore'

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET_KEY,
        }),
    ],
    adapter: FirestoreAdapter({
        db: db,
        ...firebaseFuntions
    })
})