import { currentUser } from "@clerk/nextjs/server";
import { inferAsyncReturnType } from "@trpc/server";
import { emit } from "process";

export const createContext = async(req: Request) => {
      const user = await currentUser();
      const id = user?.emailAddresses[0]?.id;
      const email = user?.emailAddresses[0].emailAddress;
      
      return { id, email };
}; 

export type Context = inferAsyncReturnType<typeof createContext>; 