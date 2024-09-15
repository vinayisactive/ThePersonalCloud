import { currentUser } from "@clerk/nextjs/server";
import { inferAsyncReturnType } from "@trpc/server";
import { emit } from "process";

export const createContext = async(req: Request) => {
    const user = await currentUser();
    
    // if (!user) {
    //     throw new Error("Unauthorized"); 
    //   }
    
      // const id = user?.emailAddresses[0]?.id;
      // const email = user?.emailAddresses[0].emailAddress;

      const id = "dummy testing"
      const email = "dummy testing"
      
      return { id, email };
}; 

export type Context = inferAsyncReturnType<typeof createContext>; 