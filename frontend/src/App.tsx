import React from 'react';
import styled from 'styled-components';
import Navbar from './components/organism/Navbar';

const AppContainer = styled.div`
  min-height: 100vh;
  `;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Navbar/>
      {/*Aqui va el resto de organismos que se iran creando para la pagina */}
    </AppContainer>
  );
};

export default App;