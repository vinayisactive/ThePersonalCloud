import { NextRequest, NextResponse } from "next/server";
import { appRouter } from "@/server/index";  // Adjust this import path as needed
import { createContext } from "@/server/context";  // Adjust this import path as needed

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as a string
    const rawBody = await req.text();

    // Get the Svix headers
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Missing svix headers', { status: 400 });
    }

    const ctx = await createContext(req);
    const result = await appRouter.user.handleClerkWebhook({
        ctx,
        rawInput: {
          body: rawBody,
          svix_id,
          svix_timestamp,
          svix_signature,
        },
        path: "user.handleClerkWebhook",
        type: "mutation"
      });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}