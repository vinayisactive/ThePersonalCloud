// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/database";
import Link from "next/link";


const page = async() => {

  // const user = await currentUser();
  // const id = user?.emailAddresses[0].id;
  // const email = user?.emailAddresses[0].emailAddress;

  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center gap-6">
        <h1 className=" text-5xl">Your Personal Cloud Manager</h1>
        <Link href={"/dashboard"} className="border-2 px-2 py-2 rounded-md shadow-lg hover:border-2 hover:border-black transition-all duration-100">Dashboard</Link>
  </div>
  )
}; 

export default page;

