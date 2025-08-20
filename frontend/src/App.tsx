import React from 'react';
import styled from 'styled-components';
import Button from './components/atoms/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const App: React.FC = () => {
  const handleClick = () => {
    alert('¡Botón clicado! LuxSense está vivo... o al menos lo intenta.');
  };

  return (
    <Container>
      <Button label="Probar LuxSense" onClick={handleClick} />
    </Container>
  );
};

export default App;