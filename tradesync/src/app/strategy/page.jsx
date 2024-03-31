import * as React from "react";

function LatestReleaseCard({ title, level, date, duration, image, avatar ,link }) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
       <a href={`strategy${link}`}>
        
      <div className="flex overflow-hidden relative flex-col grow pt-3.5 aspect-[0.95] max-md:mt-5">
        <img src={image} alt="" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative flex-col self-end max-w-full text-xs leading-5 text-green-300 whitespace-nowrap w-[142px] max-md:mr-2.5">
          <div className="justify-center self-end px-3 py-1.5 rounded-3xl backdrop-blur bg-white bg-opacity-10">
            {level}
          </div>
          <img src={avatar} alt="" className="mt-6 w-12 aspect-square" />
        </div>
        <div className="flex relative flex-col px-3.5 py-4 mt-16 w-full rounded-none backdrop-blur-[47px] bg-black bg-opacity-10 max-md:mt-10">
          <div className="text-sm font-medium tracking-normal leading-5 text-white">
            {title}
          </div>
          <div className="flex gap-5 justify-between mt-4 text-xs text-neutral-400">
            <div>{date}</div>
            <div>{duration}</div>
          </div>
        </div>
      </div>
      </a>
    </div>
  );
}

export default  function MyComponent() {
  const latestReleaseData = [
    {
      title: " Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1  Strategy 1 ",
      level: "Beginner",
      date: "Sep 3, 2024",
      link:"/1",
      duration: "10m",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4b56ae5c8757c84872614f057221f9805f16c9c6aa3df0e833320b8c076a18a9?apiKey=d1ee9f6275604677bd2583ecebeab853&",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd6b1c794d89ef05ffd6b2e46d1ce0b92746ebb940eb604b98ac2071856e9b7c?apiKey=d1ee9f6275604677bd2583ecebeab853&",
    },
    {
      title: "Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 Stratezy 2 ",
      level: "Beginner",
      date: "aug 2, 2024", 
      duration: "15m",
      link:"/2",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bd95684a8cef2f9350f7cc7640b06e3994f2a233b7baadc483bc967208e361f3?apiKey=d1ee9f6275604677bd2583ecebeab853&",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a9cc49adc333ca628139d3f663b567c4095f3f88c23177230a7805e7de40d48?apiKey=d1ee9f6275604677bd2583ecebeab853&",
    },
    {
      title: "Stratz 3 Stratz 3 Stratz 3 Stratz 3 Stratz 3",
      level: "Advance",
      date: "Oct 2, 2024",
      link:"/3",
      duration: "5m", 
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/16d6c5f3b504ed814c57e9da2ca8d0ac7dfc15acde5d401eb65c5c45d4403116?apiKey=d1ee9f6275604677bd2583ecebeab853&",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a9cc49adc333ca628139d3f663b567c4095f3f88c23177230a7805e7de40d48?apiKey=d1ee9f6275604677bd2583ecebeab853&",
    },
    
  ];

  return (
    <div className="flex  flex-col">
      <div className="flex gap-5 justify-between px-5 w-full max-md:flex-wrap max-md:max-w-full">
        <h2 className="text-2xl text-black">Latest release</h2>
        <div className="my-auto text-base font-medium leading-6 text-green-300">
          See all
        </div>
      </div>
      <div className="mt-5 flex ">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="flex  align-items justify-center md:ml-60  max-md:ml-0 max-md:w-full">
            <div className="grow px-5 max-md:mt-5 ">
              <div className="flex gap-1  max-md:gap-0">
                {latestReleaseData.map((item, index) => (
                  <LatestReleaseCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-1 max-md:mt-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ce121591d3e46edc979ea7b239c0fe911714a20692c6e555ecee09049b84c7?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                alt=""
                className="grow shrink-0 rounded-2xl aspect-[1.01] basis-0 w-fit"
              />
              <div className="flex overflow-hidden relative flex-col pt-20 w-2.5 aspect-[0.04]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/00ba4dd651f00a42bd1b6cbedfbc6e0e0b0f577b8232c0a35ba2c63266b420aa?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  alt=""
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="relative shrink-0 mt-24 rounded-none backdrop-blur-[47px] bg-black bg-opacity-10 h-[95px] max-md:mt-10" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="mt-10 w-full max-md:max-w-full">
        <div className="flex ">
          <div className="flex flex-col md:ml-20 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 max-md:mt-8 max-md:max-w-full">
              <h2 className="text-2xl text-white max-md:max-w-full">Live Now</h2>
              <div className="flex overflow-hidden relative flex-col px-5 pt-5 pb-2.5 mt-5 w-full min-h-[426px] max-md:max-w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9824cfe716644568e951f72e2d72adf71632e4cccd8fd10d2dbda52c004e16e?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  alt=""
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-2 py-0.5 text-center whitespace-nowrap rounded-2xl backdrop-blur-[5px] bg-white bg-opacity-10">
                    <div className="justify-center items-center p-2.5 text-sm font-medium text-black bg-green-300 rounded-xl h-[26px] w-[26px]">
                      K
                    </div>
                    <div className="my-auto text-xs text-white">You</div>
                  </div>
                  <div className="flex flex-col justify-center py-0.5 pr-0.5 pl-1 rounded-2xl backdrop-blur-[5px] bg-white bg-opacity-10">
                    <div className="flex gap-3">
                      <div className="flex gap-2 my-auto">
                        <div className="flex flex-col justify-center items-center p-2.5 bg-white rounded-xl h-[22px] w-[22px]">
                          <div className="shrink-0 w-2 h-2 bg-red-600 rounded-xl" />
                        </div>
                        <div className="my-auto text-xs text-center text-white">
                          Recording...
                        </div>
                      </div>
                      <div className="flex ">
                        <button className="flex justify-center items-center p-0.5 rounded-3xl bg-white bg-opacity-10 h-[26px] w-[26px]">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f15724b24ea24d1677a4a8cb91c9c5e2ba6ed4b2fe27801b90d8343c46382c?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="w-2.5 aspect-square" />
                        </button>
                        <button className="flex justify-center items-center p-0.5 rounded-3xl bg-white bg-opacity-10 h-[26px] w-[26px]">
                          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3d7c8ddaa3e371bd90e90f56818a55132d95421a2d0e3e11651aba1a5a6820e?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="w-2.5 aspect-square" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative gap-2.5 px-px mt-72 max-md:flex-wrap max-md:mt-10">
                  <div className="flex flex-auto gap-5 px-3.5 py-2.5 backdrop-blur-[5.5px] bg-black bg-opacity-30 rounded-[50px] max-md:flex-wrap">
                    <div className="flex flex-auto gap-4 max-md:flex-wrap">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d00c09b25415ca10fe28a4daad35c742b2f8fa82fb8f9475c2bda78d7c4f64a?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 aspect-[2] w-[72px]" />
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe62f5b14ea28a9e771d6c0e1978ec839ae8f97f237f8a202c580da266870c70?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 max-w-full aspect-[3.7] w-[133px]" />
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/38643f964575b5cd361b88a4723dc95cfeb480e8aa122d45adfbebdc9427ae21?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 max-w-full aspect-[3.7] w-[133px]" />
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5878d553521b601adbd52c99b81cc2c949066b893902436d9ad06fe3fd0082ee?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 max-w-full aspect-[3.7] w-[133px]" />
                    </div>
                    <div className="my-auto text-xs text-center text-white">
                      01:23:34
                    </div>
                  </div>
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/aff42a6edac89fa4d2811426452c9678d7718852c5d4a9136fdd3cbeb12c6f75?apiKey=d1ee9f6275604677bd2583ecebeab853&" alt="" className="shrink-0 my-auto aspect-square w-[50px]" />
                </div>
                <div className="relative shrink-0 self-end mr-40 w-2.5 h-2.5 bg-green-300 backdrop-blur-[5.5px] rounded-[41px] max-md:mr-2.5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center w-full text-base leading-6 text-center text-black bg-green-300 rounded-3xl max-md:mt-8">
              <div className="flex overflow-hidden relative flex-col px-5 pt-12 pb-20 aspect-[0.75]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8de24fd6ce4af005a65745aef807db86ad54c7ed9a6a8eaeb3755070ff1a77c3?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  alt=""
                  className="object-cover absolute inset-0 size-full"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bb854794be586ca7689d9244e599e45d5d6085e316c7f26ce76db5b23622d1d?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  alt=""
                  className="self-center max-w-full border-black border-solid aspect-square border-[6px] stroke-[6px] stroke-black w-[120px]"
                />
                <p className="relative mt-8 mb-12 max-md:mb-10">
                Your Transaction, Your Terms
Clear, concise, and devoid of complexities cause Investing should be effortless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}