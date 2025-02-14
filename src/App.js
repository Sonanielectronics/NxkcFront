import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import Contact from "./components/ContactUsPage";
import Privacy from "./components/Privacy"
import Terms from "./components/Terms"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Graph from "./components/Graph"

const App = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem("Token") !== null);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={ isLogin ? <Home /> : <SignIn setIsLogin={setIsLogin}/> } />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PrivacyPolicy" element={<Privacy />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/TermsAndCondition" element={<Terms />} />
        <Route path="/GraphBatches" element={<Graph />} />
      </Routes>
    </Router>
  );
};

export default App;
