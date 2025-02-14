import React, { useState, useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";

import { io } from "socket.io-client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ToggleSwitch = () => {
  
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const batchValue = queryParams.get("Name"); 

  const [fontSize, setFontSize] = useState(14);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [activeChartButton, setActiveChartButton] = useState("1D");

  const [hoveredButton, setHoveredButton] = useState(null);

  const styles = {
    container: {
      backgroundColor: "#1a202c",
      minHeight: "100vh",
      color: "#f7fafc",
      fontFamily: "'Poppins', sans-serif",
    },
    contentWrapper: {
      margin: "0 auto",
      padding: "1rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      height: "150px",
      objectFit: "contain",
    },
    nav: {
      display: "flex",
      justifyContent: "space-around",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      marginTop: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    navLink: {
      position: "relative",
      color: "#cbd5e0",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease",
    },
    navLinkHover: {
      color: "#ffffff",
      transform: "scale(1.1)",
    },
    main: {
    //   padding: "1rem 0",
    },
    chartContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      height: "100vh",
    },
    chartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 0",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1.5rem",
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      border: "none",
      backgroundColor: "transparent",
      color: "#ffffff",
    },
    buttonHover: {
      transform: "scale(1.05)",
    },
    graphArea: {
      backgroundColor: "#4a5568",
      height: "350px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    graphText: {
      color: "#e2e8f0",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    footer: {
      textAlign: "center",
      padding: "1rem 0",
      background: "#2d3748",
      borderRadius: "8px",
      marginTop: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: fontSize,
        },
        titleFont: {
          size: fontSize,
        },
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
        type: "category",
        labels: chartData.labels,
        ticks: {
          font: {
            size: fontSize,
          },
          color: "#E0E0E0",
          maxRotation: 90, // Rotate labels for better readability
          minRotation: 90,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#2d3748",
        },
        ticks: {
          font: {
            size: fontSize,
          },
          color: "#E0E0E0",
          align: "end",
          padding: 10,
        },
      },
    },
  };

  const handleClick = (range) => {
    setActiveChartButton(range);
  };

  useEffect(() => {
    
    const socket = io(`https://nxkc.onrender.com/${activeChartButton}`);
    
    socket.on("updateChartData", (data) => {

      const labels = data.map((point) => point.time);
      const values = data.map((point) => point.value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Coin Value (Live)",
            data: values,
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      });
      
    });

    return () => {
      socket.disconnect();
    };

  }, [activeChartButton]); 

  return (

    <>

<div style={styles.container}>
<div style={styles.contentWrapper}>
    
        <main style={styles.main}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold"
            }}
          >
            {batchValue}
          </h2>
          <div style={styles.chartContainer}>
            <div style={styles.chartHeader}>
              <div>
                {["1D", "5D", "1M", "1Y"].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleClick(label)}
                    onMouseEnter={() => setHoveredButton(label)}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "none",
                      backgroundColor: "transparent",
                      color:
                        activeChartButton === label
                          ? "#47c2be"
                          : hoveredButton === label
                          ? "#47c2be"
                          : "#f7fafc",
                      textDecoration:
                        activeChartButton === label
                          ? "underline"
                          : hoveredButton === label
                          ? "underline"
                          : "none",
                      textUnderlineOffset:
                        activeChartButton === label
                          ? "1px"
                          : hoveredButton === label
                          ? "1px"
                          : "0px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
    
            <div
              style={{
                height: "calc(100vh - 3rem - 31.33px)",
                width: "calc(100% - 2rem)",
                backgroundColor: "#1a202c", // Box background color
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for box effect
                borderRadius: "10px", // Rounded corners
                padding: "20px", // Inner padding for content
                boxSizing: "border-box",
                marginLeft: "1rem",
              }}
            >
              <Line data={chartData} options={options} />
            </div>
          </div>
        </main>

</div>
</div>
    </>

  );

};

export default ToggleSwitch;