import { styled } from '@linaria/react';
import React from 'react';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';

interface UserProfileProps {
  name: string;
  avatarUrl: string;
  onClick?: () => void;
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`;

export const UserProfile: React.FC<UserProfileProps> = ({ name, avatarUrl, onClick }) => {
  return (
    <ProfileContainer onClick={onClick}>
      <Text size="0.95rem" weight="medium">{name}</Text>
      <Avatar src={avatarUrl} alt={name} />
    </ProfileContainer>
  );
};

export default UserProfile;