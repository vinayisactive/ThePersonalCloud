import { publicProcedure, router } from "../trpc";
import { db } from "@/database";
import { user, notes } from "@/database/schema";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const uploadNoteSchema = z.object({
  note: z.string().min(1),
});

const updateNoteSchema = z.object({
  id: z.number(),
  note: z.string().min(1),
});

const deleteNoteSchema = z.object({
  id: z.number(),
});

export const noteRouter = router({
  getNotes: publicProcedure.query(async ({ ctx }) => {
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

      const userNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, foundUser.id));

      if (!userNotes.length) {
        return {
          data: [],
          total: 0,
          message: "No notes found for the user",
        };
      }

      return {
        data: userNotes,
        total: userNotes.length,
        message: "Notes fetched successfully",
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      console.error("Error fetching user notes:", error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while fetching the notes",
      });
    }
  }),

  createNote: publicProcedure
    .input(uploadNoteSchema)
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

        const note = await db
          .insert(notes)
          .values({
            userId: foundUser.id,
            note: input.note,
          })
          .returning();

        if (!note) {
          return {
            code: "FAILED",
            message: "Failed to create note",
            data: [],
          };
        }

        return {
          code: "SUCCESS",
          message: "note created successfully",
          data: note,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error creating user note:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while creating the note",
        });
      }
    }),

  updateNote: publicProcedure
    .input(updateNoteSchema)
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

        const updatedNote = await db
          .update(notes)
          .set({ note: input.note })
          .where(and(eq(notes.id, input.id), eq(notes.userId, foundUser.id)))
          .returning();

        if (!updatedNote) {
          return {
            code: "FAILED",
            message: "Failed to update note",
            data: [],
          };
        }

        return {
          code: "SUCCESS",
          message: "Note updated successfully",
          data: updatedNote,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error updating user note:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while updating the note",
        });
      }
    }),

  deleteNote: publicProcedure
    .input(deleteNoteSchema)
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

        const deleteNote = await db
          .delete(notes)
          .where(and(eq(notes.id, input.id), eq(notes.userId, foundUser.id)))
          .returning();

        if (!deleteNote) {
          return {
            code: "FAILED",
            message: "Failed to update note",
            data: [],
          };
        }

        return {
          code: "SUCCESS",
          message: "Note updated successfully",
          data: deleteNote,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error updating user note:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while updating the note",
        });
      }
    }),
});

export const NoteRouter = typeof noteRouter;
