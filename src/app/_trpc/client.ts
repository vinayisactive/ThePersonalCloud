import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { type AppRouter } from "@/server";

export const trpc = createTRPCReact<AppRouter>({}); 
