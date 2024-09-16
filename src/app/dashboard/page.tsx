"use client";
import { UploadButton } from "@/utils/uploadthings";

const page = () => {
  return (
    <div className=" w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <h1 className="text-black">Dashboard</h1>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          console.log(error)
          alert(`ERROR! ${error}`);
        }}
      />

     <UploadButton
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          console.log(error)
          alert(`ERROR! ${error}`);
        }}
      />
    </div>
  );
};

export default page;
