import Image from "next/image";
import { Heading } from "@radix-ui/themes";
import React from "react";

const Nav = () => {
  return (
    <nav className="w-full flex justify-center border-b">
      <div className="w-full max-w-[1400px] px-8 py-4 flex items-center gap-2">
        <Image src="/icon.svg" width={40} height={40} alt="icon" />

        <Heading>Calculadora Simplex</Heading>
      </div>
    </nav>
  );
};

export default Nav;
