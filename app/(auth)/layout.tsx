import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

const AuthLayout = ({children}: Props) => {
  return (
    <section className='w-full h-screen overflow-hidden flex items-center justify-center bg-[#f0f0f0]'>
      {children}
    </section>
  )
}

export default AuthLayout