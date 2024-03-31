import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const StockComparisonChart = () => {
    // Data for XLY, XLK, and XLV
    const xlyData = [
        { timestamp: 1704085200000, value: 168.606 },
        { timestamp: 1696132800000, value: 157.66 },
        { timestamp: 1688184000000, value: 150.388 },
        { timestamp: 1680321600000, value: 145.688 },
        { timestamp: 1672549200000, value: 148.726 }
    ];
    
    const xlkData = [
        { timestamp: 1704085200000, value: 177.91 },
        { timestamp: 1696132800000, value: 161.144 },
        { timestamp: 1688184000000, value: 146.404 },
        { timestamp: 1680321600000, value: 139.042 },
        { timestamp: 1672549200000, value: 136.056 }
    ];
    
    const xlvData = [
        { timestamp: 1704085200000, value: 135.008 },
        { timestamp: 1696132800000, value: 132.632 },
        { timestamp: 1688184000000, value: 129.578 },
        { timestamp: 1680321600000, value: 129.478 },
        { timestamp: 1672549200000, value: 130.33 }
    ];

    // Function to format data for Candlestick Chart
    const formatData = (data) => {
        return data.map(item => ({
            x: new Date(item.timestamp),
            y: [item.value, item.value, item.value, item.value]
        }));
    };

    // Formatted data for each ticker
    const formattedXlyData = formatData(xlyData);
    const formattedXlkData = formatData(xlkData);
    const formattedXlvData = formatData(xlvData);

    // Chart options
// Chart options
const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
        text: "Stock Comparison"
    },
    axisX: {
        valueFormatString: "MMM DD",
        interval: 1 // Set the interval to 1 to display every data point
    },
    axisY: {
        title: "Price (in USD)"
    },
    toolTip: {
        shared: true
    },
    data: [
        {
            type: "candlestick",
            showInLegend: true,
            name: "XLY",
            dataPoints: formattedXlyData
        },
        {
            type: "candlestick",
            showInLegend: true,
            name: "XLK",
            dataPoints: formattedXlkData
        },
        {
            type: "candlestick",
            showInLegend: true,
            name: "XLV",
            dataPoints: formattedXlvData
        }
    ]
};


    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default StockComparisonChart;
