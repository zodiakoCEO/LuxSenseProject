import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Dashboard" element={<DashboardPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Register" element= {<RegisterPage/>}/>
        {/*Aqui van el resto de las rutas */}
      </Routes>
    </Router>
  )
} 

export default App 