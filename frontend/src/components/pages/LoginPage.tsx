import React from 'react';
import styled from 'styled-components';
import LogoSection from '../organism/LogoSection';
import LoginSection from '../organism/LoginSection';

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  flex: 1;
`;

const RightSide = styled.div`
  flex: 1;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <LeftSide><LogoSection /></LeftSide>
      <RightSide><LoginSection /></RightSide>
    </LoginPageContainer>
  );
};

export default LoginPage;