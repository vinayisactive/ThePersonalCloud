import { SignUp } from "@clerk/nextjs"

const page = () => {
  return (
    <div className=" w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
        <SignUp />
    </div>
  )
}

export default page
