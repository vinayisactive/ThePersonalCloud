import type { Metadata } from "next";
import { ClerkProvider,} from '@clerk/nextjs'
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "./_trpc/Provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";


export const metadata: Metadata = {
  title: "ThePersonalCloud",
  description: "Personal cloud management tool",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>       
        <Navbar />
        <Provider>
        <NextSSRPlugin  routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
        </Provider>
      </body>
    </html>
  </ClerkProvider>
  );
}
