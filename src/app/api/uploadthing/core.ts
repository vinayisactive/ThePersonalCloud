import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 1 }})
    .onUploadComplete(async ({ file }) => {   
      
      let upload; 

      if(file.url){
       const ctx = await createContext();
       upload = await appRouter.file.uploadFile({
        ctx, 
        rawInput: {
          url: file.url,
          key: file.url,
          name: file.url,
          size: file.size
        },
        path: "fiel.uploadFile",
        type: "mutation"
       })
      }

      if(!upload){
        return {
          success: false
        }
      }
      
      return { 
        success: true
      };
    }),   

    fileUploader: f(["text", "pdf", "audio", "video"])
    .onUploadComplete(async ({ file }) => {
      console.log(file)
      return { url: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
