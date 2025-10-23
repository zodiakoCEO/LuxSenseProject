import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        {/*Aqui van el resto de las rutas */}
      </Routes>
    </Router>
  )
} 

export default App 