'use client'
import React, { useEffect, useState } from "react";
// import React, { useState, useEffect } from "react";
import { getFirestore, doc,  setDoc,getDoc , deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from "firebase/app";
// import {  onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYTO_r-5gbFgqDM7a5ykBtvgaMRa01ssU",
  authDomain: "tradesync-7507f.firebaseapp.com",
  projectId: "tradesync-7507f",
  storageBucket: "tradesync-7507f.appspot.com",
  messagingSenderId: "629393996092",
  appId: "1:629393996092:web:33b397a33ab549e0c98639",
  measurementId: "G-ER6THB3C4L"
};

const app = initializeApp(firebaseConfig);
import Charta from './charttemplate'
export default function MyComponent() {






    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);

    const auth = getAuth(app);
    
  // State to hold the ticker data
  const [tickerData, setTickerData] = useState([]);
const [start1 , setStart1] = useState("start1")









const handleBuy = async () => {
    setLoading(true); // Set loading state to true when buying stocks
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const closingPrice = 481.52; // Get the closing price of the stock
        const availableBalance = userData.balance; // Get user's available balance
  
        // Calculate total cost of the stocks based on the selected quantity
        const totalCost = closingPrice * quantity;
  
        if (totalCost <= availableBalance) {
          const start1Owned = userData.start1 || {}; // Use empty object as default
  
          // If user already owns the stock, update the quantity, balance, and price
          if (start1Owned.quantity) {
            const newQuantity = start1Owned.quantity + quantity;
            const newBalance = availableBalance - totalCost;
            await updateDoc(userDocRef, {
              balance: newBalance,
              "start1.quantity": newQuantity, // Corrected path syntax
              "start1.price": closingPrice, // Add the price of the share
            });
          } else {
            // If user doesn't own the stock, add a new entry for the stock
            const newBalance = availableBalance - totalCost;
            await updateDoc(userDocRef, {
              balance: newBalance,
              "start1.quantity": quantity, // Corrected path syntax
              "start1.price": closingPrice, // Add the price of the share
            });
          }
  
          console.log(`Successfully bought ${quantity} start1 stock at $${closingPrice} per share.`);
          alert(`Successfully bought ${quantity} start1 stock at $${closingPrice} per share.`);
        } else {
          console.log("Insufficient balance to buy the stock.");
          alert("Insufficient balance to buy the stock.");
        }
      }
    } catch (error) {
      console.error("Error buying stock:", error);
    } finally {
      setLoading(false); // Reset loading state after buying process completes
    }
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
             // Calculate total invested
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













  // Function to calculate average value for each ticker
  const calculateAverages = (data) => {
    const averages = {};

    data.forEach((entry) => {
      const ticker = entry.results.underlying.url.split("/")[6];
      const values = entry.results.values.map((value) => value.value);
      const average = values.reduce((acc, val) => acc + val, 0) / values.length;
      averages[ticker] = average;
    });

    // Sort tickers based on average values
    const sortedTickers = Object.keys(averages).sort(
      (a, b) => averages[b] - averages[a]
    );

    // Return sorted tickers with their average values
    return sortedTickers.map((ticker, index) => ({
      ticker,
      average: averages[ticker],
      rank: index + 1,
    }));
  };

  // Effect to fetch and calculate ticker data
  useEffect(() => {
    // Sample data (replace this with your actual data fetching logic)
    const data = [{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XHB/range/1/quarter/1063281600000/1711850457187?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 86.376
                },
                {
                    "timestamp": 1696132800000,
                    "value": 76.12200000000001
                },
                {
                    "timestamp": 1688184000000,
                    "value": 67.92800000000001
                },
                {
                    "timestamp": 1680321600000,
                    "value": 63.556000000000004
                },
                {
                    "timestamp": 1672549200000,
                    "value": 60.136
                }
            ]
        },
        "status": "OK",
        "request_id": "0ccb84c0582c5905a89cdd65c2b293ff"
    }
    ,
    {
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLB/range/1/quarter/1063281600000/1711850496299?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 84.10200000000002
                },
                {
                    "timestamp": 1696132800000,
                    "value": 81.06000000000003
                },
                {
                    "timestamp": 1688184000000,
                    "value": 77.55400000000002
                },
                {
                    "timestamp": 1680321600000,
                    "value": 76.56400000000001
                },
                {
                    "timestamp": 1672549200000,
                    "value": 77.62
                }
            ]
        },
        "status": "OK",
        "request_id": "9d3be9b4a51aa444487ce3c8108134cb"
    },
    {
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLE/range/1/quarter/1063281600000/1711850538189?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 86.52799999999998
                },
                {
                    "timestamp": 1696132800000,
                    "value": 85.13999999999999
                },
                {
                    "timestamp": 1688184000000,
                    "value": 82.77599999999998
                },
                {
                    "timestamp": 1680321600000,
                    "value": 78.99999999999999
                },
                {
                    "timestamp": 1672549200000,
                    "value": 78.05399999999999
                }
            ]
        },
        "status": "OK",
        "request_id": "868db0c72c2a1db656254900804d2c99"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLY/range/1/quarter/1063281600000/1711850560938?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 168.606
                },
                {
                    "timestamp": 1696132800000,
                    "value": 157.66
                },
                {
                    "timestamp": 1688184000000,
                    "value": 150.388
                },
                {
                    "timestamp": 1680321600000,
                    "value": 145.68800000000002
                },
                {
                    "timestamp": 1672549200000,
                    "value": 148.726
                }
            ]
        },
        "status": "OK",
        "request_id": "15f9e5eedc08b57136535516e2e466b4"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLK/range/1/quarter/1063281600000/1711850578859?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 177.91000000000003
                },
                {
                    "timestamp": 1696132800000,
                    "value": 161.14400000000003
                },
                {
                    "timestamp": 1688184000000,
                    "value": 146.40400000000002
                },
                {
                    "timestamp": 1680321600000,
                    "value": 139.042
                },
                {
                    "timestamp": 1672549200000,
                    "value": 136.05599999999998
                }
            ]
        },
        "status": "OK",
        "request_id": "7d5dfbf69523e7c92611c009aba7bb3c"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLV/range/1/quarter/1063281600000/1711850646817?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 135.008
                },
                {
                    "timestamp": 1696132800000,
                    "value": 132.632
                },
                {
                    "timestamp": 1688184000000,
                    "value": 129.57800000000003
                },
                {
                    "timestamp": 1680321600000,
                    "value": 129.478
                },
                {
                    "timestamp": 1672549200000,
                    "value": 130.33
                }
            ]
        },
        "status": "OK",
        "request_id": "357bee82813afafa40ba9345909fb8d6"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLI/range/1/quarter/1063281600000/1711850670616?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 109.96599999999997
                },
                {
                    "timestamp": 1696132800000,
                    "value": 104.41599999999997
                },
                {
                    "timestamp": 1688184000000,
                    "value": 98.18599999999996
                },
                {
                    "timestamp": 1680321600000,
                    "value": 95.37799999999997
                },
                {
                    "timestamp": 1672549200000,
                    "value": 94.50999999999999
                }
            ]
        },
        "status": "OK",
        "request_id": "e6f7ec4f7783fdc71db58a3595013c7d"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLU/range/1/quarter/1063281600000/1711850685821?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 64.208
                },
                {
                    "timestamp": 1696132800000,
                    "value": 65.178
                },
                {
                    "timestamp": 1688184000000,
                    "value": 65.614
                },
                {
                    "timestamp": 1680321600000,
                    "value": 67.854
                },
                {
                    "timestamp": 1672549200000,
                    "value": 69.65799999999999
                }
            ]
        },
        "status": "OK",
        "request_id": "f627ee7db21db12e45951bbf5c6972b1"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLP/range/1/quarter/1063281600000/1711850722458?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 73.216
                },
                {
                    "timestamp": 1696132800000,
                    "value": 72.854
                },
                {
                    "timestamp": 1688184000000,
                    "value": 71.79400000000001
                },
                {
                    "timestamp": 1680321600000,
                    "value": 72.468
                },
                {
                    "timestamp": 1672549200000,
                    "value": 72.812
                }
            ]
        },
        "status": "OK",
        "request_id": "16e185c7166eb7029cb3bfadf9cdd847"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLF/range/1/quarter/1063281600000/1711850741181?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 35.750000000000014
                },
                {
                    "timestamp": 1696132800000,
                    "value": 34.16600000000001
                },
                {
                    "timestamp": 1688184000000,
                    "value": 32.718
                },
                {
                    "timestamp": 1680321600000,
                    "value": 32.374
                },
                {
                    "timestamp": 1672549200000,
                    "value": 33.296
                }
            ]
        },
        "status": "OK",
        "request_id": "aa6ea57c90b92396509eebb1607a17a4"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLC/range/1/quarter/1063281600000/1711850762021?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 68.588
                },
                {
                    "timestamp": 1696132800000,
                    "value": 61.854
                },
                {
                    "timestamp": 1688184000000,
                    "value": 56.89999999999999
                },
                {
                    "timestamp": 1680321600000,
                    "value": 54.639999999999986
                },
                {
                    "timestamp": 1672549200000,
                    "value": 55.379999999999995
                }
            ]
        },
        "status": "OK",
        "request_id": "10043186b0b25e92c179589b4b712121"
    },{
        "results": {
            "underlying": {
                "url": "https://api.polygon.io/v2/aggs/ticker/XLE/range/1/quarter/1063281600000/1711850777657?limit=3185&sort=desc"
            },
            "values": [
                {
                    "timestamp": 1704085200000,
                    "value": 86.52799999999998
                },
                {
                    "timestamp": 1696132800000,
                    "value": 85.13999999999999
                },
                {
                    "timestamp": 1688184000000,
                    "value": 82.77599999999998
                },
                {
                    "timestamp": 1680321600000,
                    "value": 78.99999999999999
                },
                {
                    "timestamp": 1672549200000,
                    "value": 78.05399999999999
                }
            ]
        },
        "status": "OK",
        "request_id": "eeb0a3dc651892d4ec4eb8b0ade588dc"
    }];

    // Calculate averages and update state
    const calculatedData = calculateAverages(data);
    setTickerData(calculatedData);
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="flex flex-col mx-auto max-w-[686px]">
      <div className="text-2xl leading-10 font-bold text-black flex align-items justify-center text-stone-700">
        Strategy 1
        
      </div>
      <div className="w-full ml-20  max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col  max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-0.5 mt-16 w-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(119,237,145,0.78_16.875deg,rgba(119,237,145,0.78)_88.12500178813934deg,rgba(119,237,145,0.78)_151.875deg,rgba(119,237,180,0.78)_225deg,rgba(126,255,155,0.78)_288.7499928474426deg,rgba(44,149,67,0.78)_360deg),conic-gradient(from_180deg_at_50%_50%,#FFF_30.00000089406967deg,#000_95.625deg,#FFF_168.75deg,#000_228.75000715255737deg,#FFF_285.0000071525574deg,#000_360deg),radial-gradient(116.62%_141.42%_at_0%_0%,#000_7.61%,#A3A3A3_57.81%,#000_100%))] rounded-[34px] max-md:mt-10">
           
              <div className="flex overflow-hidden relative flex-col px-4 pt-4 pb-7 w-full aspect-[1.23]">
              
                
              </div>
            </div>
          </div>
        
      </div>
      <div className="=">
        {/* Render ranked list */}
        <Charta />
        <div className="mt-5 text-bold text-xl mx-auto text-pink-400">Price : 481.52$</div>
        </div>
        <div className="self-start mt-20 text-2xl leading-7 text-black">
              Stock weights
            </div>
            
        {tickerData.map((tickerEntry) => (
          <div
            key={tickerEntry.ticker}
            className="flex gap-5 justify-between px-3.5 py-4 mt-2 whitespace-nowrap bg-white rounded-[30px] max-md:flex-wrap max-md:max-w-full"
          >
            <div className="flex flex-col justify-center">
              <div className="flex gap-2.5">
                <div className="my-auto text-base text-center text-black">
                  {tickerEntry.rank}
                </div>
                <div className="flex gap-2.5">
                  {/* Add your ticker icon/image here */}
                  <div className="text-base leading-6 text-black">
                    {tickerEntry.ticker}
                  </div>
                  {/* You can include additional ticker information here */}
                </div>
              </div>
            </div>
            <div className="text-base leading-6 text-stone-900">
              ${tickerEntry.average.toFixed(5)}
            </div>
          </div>
        ))}

      </div>

      <div className="flex flex-col justify-center align-items md:ml-40 ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 text-base font-bold text-black max-md:mt-10">
              {/* <div className="text-2xl leading-10 text-stone-700">
                Strategy 1
              </div> */}
              <div className="justify-center items-center px-2.5 py-4 mt-24 bg-green-300 rounded-3xl max-md:px-5 max-md:mt-10">
              <button

className={`${loading ? 'loading' : ''}`}
onClick={() => handleBuy()}
disabled={loading} // Disable the button when loading
>
{loading ? "Buying..." : "Buy"}
</button>
              </div>
              <div className="justify-center items-center px-2.5 py-4 mt-7 bg-red-400 rounded-3xl max-md:px-5">
              <button onClick={() => sellShare(start1)}>Sell Now</button>
              </div>
            </div>
          </div>
    </div>
  );
}
