import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { user, images } from "@/database/schema";
import { db } from "@/database";
import { z } from "zod";

const uploadImageSchema = z.object({
  url: z.string().url("Invalid URL"),
  name: z.string().min(1, "File name is required"),
  key: z.string().min(1, "File key is required"),
  size: z.number().positive("File size must be positive"),
});

export const imageRouter = router({
    getImages : publicProcedure.query(async ({ ctx }) => {
        try {
          const id = ctx.id;
    
          if (!id) {
            return {
              code: "UNAUTHORIZED",
              message: "User is unauthorized",
            };
          }
    
          const foundUser = await db.query.user.findFirst({
            where: eq(user.clerkUserId, id),
          });
    
          if (!foundUser) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }
    
          const userImages = await db
            .select()
            .from(images)
            .where(eq(images.userId, foundUser.id));
    
          if (!userImages.length) {
            return {
              data: [],
              total: 0,
              message: "No images found for the user",
            };
          }

          return {
            data: userImages,
            total: userImages.length,
            message: "Images fetched successfully",
          };

        } catch (error) {
          if (error instanceof TRPCError) {
            throw error;
          }
          console.error("Error fetching user files:", error);
    
          return {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred while fetching the files",
          }
        }
    }),

    uploadImage : publicProcedure
    .input(uploadImageSchema)
    .mutation( async({input, ctx}) => {
      try {
       
        const id = ctx.id;

        if (!id) {
          return {
            data: {
              id: ctx.id,
              email: ctx.email
            },
            code: "UNAUTHORIZED",
            message: "User is unauthorized",
          };
        }

        const foundUser = await db.query.user.findFirst({
          where: eq(user.clerkUserId, id),
        });

        if (!foundUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const image = await db
          .insert(images)
          .values({
            userId: foundUser.id,
            url: input.url,
            name: input.name,
            size: input.size,
            key: input.key,
          })
          .returning();

          if (!image) {
            return {
              code: "FAILED",
              message: "Failed to upload file",
              data: [],
            };
          }
  
          return {
            code: "SUCCESS",
            message: "File uploaded successfully",
            data: image,
          };
        
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error fetching user files:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while uploading the file",
        });
      }
    })
}); 

export const ImageRouter = typeof imageRouter; 