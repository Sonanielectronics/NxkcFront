import React, { useState, useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";

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

const Home = ({ UpdateDepositScreen , UpdateWithdrawDiv , Datachart , UpdateActiveChartButton , activeButtonChart , Batch }) => {
  
  const navigate = useNavigate();

  const [hoveredButton, setHoveredButton] = useState(null);

    const [fontSize, setFontSize] = useState(14);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  
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
      padding: "1rem 0",
    },
    chartContainer: {
      backgroundColor: "#2d3748",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      height: "100vh",
      padding:"1rem"
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

  const handleClick = (range) => {
    UpdateActiveChartButton(range);
  };

    // useEffect(() => {

  //   fetchData("1D");

  //   const handleResize = () => {
  //     const width = window.innerWidth;

  //     if (width > 1440) {
  //       setFontSize(48);
  //     } else if (width > 1024) {
  //       setFontSize(36);
  //     } else if (width > 768) {
  //       setFontSize(48);
  //     } else {
  //       setFontSize(14);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // }, [selectedRange]);

  const columns = [
    { label: "Name", field: "Name" },
    { label: "Current Price", field: "CurrentPrice" },
    { label: "Launch Price", field: "InitialPrice" },
    { label: "Highest Price", field: "HighestPrice" },
    { label: "Lowest Price", field: "LowestPrice" }
  ];

  const data = [
    { Name: "Love Bird", InitialPrice: "200", CurrentPrice: "220", Change: "+10.00", TimeFrame: "Last Hour" },
    { Name: "MSK", InitialPrice: "0.3", CurrentPrice: "0.25", Change: "-16.67", TimeFrame: "Last Month" },
    { Name: "Sunrisers Surat", InitialPrice: "0.01", CurrentPrice: "0.015", Change: "+50.00", TimeFrame: "Last Day" },
    { Name: "Rajasthani Kamariya", InitialPrice: "300", CurrentPrice: "280", Change: "-6.67", TimeFrame: "Last Year" },
    { Name: "Amritsari Gold", InitialPrice: "0.5", CurrentPrice: "0.55", Change: "+10.00", TimeFrame: "Last Day" },
    { Name: "Royal Challengers Ahmedabad", InitialPrice: "0.02", CurrentPrice: "0.018", Change: "-10.00", TimeFrame: "Last Week" }
  ];

  const Userdatacolumns = [
    { label: "Name", field: "Name" },
    { label: "Amount", field: "Amount" }
  ];

  const Userdata = [
    { Name: "Ghost", Amount: "100"},
    { Name: "Hetal", Amount: "400"},
    { Name: "Robber", Amount: "200"},
    { Name: "Sakshi", Amount: "300"},
    { Name: "Saurabh", Amount: "500"},
  ];

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin:"1rem"
  };

  const thTdStyle = {
    padding: "10px",
    textAlign: "left",
    textAlign:"center"
  };

  const headerStyle = {
    fontWeight: "bold",
  };

  const rowHoverStyle = {
    cursor: "pointer",
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
          displayColors: true,
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
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
            maxRotation: 90, // Force labels to rotate
            minRotation: 90, // Prevent labels from staying horizontal
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
          },
        },
      },
    };
  
    useEffect(() => {
      var data = [
        { time: "1/14/2025", value: 8004747, value2: 7500000 },
        { time: "1/15/2025", value: 8016198, value2: 7600000 },
        { time: "1/16/2025", value: 7736213, value2: 7700000 },
        { time: "1/17/2025", value: 7791826, value2: 7800000 }
      ];
  
      const labels = data.map((point) => point.time);
      const values1 = data.map((point) => point.value);
      const values2 = data.map((point) => point.value2);
  
      setChartData({
        labels,
        datasets: [
          {
            label: "Coin Value (Live)",
            data: values1,
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "New Line Data",
            data: values2,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      });
    }, []);

  return (

    <>

    <div style={styles.container}>
    <div style={styles.contentWrapper}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Vertically center align
          padding: "1rem",
          maxWidth: "100%",
          backgroundColor:"#2d3748",
          borderRadius:"12px"
        }}
      >
      
        <img
          src="assets/NX.png"
          alt="Example"
          style={{
            width: "5rem",
            height: "5rem"
          }}
        />

        { localStorage.getItem("Token") !== null ?(
  
          <div style={{ textAlign: 'center', borderRadius: '8px',width:"fit-content" }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold',color:"#f7fafc" }}>Balance</h2>
            <p style={{ fontSize: '24px', fontWeight: '600', margin: '8px 0',color:"#f7fafc" }}>{localStorage.getItem("Wallet")}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px',gap:"1rem" }}>
            <button style={{ backgroundColor: '#47c2be', color: '#1a202c', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }} onClick={() => UpdateDepositScreen(true)}>Deposit</button>
              <button style={{ backgroundColor: '#47c2be', color: '#1a202c', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }} onClick={() => UpdateWithdrawDiv(false)}>Withdraw</button>
            </div>
          </div>

          ) : (      

            <div style={{ textAlign: 'center', borderRadius: '8px',width:"fit-content" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button style={{ backgroundColor: 'transparent', color: '#47c2be', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Login</button>
                <button style={{ backgroundColor: '#47c2be', color: '#1a202c', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Register</button>
              </div>
            </div>

          )
        }

      </div>

    <main style={styles.main}>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          padding: "1rem 0",
        }}
      >
        {Batch}
      </h2>
      <div style={styles.chartContainer}>

        <div
          style={{
            height: "100%",
            backgroundColor: "#1a202c", // Box background color
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for box effect
            borderRadius: "10px", // Rounded corners
            padding: "20px", // Inner padding for content
            boxSizing: "border-box",
            id:"2"
          }}
        >
          <Line data={chartData} options={options} id="1"/>
        </div>
      </div>
    </main>

    <main style={styles.main}>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          padding: "1rem 0",
        }}
      >
        LIVE Updates
      </h2>
      <div style={{ backgroundColor: "#2d3748" , borderRadius: "12px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",height:"50vh",alignContent:"center",justifyItems:"center"}}>

      <div style={{ overflow: "auto",height:"calc(50vh - 2rem)",width:"calc(100% - 2rem)" }}>
      <table style={tableStyle}>
        <thead>
          <tr style={headerStyle}>
            {columns.map((col, index) => (
              <th key={index} style={thTdStyle}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} style={rowHoverStyle} onClick={() => navigate(`/GraphBatches?Name=${row.Name}`)} >
              <td style={thTdStyle}>{row.Name}</td>
              <td style={thTdStyle}>
                <div><strong>{row.CurrentPrice}</strong></div>
                <div style={{ color: row.Change > 0 ? "limegreen" : "red", fontWeight: "bold" }}>
                  {row.Change}
                </div>
                <div style={{ fontSize: "12px", color: "#a0aec0" }}>
                  {row.TimeFrame}
                </div>
              </td>
              <td style={thTdStyle}>{row.InitialPrice}</td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ ...thTdStyle, textAlign: "center" }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

      </div>
    </main>

    <main style={styles.main}>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          padding: "1rem 0",
        }}
      >
        Top Winners
      </h2>
      <div style={{ backgroundColor: "#2d3748" , borderRadius: "12px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",height:"50vh",alignContent:"center",justifyItems:"center"}}>
      <div style={{ overflow: "auto",height:"calc(50vh - 2rem)",width:"calc(100% - 2rem)" }}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead>
          <tr style={headerStyle}>
            {Userdatacolumns.map((col, index) => (
              <th key={index} style={thTdStyle}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Userdata.length > 0 ? (
            Userdata.map((row, rowIndex) => (
              <tr key={rowIndex} style={rowHoverStyle}>
              <td style={thTdStyle}>{row.Name}</td>
              <td style={thTdStyle}>{row.Amount}</td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Userdatacolumns.length} style={{ ...thTdStyle, textAlign: "center" }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

      </div>
    </main>

    <footer style={styles.footer}>
<nav style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginLeft:"4px", marginRight:"4px" }}>
<a href="/contactUs" style={{color:"#E0E0E0",textDecoration:"none"}}>
  Contact Us
</a>
<a href="/about-us" style={{color:"#E0E0E0",textDecoration:"none"}}>
  About Us
</a>
<a href="/TermsAndCondition" style={{color:"#E0E0E0",textDecoration:"none"}}>
  Terms and Conditions
</a>
<a href="/PrivacyPolicy" style={{color:"#E0E0E0",textDecoration:"none"}}>
  Privacy Policy
</a>
</nav>
</footer>

  </div>
</div>

    </>
  );
};

export default Home;