'use client'
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Portfolio = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Portfolio</h2>
      <div className="portfolio-section">
        <div className="balance">Current Balance: {user.balance}</div>
        <div className="portfolio-metrics">
          <h3>Portfolio Metrics</h3>
          <p>CAGR (Compound Annual Growth Rate): {calculateCAGR()}%</p>
          <p>Annualized Volatility: {calculateVolatility()}%</p>
          <p>Sharpe Ratio: {calculateSharpeRatio()}</p>
          <p>Sortino Ratio: {calculateSortinoRatio()}</p>
          <p>Max Drawdown: {calculateMaxDrawdown()}%</p>
          {/* Equity Curve visualization can be added here */}
        </div>
        <div className="stock-cards">
          {Object.keys(user.stocks).map((ticker) => (
            <div key={ticker} className="stock-card">
              <h3>{ticker}</h3>
              <p>Quantity: {user.stocks[ticker].quantity}</p>
              {/* Add more information here if needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
