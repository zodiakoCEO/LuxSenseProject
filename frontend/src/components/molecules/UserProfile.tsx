import React from 'react';
import { styled } from '@linaria/react';
import { Text } from '../atoms/Text';

interface UserProfileProps {
  name: string;
  avatarUrl?: string;
  onClick?: () => void;
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

export const UserProfile: React.FC<UserProfileProps> = ({ name, avatarUrl, onClick }) => {
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ProfileContainer onClick={onClick}>
      <Text size="0.95rem" weight="medium">{name}</Text>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: '2px solid #00e5ff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1e293b',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#94a3b8',
        fontFamily: 'Inter, sans-serif'
      }}>
        {avatarUrl
          ? <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : initials
        }
      </div>
    </ProfileContainer>
  );
};

export default UserProfile;