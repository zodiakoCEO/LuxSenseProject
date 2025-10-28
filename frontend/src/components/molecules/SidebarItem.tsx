import { styled } from '@linaria/react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Text from '../atoms/Text';

interface SidebarItemProps {
  icon: string;
  label: string;
  path: string;
}

const ItemContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  background-color: ${props => props.isActive ? 'rgba(0, 229, 255, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.isActive ? '#00E5FF' : 'transparent'};
  
  &:hover {
    background-color: rgba(0, 229, 255, 0.08);
  }
`;

const IconWrapper = styled.span<{ isActive: boolean }>`
  font-size: 1.25rem;
  color: ${props => props.isActive ? '#00E5FF' : '#CCCCCC'};
`;

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;
  
  const handleClick = () => {
    navigate(path);
  };
  
  return (
    <ItemContainer isActive={isActive} onClick={handleClick}>
      <IconWrapper isActive={isActive}>{icon}</IconWrapper>
      <Text 
        size="0.95rem" 
        weight={isActive ? "semibold" : "regular"}
        color={isActive ? "#FFFFFF" : "#CCCCCC"}
      >
        {label}
      </Text>
    </ItemContainer>
  );
};

export default SidebarItem;
