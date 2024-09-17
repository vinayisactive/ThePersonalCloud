import { SignedIn,  UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' absolute top-0 left-0 w-screen flex gap-3 justify-end items-center px-4 py-2'>
        <div className='flex justify-center items-center gap-4'>
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
        </div>

        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>
  )
}

export default Navbar
