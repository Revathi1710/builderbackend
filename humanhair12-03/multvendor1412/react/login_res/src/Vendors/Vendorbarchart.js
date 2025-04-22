import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const  Vendorbarchart = ({ vendorId }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!vendorId) return;

        axios.post(`${process.env.REACT_APP_API_URL}/getVendorMonthlyProductStats`, { vendorId })
            .then(res => {
                if (res.data.status === "ok") {
                    const data = res.data.data;

                    // Define months
                    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    // Map values from API response
                    const totalProducts = labels.map((_, index) => data[index]?.total || 0);
                    const approvedProducts = labels.map((_, index) => data[index]?.approved || 0);
                    const rejectedProducts = labels.map((_, index) => data[index]?.rejected || 0);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: "Total Products",
                                data: totalProducts,
                                backgroundColor: "#3883d3",
                            },
                            {
                                label: "Approved Products",
                                data: approvedProducts,
                                backgroundColor: "green",
                            },
                            {
                                label: "Rejected Products",
                                data: rejectedProducts,
                                backgroundColor: "red",
                            }
                        ]
                    });
                }
            })
            .catch(err => console.error("Error fetching chart data:", err));
    }, [vendorId]);

    return (
        <div style={{ width: "80%", margin: "20px auto" }}>
            <h3>Product Statistics</h3>
            {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default Vendorbarchart;
