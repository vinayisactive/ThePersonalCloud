import type { Metadata } from "next";
import { ClerkProvider,} from '@clerk/nextjs'
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "./_trpc/Provider";

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
        {children}
        </Provider>
      </body>
    </html>
  </ClerkProvider>
  );
}
