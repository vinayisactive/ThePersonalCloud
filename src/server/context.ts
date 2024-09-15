import { currentUser } from "@clerk/nextjs/server";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async(req: Request) => {
    const user = await currentUser();
    
    if (!user) {
        throw new Error("Unauthorized"); 
      }
    
      const id = user.emailAddresses[0]?.id;
      const email = user?.emailAddresses[0].emailAddress;
      return { id, email };
}; 

export type Context = inferAsyncReturnType<typeof createContext>; 