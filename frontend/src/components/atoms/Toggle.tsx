import React from 'react';
import { styled } from '@linaria/react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleTrack = styled.div<{ checked: boolean }>`
  width: 44px;
  height: 24px;
  background: ${(props) => (props.checked ? '#00ff09' : '#374151')};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
`;

const ToggleThumb = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.checked ? '22px' : '2px')};
  transition: left 0.2s ease;
`;

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <ToggleTrack checked={checked} onClick={() => onChange(!checked)}>
      <ToggleThumb checked={checked} />
    </ToggleTrack>
  );
};

export default Toggle;
