import React from 'react';
import styled from 'styled-components';
import LogoSection from '../organism/LogoSection';
import SignupSection from '../organism/SignupSection';

const SignupPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSide = styled.div`
  flex: 1;
`;

const RightSide = styled.div`
  flex: 1;
`;

const SignupPage: React.FC = () => {
  return (
    <SignupPageContainer>
      <LeftSide><SignupSection /></LeftSide>
      <RightSide><LogoSection /></RightSide>
    </SignupPageContainer>
  );
};

export default SignupPage;