import React from "react";
import { MintingEmbed } from "@metacommerce-app/minting";

const MintingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#111111] py-10 py-2 text-white">
      <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
        <span className="from-brandred to-brandblue block bg-gradient-to-r bg-clip-text px-2 text-transparent">Minting</span>
      </h1>
      <div className="rounded-lg bg-white p-10 text-black shadow-xl">
        <MintingEmbed embedId="456" />
      </div>
    </div>
  );
};

export default MintingPage;
