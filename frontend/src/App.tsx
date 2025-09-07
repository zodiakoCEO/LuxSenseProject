import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import WhoWeArePage from "./components/pages/WhoWeArePage";
import ContactPage from "./components/pages/ContactPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/WhoWeAre" element={<WhoWeArePage/>}/>
        <Route path="/Contact" element={<ContactPage/>}/>
        {/*Aqui van el resto de las rutas */}
      </Routes>
    </Router>
  )
} 

export default App