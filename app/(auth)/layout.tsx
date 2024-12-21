import Image from "next/image";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <section className="w-full max-w-[2000px] mx-auto  h-screen overflow-hidden flex items-center justify-center relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
        {children}
      </div>
      <div className="w-1/2 h-full bg-primary relative max-md:hidden">
        <Image src={"/imgs/auth/saly-3.svg"} alt="Saly-3.svg" width={300} height={300} className="absolute top-24 right-[40%]"/>
      </div>
      <div className="w-1/2 h-full bg-white relative max-md:hidden">
      <Image src={"/imgs/auth/saly-2.svg"} alt="Saly-2.svg" width={450} height={450} className="absolute top-1/2 -translate-y-1/3 right-[15%]"/>
      </div>
    </section>
  );
};

export default AuthLayout;
