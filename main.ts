import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import mongoose from "mongoose";
import {typeDefs} from "./schema.ts"
import {Query} from "./Resolvers/Query.ts";
import {Mutation} from "./Resolvers/Mutation.ts";

try{
  const MONGO_URL = Deno.env.get("MONGO_URL");
  if(!MONGO_URL){
    console.log("no url found");
    Deno.exit(1)
  }

  await mongoose.connect(MONGO_URL);

  const resolvers = {Mutation, Query};

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
  });

  const {url} = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    }
  });

  console.log("Server ready");

}catch(err){
  console.log(err);
}