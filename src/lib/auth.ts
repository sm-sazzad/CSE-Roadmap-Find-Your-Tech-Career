import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { sendVerificationEmail } from "@/lib/mail";

const MONGODB_URL = process.env.MONGODB_URL;
const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const SECRET = process.env.BETTER_AUTH_SECRET;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is not defined");
}
if (!SECRET) {
  throw new Error("BETTER_AUTH_SECRET environment variable is not defined");
}

declare global {
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(MONGODB_URL);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(MONGODB_URL);
}

const db = client.db("Cse_Roadmap");

export const auth = betterAuth({
  baseURL: BASE_URL,
  secret: SECRET,
  trustedOrigins: [BASE_URL],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({ to: user.email, url });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
