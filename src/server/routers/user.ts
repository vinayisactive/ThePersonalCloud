import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/database";
import { eq } from "drizzle-orm";
import { user } from "@/database/schema";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET as string;

export const userRouter = router({
  handleClerkWebhook: publicProcedure
    .input(
      z.object({
        body: z.string(),
        svix_id: z.string(),
        svix_timestamp: z.string(),
        svix_signature: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!webhookSecret) {
        return{
            code: "CONFIGURATION_ERROR",
            message: "CLERK_WEBHOOK_SECRET is not set in the environment variables"
            } 
      }

      const wh = new Webhook(webhookSecret);
      let evt: WebhookEvent;

      try {
        evt = wh.verify(input.body, {
          "svix-id": input.svix_id,
          "svix-timestamp": input.svix_timestamp,
          "svix-signature": input.svix_signature,
        }) as WebhookEvent;
      } catch (err) {
        console.error("Error verifying webhook:", err);
        return{
            code: "HOOK_VERIFICATION_ERROR",
            message: "Error verifying hook"
            } 
      }

      const { id } = evt.data;
      const eventType = evt.type;

      console.log(`Webhook with an ID of ${id} and type of ${eventType}`);

      if (eventType === "user.created") {
        const { id: clerkUserId, email_addresses, ...attributes } = evt.data;

        if (email_addresses.length === 0) {
          throw new Error("User has no email addresses");
        }

        const userEmail = email_addresses[0].email_address;

        console.log(`New user created: ${clerkUserId}, Email: ${userEmail}`);

        try {
          const newUser = await db
            .insert(user)
            .values({
              clerkUserId: clerkUserId,
              email: userEmail,
            })
            .returning();

          console.log("User inserted into database:", newUser);

          return {
            status: "success",
            message: "User created successfully",
            user: newUser[0],
          };
        } catch (error) {
          console.error("Error inserting user into database:", error);
          return{
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user in database"
            } 
        }
      }

      return { status: "success", message: "Webhook received" };
    }),

  getUser: publicProcedure.query(async ({ ctx }) => {
    try {
      const id = ctx.id
      
      if(!id){
        return{
          code: "CLERKID_NOT_FOUND",
          message: "clerkUserId not found",
        }
      }

      const foundUser = await db.query.user.findFirst({
        where: eq(user.clerkUserId, id),
      });
      
      if (!foundUser) {
        return{
          code: "NOT_FOUND",
          message: "User not found",
        }
      }

      return foundUser;
    } catch (error) {
      console.error("Error fetching user:", error);
        return{
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching the user",
        } 
    }
  }),
});

export type UserRouter = typeof userRouter;
