'use client'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Newsletter from '../components/newsletter'
import Chart from "chart.js/auto";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const auth = getAuth(app);

export default function MyComponent() {
  const [user, setUser] = useState(null);
  const [stockData, setStockData] = useState({});
  const [stocks, setStocks] = useState([
    { ticker: "AAPL", name: "Apple" },
    { ticker: "MSFT", name: "Microsoft" },
    { ticker: "GOOG", name: "Google" },
    { ticker: "AMZN", name: "Amazon" },
    { ticker: "NVDA", name: "Nvidia" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for buy button
  const [quantity, setQuantity] = useState(1); // State to track the quantity to buy
  const chartRefs = useRef({});
  const chartInstances = useRef({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const saveUserDataToFirestore = async (user) => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
              await setDoc(docRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                // You can add more user data as needed
              });
              console.log("User data successfully stored in Firestore!");
            } else {
              console.log("User already exists in Firestore!");
            }
          } catch (error) {
            console.error("Error storing user data: ", error);
          }
        };
        saveUserDataToFirestore(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch stock data on component mount or when stocks change
    const fetchData = async () => {
      try {
        const stockPromises = stocks.map(async (stock) => {
          const response = await axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${stock.ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=mXcIOX3GWVhUb59c8d7Rg_RpqEGmbIQP`
          );
          return { ticker: stock.ticker, data: response.data };
        });
        const stockResults = await Promise.all(stockPromises);
        const stockDataObj = {};
        stockResults.forEach((stockResult) => {
          stockDataObj[stockResult.ticker] = stockResult.data;
        });
        setStockData(stockDataObj);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [stocks]);

  useEffect(() => {
    // Update charts when stock data changes
    if (Object.keys(stockData).length > 0) {
      Object.keys(stockData).forEach((ticker) => {
        const ctx = chartRefs.current[ticker].getContext("2d");
        if (!chartInstances.current[ticker]) {
          chartInstances.current[ticker] = new Chart(ctx, {
            type: "line",
            data: {
              labels: ["Open", "Close", "High", "Low"],
              datasets: [{
                label: ticker,
                data: [
                  stockData[ticker].results[0].o,
                  stockData[ticker].results[0].c,
                  stockData[ticker].results[0].h,
                  stockData[ticker].results[0].l,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                fill: false,
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          chartInstances.current[ticker].data.datasets[0].data = [
            stockData[ticker].results[0].o,
            stockData[ticker].results[0].c,
            stockData[ticker].results[0].h,
            stockData[ticker].results[0].l,
          ];
          chartInstances.current[ticker].update();
        }
      });
    }
  }, [stockData]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${searchTerm}/range/1/day/2023-01-09/2023-01-09?apiKey=mXcIOX3GWVhUb59c8d7Rg_RpqEGmbIQP`
      );
      const newStockData = { ...stockData };
      newStockData[searchTerm] = response.data;
      setStockData(newStockData);
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  const handleBuy = async (ticker) => {
    setLoading(true); // Set loading state to true when buying stocks
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const closingPrice = stockData[ticker].results[0].c; // Get the closing price of the stock
        const availableBalance = userData.balance; // Get user's available balance
  
        // Calculate total cost of the stocks based on the selected quantity
        const totalCost = closingPrice * quantity;
  
        if (totalCost <= availableBalance) {
          const stockOwned = userData.stocks && userData.stocks[ticker];
  
          // If user already owns the stock, update the quantity, balance, and price
          if (stockOwned) {
            const newQuantity = stockOwned.quantity + quantity;
            const newBalance = availableBalance - totalCost;
            await updateDoc(userDocRef, {
              balance: newBalance,
              [`stocks.${ticker}.quantity`]: newQuantity,
              [`stocks.${ticker}.price`]: closingPrice, // Add the price of the share
            });
          } else {
            // If user doesn't own the stock, add a new entry for the stock
            const newBalance = availableBalance - totalCost;
            await updateDoc(userDocRef, {
              balance: newBalance,
              [`stocks.${ticker}`]: {
                quantity: quantity,
                price: closingPrice, // Add the price of the share
              },
            });
          }
  
          console.log(`Successfully bought ${quantity} ${ticker} stock at $${closingPrice} per share.`);
          alert(`Successfully bought ${quantity} ${ticker} stock at $${closingPrice} per share.`);
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
  
  return (
    <div>
      <div className="flex justify-center aligns-item md:mb-20 md:mt-20">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter company code..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="flex ml-20 mr-20 ">
        {Object.keys(stockData).map((ticker) => (
          <div key={ticker} className="stock-card">
            <canvas ref={(ref) => chartRefs.current[ticker] = ref} width="400" height="400"></canvas>
            <div className="">
              <h2>{stocks.find((stock) => stock.ticker === ticker)?.name || "Unknown"} Stock Data</h2>
              <p>Open: {stockData[ticker].results[0].o}</p>
              <p>Close: {stockData[ticker].results[0].c}</p>
              <p>High: {stockData[ticker].results[0].h}</p>
              <p>Low: {stockData[ticker].results[0].l}</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                max="100"
              />
              <button
                className={`buy-button md:ml-40 md:mb-20 border px-3 bg-black text-white rounded-sm ${loading ? 'loading' : ''}`}
                onClick={() => handleBuy(ticker)}
                disabled={loading} // Disable the button when loading
              >
                {loading ? "Buying..." : "Buy"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Newsletter />
    </div>
  );
}
