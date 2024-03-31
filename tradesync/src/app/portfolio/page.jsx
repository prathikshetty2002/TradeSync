'use client'
import React, { useState, useEffect } from "react";
import { getFirestore, doc,  setDoc,getDoc , deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Portfolio = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0); // State for total invested
  const db = getFirestore();
  const auth = getAuth();

  // Calculate CAGR (Compound Annual Growth Rate)
  const calculateCAGR = () => {
    const beginningValue = 100; // Initial investment value
    const endingValue = user.balance; // Current portfolio balance
    const years = 1; // Number of years, assumed to be 1 year for simplicity
    return (((endingValue / beginningValue) ** (1 / years)) - 1) * 100;
  };

  // Calculate Annualized Volatility (Placeholder value)
  const calculateVolatility = () => {
    return 15; // Placeholder value
  };

  // Calculate Sharpe Ratio (Placeholder value)
  const calculateSharpeRatio = () => {
    const riskFreeRate = 2; // Placeholder risk-free rate
    const volatility = calculateVolatility(); // Placeholder volatility
    return ((calculateCAGR() - riskFreeRate) / volatility).toFixed(2);
  };

  // Calculate Sortino Ratio (Placeholder value)
  const calculateSortinoRatio = () => {
    const riskFreeRate = 2; // Placeholder risk-free rate
    const downsideVolatility = 10; // Placeholder downside volatility
    return ((calculateCAGR() - riskFreeRate) / downsideVolatility).toFixed(2);
  };

  // Calculate Max Drawdown (Placeholder value)
  const calculateMaxDrawdown = () => {
    return 5; // Placeholder value
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              setUser(userDocSnap.data());
              calculateTotalInvested(userDocSnap.data().stocks); // Calculate total invested
            }
          } else {
            setUser(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [db, auth]);


  const sellShare = async (ticker) => {
    try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        
        // Retrieve the current user document
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            // Retrieve the price of the sold share
            const soldSharePrice = userData.stocks[ticker].price;
            
            // Delete the sold share from the stocks object
            delete userData.stocks[ticker];
            
            // Calculate the new balance
            const newBalance = userData.balance + soldSharePrice;
            
            // Update the user document with the new balance and without the sold share
            await setDoc(userDocRef, { ...userData, balance: newBalance });


            window.location.reload();
        } else {
            console.error("User document does not exist");
        }
    } catch (error) {
        console.error("Error selling share:", error);
        // Handle error
    }
};


  // Function to calculate total invested based on user's stock data
  const calculateTotalInvested = (stocks) => {
    let total = 0;
    Object.values(stocks).forEach((stock) => {
      total += stock.price * stock.quantity;
    });
    setTotalInvested(total);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        <div className="stock-cards flex">
  {Object.keys(user.stocks).map((ticker) => (
    <div key={ticker} className="items-start flex self-start px-14 pt-8 pb-4 mt-1.5 rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
      <h3 className="mr-10">Company:</h3>
      <div className="justify-center items-start px-12 py-8 my-auto rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
        {ticker}
      </div>
      <div className="justify-center md:ml-20 px-10 py-9 rounded-xl border border-green-500 border-solid shadow-2xl backdrop-blur-[25px] max-md:px-5">
        Quantity:
      </div>
      <div className="justify-center items-start self-start px-11 py-7 rounded-xl shadow-[46px_46px_40px_rgba(0,0,0,0.25)] max-md:px-5">
        {user.stocks[ticker].quantity}
      </div>
      <button onClick={() => sellShare(ticker)}>Sell Now</button>
    </div>
  ))}
</div>

        </div>
      
        <div className="flex gap-5 mt-20 w-full max-w-[1227px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="grow items-start px-6 pt-6 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            CAGR : {calculateCAGR()}%
          </div>
          <div className="grow items-start px-8 pt-7 pb-10 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            Annualized volatility : {calculateVolatility()}%
          </div>
        </div>
        <div className="flex gap-5 mt-5 w-full max-w-[1227px] max-md:flex-wrap max-md:max-w-full">
          <div className="grow justify-center items-start px-6 py-8 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            Sharpe Ratio : {calculateSharpeRatio()}
          </div>
          <div className="grow items-start px-8 pt-7 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            Sortino Ratio : {calculateSortinoRatio()}{" "}
          </div>
        </div>
        <div className="justify-center items-start px-12 py-9 mt-12 max-w-full rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-[575px] max-md:px-5 max-md:mt-10">
          Max Drawdown : {calculateMaxDrawdown()}%
        </div>
      </div>
      <div className="flex relative flex-col items-center px-14 mt-12 mb-1.5 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 w-full max-w-[1216px] max-md:flex-wrap max-md:max-w-full">
          <div className="grow items-start px-6 pt-6 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            Current Balance:  {user.balance}
          </div>
          <div className="grow items-start px-8 pt-7 pb-11 rounded-xl border border-solid shadow-2xl backdrop-blur-[25px] border-red-600 border-opacity-70 w-fit max-md:px-5 max-md:max-w-full">
            Total Invested:  {totalInvested.toFixed(2)}
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
};

export default Portfolio;
