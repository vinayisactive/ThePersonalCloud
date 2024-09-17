"use client";

import React from "react";
import icloudIcon from "./../../public/assets/icloud.svg";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthings";
import { trpc } from "@/app/_trpc/client";
import filesIcon from "../../public/assets/files.svg";
import Link from "next/link";

const Cloud = () => {

  const utils = trpc.useUtils();
  const file = trpc.file.getFiles.useQuery();
  const fileMutation = trpc.file.uploadFile.useMutation({
    onSuccess: () => {
      utils.file.getFiles.invalidate();
    },
  });

  const { data, isLoading, error, isFetching }: any = file;
  const files = data?.data;

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="h-16 w-full rounded-tr-3xl rounded-tl-3xl flex justify-between px-2 pr-6 bg-[#e5eff9]">
        <div className="flex justify-center items-center gap-2">
          <Image src={icloudIcon} alt="PhotosIcon" width={40} height={40} />

          <div className="flex flex-col justify-start items-start">
            <p className="text-xl font-bold">Cloud</p>
            <div className="text-sm">
              {isLoading
                ? "loading..."
                : `${
                    files?.length === undefined ? "0" : files?.length
                  } Recent files`}
            </div>
          </div>
        </div>

        <UploadButton
          endpoint="fileUploader"
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              const { url, key, name, size } = res[0];
              try {
                await fileMutation.mutateAsync({ url, key, name, size });
                file.refetch();
              } catch (error: any) {
                console.error("Error in upload mutation:", error);
                alert(`Upload failed: ${error.message}`);
              }
            }
          }}
          onUploadError={(error) => {
            console.error("Upload error:", error);
            alert(`Upload error: ${error.message}`);
          }}
          className="py-2 -mb-2"
        />
      </div>

      <div className="w-full h-full flex justify-center items-center px-2">
        {isFetching ? (
          <div className="w-full h-full flex justify-center items-center">
            Loading Files...
          </div>
        ) : error ? (
          <div className="w-full h-full flex justify-center items-center">
            {error.message}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {files.length ? (
              <div className="w-full h-full overflow-x-scroll flex gap-3">
                {files?.map(
                  (file: { url: string; key: string; name: string }) => {
                    return (
                      <Link
                        href={file.url}
                        key={file.key}
                        className="flex flex-col gap-1 items-center justify-center shrink-0"
                      >
                        <Image
                          src={filesIcon}
                          alt="fileIcon"
                          width={100}
                          height={100}
                        />
                        <p className="text-black text-sm shrink-0">
                          {file.name.length > 10
                            ? file.name.slice(0, 10)
                            : file.name}
                        </p>
                      </Link>
                    );
                  }
                )}
              </div>
            ) : (
              <div className=" w-full h-full flex flex-col justify-center items-center gap-2">
                <Image src={filesIcon} alt="files"  width={100} height={100}/>
                <p className="pt-1">Upload your first file</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cloud;
