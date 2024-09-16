import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 10 }})
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.url);
      return { url: file.url };
    }),

    fileUploader: f(["text", "pdf", "audio", "video"])
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.url);
      return { url: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
