import Image from "next/image";
import Link from "next/link";
import iCloudIcon from "../../public/assets/icloud.svg";
import arrowIcon from "../../public/assets/save.png";

const page = async () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-6 px-4">
      <Image src={iCloudIcon} alt="iCloudIcon" height={100} width={100} />

      <h1 className=" text-5xl text-center">Your Personal Cloud Manager</h1>
      <p className="text-center">
        Powered by - NextJS, TypeScript, Tailwind, tRPC, Postgres, Drizzle, React-query, and Passwordless authentication.
      </p>

      <Link
        href={"/dashboard"}
        className="border-2 px-4 py-2 rounded-3xl shadow-lg hover:border-2 hover:border-black transition-all duration-100 flex justify-center items-center gap-2"
      >
        Your dashboard
        <Image src={arrowIcon} alt="arrow icon" height={20} width={20} />
      </Link>
    </div>
  );
};

export default page;
