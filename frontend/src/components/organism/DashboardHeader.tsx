import { styled } from '@linaria/react';
import React from 'react';
import SearchInput from '../atoms/SearchInput';
import UserProfile from '../molecules/UserProfile';
import Text from '../atoms/Text';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
`;

export const DashboardHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <Text size="2rem" weight="bold">Dashboard</Text>
      </LeftSection>
      
      <CenterSection>
        <SearchInput placeholder="Buscar" />
      </CenterSection>
      
      <UserProfile 
        name="Joe Lopez" 
        avatarUrl="/assets/avatar.jpg" 
      />
    </HeaderContainer>
  );
};

export default DashboardHeader;
