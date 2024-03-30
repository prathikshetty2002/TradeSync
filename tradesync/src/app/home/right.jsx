import * as React from "react";

const BalanceInfo = () => {
  return (
    <div className="flex flex-col justify-center px-5">
      <div className="flex gap-2 pr-1.5 text-xs font-light text-neutral-200">
        <div className="italic">Current balance</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d9a5de01436db9a1a6c25ab610e13fe247d3a61976fbe7958c95185cac0aa52?apiKey=d1ee9f6275604677bd2583ecebeab853&"
          alt="Info icon"
          className="shrink-0 self-start w-3.5 aspect-square"
        />
      </div>
      <div className="mt-2 text-3xl font-medium tracking-wide leading-10 text-white">
        $2,77,308.00
      </div>
      <div className="flex gap-1 mt-2">
        <div className="text-sm tracking-wide text-red-600">
          -$1200.78 (-1.89%)
        </div>
        <div className="justify-center px-1.5 py-0.5 text-xs whitespace-nowrap rounded-2xl bg-zinc-900 text-neutral-200">
          24H
        </div>
      </div>
    </div>
  );
};

const TransactionButtons = () => {
  return (
    <div className="flex gap-2.5 my-auto text-base font-medium">
      <button className="flex flex-col justify-center py-2.5 pr-6 pl-5 text-white whitespace-nowrap rounded-3xl bg-zinc-900">
        <div className="flex gap-1">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddb0b2a6b08731443db3b0fe6f1faf2bd00f8163843aa0b85478720a33a7e447?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            alt="Edit icon"
            className="shrink-0 aspect-square w-[22px]"
          />
          <div>Edit</div>
        </div>
      </button>
      <button className="flex flex-col justify-center py-2.5 pr-6 pl-5 bg-green-300 rounded-3xl text-stone-950">
        <div className="flex gap-0.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/69959fa54ce46c0894919cabcdb9fdbd5b56d4c7007dd2794b5dba67d0b10e6c?apiKey=d1ee9f6275604677bd2583ecebeab853&"
            alt="Add transaction icon"
            className="shrink-0 w-6 aspect-square"
          />
          <div>Add transaction</div>
        </div>
      </button>
    </div>
  );
};

const PerformerInfo = ({ icon, title, value, isPositive }) => {
  const textColor = isPositive ? "text-green-500" : "text-red-600";
  const iconFill = isPositive ? "fill-green-500" : "fill-red-600";

  return (
    <div className="flex gap-1 ">
      <img
        loading="lazy"
        src={icon}
        alt={`${title} icon`}
        className="shrink-0 my-auto w-6 aspect-square"
      />
      <div className="flex flex-col justify-center">
        <div className="text-xs italic font-light text-neutral-200">
          {title}
        </div>
        <div className={`flex gap-1 mt-1 text-base ${textColor}`}>
          <img
            loading="lazy"
            src={isPositive ? "https://cdn.builder.io/api/v1/image/assets/TEMP/4ff52d9c58844eabea3b394bd2530c18de82a4e26e4e770ef33cfeea83dc2cde?apiKey=d1ee9f6275604677bd2583ecebeab853&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/ecdba6cf84fa6084a345af34e86889bc5a9ab0612648506d2a6ae3a1910e5dcd?apiKey=d1ee9f6275604677bd2583ecebeab853&"}
            alt={`${isPositive ? "Up" : "Down"} arrow icon`}
            className={`shrink-0 my-auto w-3 aspect-square ${iconFill}`}
          />
          <div>{value}</div>
        </div>
      </div>
    </div>
  );
};

