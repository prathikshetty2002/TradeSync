import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const { CanvasJSChart } = CanvasJSReact;

const StockChart = ({ searchTermsta, timespan, fromDate, toDate }) => {
    const [stockData, setStockData] = useState([]);

    const fetchStockAggregates = async (stocksTicker, multiplier, timespan, from_date, to_date) => {
        try {
            const response = await axios.get(`http://localhost:5000/stock-aggregates/${stocksTicker}/${multiplier}/${timespan}/${from_date}/${to_date}`);
            console.log(response.data.results);
            setStockData(response.data.results);
        } catch (error) {
            console.error("Error fetching stock aggregates:", error);
        }
    };

    const getDatesBetweenDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        while (currentDate <= endDateObj) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const datesInRange = getDatesBetweenDates(fromDate, toDate);

    useEffect(() => {
        // Fetch data initially or whenever props change
        fetchStockAggregates(searchTermsta, 1, timespan, fromDate, toDate);
    }, [searchTermsta, timespan, fromDate, toDate]);

    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            prefix: "$",
            title: "Price (in USD)"
        },
        data: [{
            type: "candlestick",
            showInLegend: true,
            name: "detailed",
            yValueFormatString: "$###0.00",
            xValueFormatString: "MMMM YY",
            dataPoints: stockData.map((item, index) => ({
                x: datesInRange[index], // Pair each data point with its corresponding date from datesInRange
                y: [item.o, item.h, item.l, item.c]
            }))
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default StockChart;
