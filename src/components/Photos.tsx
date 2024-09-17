"use client";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import photosIcon from "../../public/assets/photosIcon.svg";
import { UploadButton } from "@/utils/uploadthings";
import Link from "next/link";


const Photos = () => {
  
  const utils = trpc.useUtils();
  const image = trpc.image.getImages.useQuery();
  const imageMutation = trpc.image.uploadImage.useMutation({
    onSuccess: () => {
      utils.image.getImages.invalidate();
    }
  });
  const { data, isLoading, error, isFetching }: any = image;
  const files = data?.data;

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="h-16 w-full rounded-tr-3xl rounded-tl-3xl flex justify-between px-2 pr-6 bg-[#e5eff9]">
        <div className="flex justify-center items-center gap-2">
          <Image src={photosIcon} alt="PhotosIcon" width={40} height={40} />

          <div className="flex flex-col justify-start items-start">
            <p className="text-xl font-bold">Photos</p>
            <div className="text-sm">
              {isLoading
                ? "loading..."
                : `Library ${
                    files?.length === undefined ? "0" : files?.length
                  } Photos`}
            </div>
          </div>
        </div>

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              const { url, key, name, size } = res[0];
              try {
                await imageMutation.mutateAsync({ url, key, name, size });
                image.refetch();
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
            Loading Photos...
          </div>
        ) : error ? (
          <div className="w-full h-full flex justify-center items-center">
            {error.message}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {files?.length ? (
              <div className="w-full h-full overflow-x-scroll flex gap-2">
                {files?.map((image: { url: string; key: string }) => {
                  return (
                    <Link key={image.key} href={image.url} target="_blank">
                    <img
                      src={image.url}
                      alt="Image"
                      width={100}
                      className="object-contain cursor-pointer"
                    />
                  </Link>
                  );
                })}
              </div>
            ) : (
              <div>Upload a picture...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
