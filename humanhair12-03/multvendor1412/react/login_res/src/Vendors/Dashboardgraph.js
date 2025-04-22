import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ProductChartVendor = ({ vendorId }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!vendorId) return;

        axios.post("http://localhost:5000/getVendorMonthlyProductStats", { vendorId })
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
                                borderColor: "blue",
                                backgroundColor: "rgba(0, 0, 255, 0.3)",
                                fill: true,
                                tension: 0.3
                            },
                            {
                                label: "Approved Products",
                                data: approvedProducts,
                                borderColor: "green",
                                backgroundColor: "rgba(0, 255, 0, 0.3)",
                                fill: true,
                                tension: 0.3
                            },
                            {
                                label: "Rejected Products",
                                data: rejectedProducts,
                                borderColor: "red",
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                                fill: true,
                                tension: 0.3
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
            {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default ProductChartVendor;
