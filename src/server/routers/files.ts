import { eq } from "drizzle-orm";
import { publicProcedure, router } from "../trpc";
import { db } from "@/database";
import { files, user } from "@/database/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const uploadFileSchema = z.object({
  url: z.string().url("Invalid URL"),
  name: z.string().min(1, "File name is required"),
  key: z.string().min(1, "File key is required"),
  size: z.number().positive("File size must be positive"),
});

export const fileRouter = router({
  getFiles: publicProcedure.query(async ({ ctx }) => {
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

      const userFiles = await db
        .select()
        .from(files)
        .where(eq(files.userId, foundUser.id));

      if (!userFiles.length) {
        return {
          data: [],
          total: 0,
          message: "No files found for the user",
        };
      }

      return {
        data: userFiles,
        total: userFiles.length,
        message: "Files fetched successfully",
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      console.error("Error fetching user files:", error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while fetching the files",
      });
    }
  }),

  uploadFile: publicProcedure
    .input(uploadFileSchema)
    .mutation(async ({ input, ctx }) => {
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

        const file = await db
          .insert(files)
          .values({
            userId: foundUser.id,
            url: input.url,
            name: input.name,
            size: input.size,
            key: input.key,
          })
          .returning();

        if (!file) {
          return {
            code: "FAILED",
            message: "Failed to upload file",
            data: [],
          };
        }

        return {
          code: "SUCCESS",
          message: "File uploaded successfully",
          data: file,
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
    }),
});

export const FileRouter = typeof fileRouter;
