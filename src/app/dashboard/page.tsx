import Account from "@/components/Account";
import Cloud from "@/components/Cloud";
import Notes from "@/components/Notes";
import Photos from "@/components/Photos";

const page = () => {
  return (
    <div className="w-screen h-screen flex gap-2 justify-center items-center px-4 lg:px-40">
        <div className="w-full h-screen lg:h-auto grid grid-cols-1 gap-4 lg:grid-cols-3 mt-36 lg:mt-0">
          
          <div className="border rounded-3xl h-[300px] w-full flex justify-center items-center">
            <Account />
          </div>

          <div className="border rounded-3xl h-[300px] w-full col-span-1 lg:col-span-2  flex justify-center items-center">
              <Photos/>
          </div>

          <div className="border rounded-3xl h-[300px] w-full col-span-1 lg:col-span-2  flex justify-center items-center">
            <Cloud />
          </div>

          <div className="border rounded-3xl h-[300px] w-full flex justify-center items-center">
            <Notes/>
          </div>

        </div>
      </div>
  );
};

export default page;

