import React from 'react';
import styled from 'styled-components';
import Navbar from './components/organism/Navbar';
import Footer from './components/organism/Footer';
import MainSection from './components/organism/MainSection';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  `;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Navbar/>
      <MainSection/>
      {/*Aqui va el resto de organismos que se iran creando para la pagina */}
      <Footer/>
    </AppContainer>
  );
};

export default App;