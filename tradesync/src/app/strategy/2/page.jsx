import * as React from "react";

export default function MyComponent() {
  return (
    <div className="flex flex-col mx-auto max-w-[686px]">
        <div className="text-2xl leading-10    font-bold text-black flex align-items justify-center text-stone-700">
                Strategy 2
              </div>
      <div className="w-full ml-20  max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col  max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-0.5 mt-16 w-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(119,237,145,0.78_16.875deg,rgba(119,237,145,0.78)_88.12500178813934deg,rgba(119,237,145,0.78)_151.875deg,rgba(119,237,180,0.78)_225deg,rgba(126,255,155,0.78)_288.7499928474426deg,rgba(44,149,67,0.78)_360deg),conic-gradient(from_180deg_at_50%_50%,#FFF_30.00000089406967deg,#000_95.625deg,#FFF_168.75deg,#000_228.75000715255737deg,#FFF_285.0000071525574deg,#000_360deg),radial-gradient(116.62%_141.42%_at_0%_0%,#000_7.61%,#A3A3A3_57.81%,#000_100%))] rounded-[34px] max-md:mt-10">
              <div className="flex overflow-hidden relative flex-col px-4 pt-4 pb-7 w-full aspect-[1.23]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7c897a3bf4d2b33736ec2250bb5acdd1bbf131e8ee649acbaeb8a5fbd759cc?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative n">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/022b6b4c8a26efde96f9ed60e083ac55353bb8843452482677c67c3b1195c41c?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                    className="shrink-0 w-12 aspect-square"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c32a24e810fa6eec1e262bf9ab9e230cd7fa62d4a76b3060a4f779aeee420651?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                    className="shrink-0 self-start aspect-square w-[18px]"
                  />
                </div>
                <div className="relative self-start mt-4 text-base tracking-normal leading-6 text-zinc-900">
                  Compound
                </div>
                <div className="relative self-start mt-2 text-3xl font-bold tracking-wide leading-10 text-stone-950">
                  xxxxx
                </div>
                <div className="relative mt-28 text-3xl tracking-wide leading-10 text-stone-950 max-md:mt-10">
                  <span className="text-2xl">+8250%</span>{" "}
                  <span className="text-xs font-bold">All time</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 text-base font-bold text-black max-md:mt-10">
              {/* <div className="text-2xl leading-10 text-stone-700">
                Strategy 1
              </div> */}
              <div className="justify-center items-center px-2.5 py-4 mt-24 bg-green-300 rounded-3xl max-md:px-5 max-md:mt-10">
                Buy now
              </div>
              <div className="justify-center items-center px-2.5 py-4 mt-7 bg-red-400 rounded-3xl max-md:px-5">
                Sell now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-5 py-5 mt-20 w-full bg-neutral-900 rounded-[34px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-3">
            <div className="pt-1 pb-3 text-2xl leading-7 text-black whitespace-nowrap">
              ⌛
            </div>
            <div className="self-start text-2xl leading-7 text-zinc-50">
              Stock weights
            </div>
          </div>
          <div className="flex-auto my-auto text-sm font-bold text-green-300">
            See all
          </div>
        </div>
        <div className="flex gap-5 justify-between px-3.5 py-4 mt-3.5 whitespace-nowrap bg-white rounded-[30px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col justify-center">
            <div className="flex gap-2.5">
              <div className="my-auto text-base text-center text-black">1</div>
              <div className="flex gap-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bc140c0d573a385cb166194e122dbf66c7ba10835dd4306621ea10e4bde9593?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex gap-1 self-start">
                  <div className="text-base leading-6 text-black">ETF</div>
                  <div className="my-auto text-xs text-zinc-800">AAEE</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-base leading-6 text-stone-900">$0.000314</div>
        </div>
        <div className="flex gap-5 justify-between px-3.5 py-4 mt-2 whitespace-nowrap bg-white rounded-[30px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col justify-center">
            <div className="flex gap-2.5">
              <div className="my-auto text-base text-center text-black">2</div>
              <div className="flex gap-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3175f75224930e1b5635cead250d30b8ff13104128d25af94873f80ff6d305?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex gap-1 self-start">
                  <div className="text-base leading-6 text-black">AAPL</div>
                  <div className="my-auto text-xs text-zinc-800">Apple</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-base leading-6 text-stone-900">$0.0008765</div>
        </div>
        <div className="flex gap-5 justify-between px-3.5 py-4 mt-2 whitespace-nowrap bg-white rounded-[30px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col justify-center">
            <div className="flex gap-2.5">
              <div className="my-auto text-base text-center text-black">3</div>
              <div className="flex gap-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/94f24fdbd53a8b23ce81ac9b7eb0d269124d8acd477d2bc10800323c33fd24ab?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex gap-1 self-start">
                  <div className="text-base leading-6 text-black">META</div>
                  <div className="my-auto text-xs text-zinc-800">Meta</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-base leading-6 text-stone-900">
            $0.00000001239
          </div>
        </div>
      </div>
    </div>
  );
}


