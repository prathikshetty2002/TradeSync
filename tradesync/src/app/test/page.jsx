import * as React from "react";

export default function MyComponent() {
  return (
    <div className="flex flex-col justify-center text-xl text-black bg-white">
      <div className="flex overflow-hidden relative flex-col px-5 py-20 w-full min-h-[1776px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/633ef584f363d22178ee5aba0de86b044ff91b69ae6d531218fc1ce6a4e578e7?"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative self-center text-6xl font-bold max-md:max-w-full max-md:text-4xl">
          PORTFOLIO
        </div>
        <div className="flex relative flex-col items-center px-14 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="justify-center items-start self-stretch px-12 py-5 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5 max-md:max-w-full">
            Your Stocks are resting here:{" "}
          </div>
          <div className="flex gap-4 justify-between mt-12 max-w-full whitespace-nowrap w-[786px] max-md:flex-wrap max-md:mt-10">
            <div className="items-start self-start px-14 pt-8 pb-4 mt-1.5 rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
              Company:
            </div>
            <div className="justify-center items-start px-12 py-8 my-auto rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
              MSFT
            </div>
            <div className="justify-center px-10 py-9 rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
              Quantity:
            </div>
            <div className="justify-center items-start self-start px-11 py-7 rounded-xl shadow-[46px_46px_40px_rgba(0,0,0,0.25)] max-md:px-5">
              6
            </div>
          </div>
          <div className="flex gap-4 justify-between mt-5 max-w-full whitespace-nowrap w-[786px] max-md:flex-wrap">
            <div className="items-start self-start px-14 pt-8 pb-4 mt-1.5 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5">
              Company:
            </div>
            <div className="justify-center items-start px-12 py-8 my-auto rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5">
              MSFT
            </div>
            <div className="justify-center px-10 py-9 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5">
              Quantity:
            </div>
            <div className="justify-center items-start self-start px-11 py-7 rounded-xl shadow-[46px_46px_40px_rgba(0,0,0,0.25)] max-md:px-5">
              6
            </div>
          </div>
          <div className="flex gap-5 mt-20 w-full max-w-[1227px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="grow items-start px-6 pt-6 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              CAGR : 9999
            </div>
            <div className="grow items-start px-8 pt-7 pb-10 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Annualized volatility : 15 %{" "}
            </div>
          </div>
          <div className="flex gap-5 mt-5 w-full max-w-[1227px] max-md:flex-wrap max-md:max-w-full">
            <div className="grow justify-center items-start px-6 py-8 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Sharpe Ratio : 9999
            </div>
            <div className="grow items-start px-8 pt-7 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Sortino Ratio : 15 %{" "}
            </div>
          </div>
          <div className="justify-center items-start px-12 py-9 mt-12 max-w-full rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-[575px] max-md:px-5 max-md:mt-10">
            Max Drawdown : 5 %
          </div>
        </div>
        <div className="flex relative flex-col items-center px-14 mt-12 mb-1.5 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 w-full max-w-[1216px] max-md:flex-wrap max-md:max-w-full">
            <div className="grow items-start px-6 pt-6 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Current Balance: 10000
            </div>
            <div className="grow items-start px-8 pt-7 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Total Invested: 20000
            </div>
          </div>
          <div className="items-start self-stretch px-12 pt-6 pb-11 mt-20 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            Your Strategies are waiting here:{" "}
          </div>
          <div className="flex gap-5 mt-7 w-full whitespace-nowrap max-w-[1212px] max-md:flex-wrap max-md:max-w-full">
            <div className="justify-center items-start px-10 py-9 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5">
              Strategy:
            </div>
            <div className="grow justify-center items-start px-9 py-10 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              MSFT
            </div>
          </div>
          <div className="flex gap-5 mt-14 w-full whitespace-nowrap max-w-[1212px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="items-start px-10 pt-5 pb-14 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 max-md:px-5">
              Quantity:
            </div>
            <div className="grow items-start px-14 pt-7 pb-12 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              6
            </div>
          </div>
          <div className="flex gap-5 mt-20 w-full max-w-[1245px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="grow items-start px-6 pt-6 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Current Balance: 10000
            </div>
            <div className="grow items-start px-8 pt-7 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
              Total Invested: 20000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


