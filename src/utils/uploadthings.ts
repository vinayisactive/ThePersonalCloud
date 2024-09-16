import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthings/core";
   
export const UploadButton = generateUploadButton<OurFileRouter>();