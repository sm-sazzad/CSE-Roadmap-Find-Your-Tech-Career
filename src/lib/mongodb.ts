import { MongoClient, type Db } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL;
const DATABASE_NAME = "Cse_Roadmap";

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is not defined");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URL);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URL);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  return (await clientPromise).db(DATABASE_NAME);
}

export { clientPromise };
