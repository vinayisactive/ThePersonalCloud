import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image";
import icloudIcon from '../../public/assets/icloud.svg'

const Account = async() => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  return (
    <div className="w-full h-full flex flex-col justify-center items-start px-6 bg-[#e5eff9] rounded-3xl">
          <Image src={icloudIcon} alt="icloud" width={100}/>
          <p className="text-xl font-bold pt-2">{email}</p>
    </div>
  )
}

export default Account
