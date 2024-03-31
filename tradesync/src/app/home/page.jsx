'use client'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Charti from '../components/chart'
import { Line } from 'react-chartjs-2';
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

  ]);
  const [searchTermsta, setSearchTermsta] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [datafromspan, setDatafromspan] = useState([]);
  const [toDate, setToDate] = useState("");
  const [timespan, setTimespan] = useState("day");
  const [stockNews, setStockNews] = useState([]);
  const [companyData, setCompanyData] = useState([]);
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
        // await fetchStockNews(searchTerm);
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




  const fetchStockNews = async (companyCode) => {
    try {
      const response = await axios.get(`http://localhost:5000/stock-news/${companyCode}`);
      setStockNews(response.data.results); 
      console.log(response.data.results);// Set the fetched stock news data in state
    } catch (error) {
      console.error("Error fetching stock news:", error);
    }
  };


  const fetchStockData = async (companyCode) => {
    try {
      const response = await axios.get(`http://localhost:5000/stock-ticker/${companyCode}`);
      setCompanyData(response.data.results); 
      console.log(response.data.results);// Set the fetched stock news data in state
    } catch (error) {
      console.error("Error fetching stock news:", error);
    }
  };

  const handleFetchStockAggregates = () => {
    // Call the fetchStockAggregates function with the input values
    fetchStockAggregates(searchTermsta, 1, timespan, fromDate, toDate);
  };
  const fetchStockAggregates = async (stocksTicker, multiplier, timespan, from_date, to_date) => {
    try {
      const response = await axios.get(`http://localhost:5000/stock-aggregates/${stocksTicker}/${multiplier}/${timespan}/${from_date}/${to_date}`);
      console.log(response.data.results); 
      setDatafromspan(response.data.results);
      // Log the fetched data
      // Handle the fetched data as needed
    } catch (error) {
      console.error("Error fetching stock aggregates:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${searchTerm}/range/1/day/2023-01-09/2023-01-09?apiKey=mXcIOX3GWVhUb59c8d7Rg_RpqEGmbIQP`
      );
      const newStockData = { ...stockData };
      setSearchTermsta(searchTerm);
      await fetchStockNews(searchTerm);
      await fetchStockData(searchTerm);
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
    <div className="">
      <div className="flex justify-center aligns-item md:mb-20 md:mt-20">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter company code..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className= "">
      <div className="flex align-items justify-center  md:mr-20 ">
        {Object.keys(stockData).map((ticker) => (
          <div key={ticker} className="stock-card">
            <canvas ref={(ref) => chartRefs.current[ticker] = ref} width="400" height="400"></canvas>
            <div className="">
              <h2 className="flex align-items justify-center">{stocks.find((stock) => stock.ticker === ticker)?.name || ""} Stock Data</h2>
              <p className="flex align-items justify-center">Open: {stockData[ticker].results[0].o}</p>
              <p className="flex align-items justify-center">Close: {stockData[ticker].results[0].c}</p>
              <p className="flex align-items justify-center" >High: {stockData[ticker].results[0].h}</p>
              <p className="flex align-items justify-center">Low: {stockData[ticker].results[0].l}</p>
          <p className="flex align-items justify-center">quantity :   <input
               className=" "
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                max="100"
              /></p> 
              <button

                className={`buy-button sm:ml-60 md:mb-20 flex align-items md:ml-52 md:mt-4 justify-center border px-3 bg-black text-white rounded-sm ${loading ? 'loading' : ''}`}
                onClick={() => handleBuy(ticker)}
                disabled={loading} // Disable the button when loading
              >
                {loading ? "Buying..." : "Buy"}
              </button>
            </div>
           
          </div>
        ))}
          
      </div>
     

<div className="flex justify-center align-items md:my-10">
      <div className="flex flex-col md:mx-5">
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:mx-5">
        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:mx-5">
        <label htmlFor="timespan">Time Span:</label>
        <select
          id="timespan"
          value={timespan}
          onChange={(e) => setTimespan(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="hour">Hour</option>
          <option value="minute">Minute</option>
          <option value="second">Second</option>
        </select>
      </div>
      <button className="border border-black p-2 rounded-lg" onClick={handleFetchStockAggregates}>Fetch Stock Aggregates</button>
    </div>
<div>
{/* <Charti /> */}
<Charti searchTermsta={searchTermsta} timespan={timespan} fromDate={fromDate} toDate={toDate} />



</div>




{companyData && (
  <div className="company-info md:mx-20 mx-10 md:my-20 rounded-lg shadow-lg bg-white p-6">
    <h2 className="text-xl font-bold mb-4">Company Information</h2>
    {/* You can include the company logo here if needed */}
    {/* <img src={companyData.branding.logo_url} className="mb-4" alt="Company Logo" /> */}
    <p className="text-lg"><span className="font-semibold">Name:</span> {companyData.name}</p>
    <p className="text-lg"><span className="font-semibold">Description:</span> {companyData.description}</p>
    <p className="text-lg"><span className="font-semibold">Market Cap:</span> {companyData.market_cap}</p>
    <p className="text-lg"><span className="font-semibold">Homepage:</span> <a href={companyData.homepage_url} className="text-blue-500 hover:underline">{companyData.homepage_url}</a></p>
    <p className="text-lg"><span className="font-semibold">Phone Number:</span> {companyData.phone_number}</p>
    {/* Uncomment the following lines if you want to include the company address */}
    {/* <p className="text-lg"><span className="font-semibold">Address:</span> {companyData.address.city}, {companyData.address.state}, {companyData.address.postal_code}</p> */}
  </div>
)}





      <h2 className="flex justify-center items-center mt-10">Stock News</h2> 
      <div className="flex justify-center items-center">

  <div className="flex-container ">
    {Array.isArray(stockNews) && stockNews.map((newsItem, index) => (
      <div key={index} className="card">
        <img src={newsItem.image_url} alt="News" />
        <div className="card-body">
          <h3>{newsItem.title}</h3>
          <p>{newsItem.author}</p>
          <p>{newsItem.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
     
      <Newsletter />
    </div>
  );
}
