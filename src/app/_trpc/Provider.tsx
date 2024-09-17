"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { trpc } from "./client"
import { useState } from "react"
import { httpBatchLink } from "@trpc/react-query"

const Provider = ({children} : {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient({})); 

    const [trpcClient] = useState(() => {
      return  trpc.createClient({
            links: [
                httpBatchLink({
                    // url: "http://localhost:3000/api/trpc",
                    url: "https://thepersonal-cloud.vercel.app/api/trpc"
                })
            ]
        })
    }); 

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Provider