const AllocationItem = ({ color, name, percentage }) => {
  return (
    <div className="flex gap-1.5 items-start whitespace-nowrap">
      <img
        loading="lazy"
        src={`{{ext_${color === "teal" ? 12 : 13}}}`}
        alt={`${color} line`}
        className={`shrink-0 w-px border border-${color}-400 border-solid aspect-[0.03] stroke-[1px] stroke-${color}-400`}
      />
      <div className="flex gap-1 mt-3.5">
        <div
          className={`shrink-0 my-auto w-2 h-2 bg-${color}-400 rounded-full`}
        />
        <div className="flex gap-1">
          <div className="text-sm leading-5 text-white">{name}</div>
          <div className="text-xs leading-5 text-neutral-400">
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

function MyComponent() {
  const allocationData = [
    { color: "teal", name: "Tether", percentage: 35.02 },
    { color: "purple", name: "Sushi Swap", percentage: 20 },
    { color: "amber", name: "Bitcoin", percentage: 45.02 },
  ];

  return (
    <div className="flex flex-col bg-black">
      <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col px-5">
          <h1 className="text-3xl text-white">Portfolio</h1>
          <div className="mt-1 text-xs italic font-light text-neutral-400">
            Updated on 23 may 2023
          </div>
        </div>
        <nav className="flex gap-5 my-auto max-md:flex-wrap">
          <div className="flex gap-3 py-1 pr-5 pl-1 bg-neutral-900 rounded-[34px]">
            <div className="flex justify-center items-center p-2.5 rounded-3xl bg-neutral-800 h-[42px] w-[42px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/25ecfdc450aa53d6dbbb3a95b6418c93bd6bfdc2947dbc3c4cd5625bbb82638e?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                alt="Search icon"
                className="aspect-square w-[22px]"
              />
            </div>
            <div className="my-auto text-xs italic font-light text-neutral-400">
              Search your coins...
            </div>
          </div>
          <div className="flex gap-2.5">
            <button className="flex justify-center items-center p-3.5 bg-neutral-900 h-[50px] rounded-[34px] w-[50px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5f8ba4ba67f000aba48daa4b2811de8a5a76d41d93613231aaade81c4e0116c?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                alt="Notification icon"
                className="aspect-[0.95] w-[22px]"
              />
            </button>
            <div className="flex gap-3 text-base text-white whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/96d2e49a56797875fc89f8ff2b3a76edbf64ec06181d7e0697023874fb7e1644?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                alt="User avatar"
                className="shrink-0 rounded-full aspect-square w-[50px]"
              />
              <div className="flex gap-2 px-5 my-auto">
                <div>Alexim</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf992a8132e1c71e75f0fb97800bf0b07c045ee3c1ed2daaea7197abc01977c9?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                  alt="Dropdown arrow"
                  className="shrink-0 my-auto w-3.5 aspect-square"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section className="flex gap-5 justify-between mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <BalanceInfo />
        <TransactionButtons />
      </section>
      <section className="flex gap-5 justify-between self-start px-5 mt-8 max-md:flex-wrap">
        <div className="flex flex-col">
          <div className="text-xs italic font-light text-neutral-200">
            All time profit
          </div>
          <div className="flex gap-1 mt-1 text-base text-green-500">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ff52d9c58844eabea3b394bd2530c18de82a4e26e4e770ef33cfeea83dc2cde?apiKey=d1ee9f6275604677bd2583ecebeab853&"
              alt="Up arrow icon"
              className="shrink-0 my-auto w-3 aspect-square fill-green-500"
            />
            <div>2.52% (+$324.82)</div>
          </div>
        </div>
        <PerformerInfo
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/dadaa039424647e1a1f38b2446de9afd1e2339d0cfc4a529df5528d22e583f75?apiKey=d1ee9f6275604677bd2583ecebeab853&"
          title="Best performer"
          value="10.52% (+$627.82)"
          isPositive
        />
        <PerformerInfo
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b770f300d77756556a35a7fa35964facf56efacb164ad78696843536cca54375?apiKey=d1ee9f6275604677bd2583ecebeab853&"
          title="Worst performer"
          value="1.23% (-$87.32)"
          isPositive={false}
        />
      </section>
      <nav className="flex gap-2 self-start px-5 mt-8 text-sm leading-5 text-center whitespace-nowrap text-neutral-200">
        <button className="justify-center px-4 py-2.5 rounded-3xl border border-solid border-neutral-200">
          Chart
        </button>
        <button className="justify-center px-4 py-2.5 font-medium text-black bg-white rounded-3xl">
          Allocation
        </button>
        <button className="justify-center px-4 py-2.5 rounded-3xl border border-solid border-neutral-200">
          Statistics
        </button>
      </nav>
      <section className="flex gap-5 justify-between px-5 mt-8 w-full text-center max-md:flex-wrap max-md:max-w-full">
        {allocationData.map((item) => (
          <AllocationItem key={item.name} {...item} />
        ))}
      </section>
    </div>
  );
}

export default MyComponent;