import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import SignInOAuthButtons from './SignInOAuthButtons'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
        <div className='flex gap-2 items-center'>
            SnapStudy
        </div>

        <SignedIn>
          <SignOutButton/>
        </SignedIn>

        <SignedOut>
            <SignInOAuthButtons/>
        </SignedOut>
    </div>
  )
}

export default NavBar