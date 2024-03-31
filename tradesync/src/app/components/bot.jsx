"use client";
import React, { useState } from "react";

const Bot = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div
        onClick={handleClick}
        className="bg-violet-50 border-violet-600 shadow-xl w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-all text-white"
      >
        <img src="/bot.png" height={40} width={40} alt="" />
      </div>
      <div
        className={`absolute bottom-[31rem] max-sm:bottom-[30rem] m-8 p-4 cursor-pointer rounded-lg ${
          isActive ? "block" : "hidden"
        }`}
        onClick={handleClick}
      >
        <img src="/close.png" alt="" />
      </div>
      {isActive && (
        <div className="sticky top-20 right-4">
          <iframe
            src="https://trade-sync-chat.vercel.app/"
            title="Trade Sync Chat"
            width="350px"
            height="500px"
            className="rounded-lg shadow-xl"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Bot;
