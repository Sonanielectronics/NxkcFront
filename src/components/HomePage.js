import React, { useState, useEffect } from "react";

import { io } from "socket.io-client";

import Pay from "./Pay";
import Verify from "./Verify";
import Withdraw from "./Withdraw";
import Sucess from "./Sucess";
import FrontPage from "./FrontPage";

const Home = () => {
  
  const [activeChartButton, setActiveChartButton] = useState("1D");

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  
  const [DepositScreen, SetDepositScreen] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState(1);

  const [AlertDiv, SetAlertDiv] = useState(false);
  const [WithdrawDiv, SetWithdrawDiv] = useState(true);
  const [ShowMessage, SetShowMessage] = useState(true);

  const [InitialBatch,SetInitialBatch] = useState("");

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
    
    <style>
      {`

        .custom-input::placeholder {
          color: #f7fafc; 
        }

        .custom-input:focus {
          outline: none; /* Border color on focus */
        }

      `}
    </style>
      
    {(DepositScreen && !AlertDiv) && (

      <Pay UpdateDepositScreen={SetDepositScreen} UpdateSelectedAmount={setSelectedAmount} Amountselected={selectedAmount} UpdateAlertDiv={SetAlertDiv} />

    )}

    {(DepositScreen && AlertDiv) && (

      <Verify Amountselected={selectedAmount} UpdateAlertDiv={SetAlertDiv} UpdateDepositScreen={SetDepositScreen}/>

    )} 

    {(!DepositScreen && !WithdrawDiv && ShowMessage) && (

      <Withdraw UpdateWithdrawDiv={SetWithdrawDiv} UpdateShowMessage={SetShowMessage}/>

    )}

    {(!DepositScreen && !WithdrawDiv && !ShowMessage) && (

      <Sucess UpdateShowMessage={SetShowMessage} UpdateWithdrawDiv={SetWithdrawDiv}/>

    )}

    {(!DepositScreen && WithdrawDiv) && (

      <FrontPage UpdateDepositScreen={SetDepositScreen} UpdateWithdrawDiv={SetWithdrawDiv} Datachart={chartData} UpdateActiveChartButton={setActiveChartButton} activeButtonChart={activeChartButton} Batch={InitialBatch}/>

    )}

    </>

  );

};

export default Home;