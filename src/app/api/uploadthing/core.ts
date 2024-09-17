import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  }).onUploadComplete(async({ file }) => {
    return {file};
  }),

  fileUploader: f(
    ["text", "pdf", "audio", "video"]
  ).onUploadComplete(async ({ file }) => {
      return {file};
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
