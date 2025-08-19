import React from 'react';
import Text from '../Atoms/Text';
import Icon from '../Atoms/Icon';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1a2a44] text-white flex justify-between items-center p-4">
      <Text variant="h1" content="LuxSense" />
      <div className="flex space-x-6">
        <Text variant="p" content="Contacto" className="hover:text-gray-300 cursor-pointer" />
        <Text variant="p" content="Quienes somos" className="hover:text-gray-300 cursor-pointer" />
        <Text variant="p" content="¿Cómo funciona?" className="hover:text-gray-300 cursor-pointer" />
      </div>
      <div className="flex space-x-4">
        <Icon name="user" />
        <Icon name="moon" />
      </div>
    </nav>
  );
};

export default Navbar;