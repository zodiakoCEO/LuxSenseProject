import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Image from '../atoms/Image';

const ContactContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding-left: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    margin-top: 1rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24rem;
`;

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mensaje enviado (placeholder): ${formData.name}, ${formData.email}, ${formData.subject}, ${formData.message}`);
    // Placeholder; podrías integrar con backend o Alert
  };

  return (
    <ContactContainer>
      <LeftSection>
        <Title>Contáctanos</Title>
        <Text>
          ¿Tienes preguntas o necesitas más información? Estamos aquí para ayudarte. Envíanos un mensaje y nuestro equipo te responderá lo antes posible. <br /><br />
          LuxSense: Tecnología para un futuro sostenible.
        </Text>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nombre"
            id="name"
            name="name" // Añadido para vincular con handleChange
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Correo"
            id="email"
            name="email" // Añadido para vincular con handleChange
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Asunto"
            id="subject"
            name="subject" // Añadido para vincular con handleChange
            value={formData.subject}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Mensaje"
            id="message"
            name="message" // Añadido para vincular con handleChange
            value={formData.message}
            onChange={handleChange}
          />
          <Button label="Enviar" type="submit" variant="success" size="large" />
        </FormContainer>
      </LeftSection>
      <RightSection>
        <Text><strong>Información de contacto:</strong></Text>
        <Text>Email: info@luxsense.com</Text>
        <Text>Teléfono: +1-234-567-890</Text>
        <Text>Dirección: 123 Calle Tech, Ciudad Futura</Text>
        <Image
          src="/assets/IMG/contact-image.jpg"
          alt="Oficina de LuxSense"
          width="200px"
        />
      </RightSection>
    </ContactContainer>
  );
};

export default ContactSection;