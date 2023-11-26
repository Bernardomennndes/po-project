import Image from 'next/image'
import { Heading } from '@radix-ui/themes'
import React from 'react'

const Nav = () => {
  return (
    <div className="w-full flex items-center h-[60px] shadow-md pl-[50px] gap-3">
      <Image
        src="/icon.svg"
        width={40}
        height={40}
        alt="icon"
      />
      <Heading>Calculadora Simplex</Heading>
    </div>
  )
}

export default Nav