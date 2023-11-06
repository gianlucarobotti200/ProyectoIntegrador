import React, { useState } from 'react';
import styled from 'styled-components';
import sha256 from 'crypto-js/sha256';

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #75AADB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  div {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
  });

  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación para Nombre y Apellido (solo letras)
    if (name === 'firstName' || name === 'lastName') {
      if (/^[a-zA-Z]+$/.test(value) || value === '') {
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: '' });
      } else {
        setError({ ...error, [name]: 'Ingresar solo letras' });
      }
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(value) || value === '') {
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: '' });
      } else {
        setError({ ...error, [name]: 'Formato de email incorrecto' });
      }
    }

    // Permitir que el usuario escriba la contraseña según las reglas
    if (name === 'password') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    const encryptedPassword = sha256(formData.password).toString();
    console.log('Contraseña encriptada:', encryptedPassword);
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validar el formulario antes de enviar
      if (error.firstName || error.lastName) {
        setFormError('Hay errores en el formulario. Por favor, corrígelos antes de enviar.');
        return;
      }
  
      const encryptedPassword = sha256(formData.password).toString();
      console.log('Contraseña encriptada:', encryptedPassword);
  
      // Simulación de envío al servidor (mostrar en consola en lugar de enviar a un servidor real)
      console.log('Datos del formulario:', formData);
  
      // Reiniciar el formulario después de enviar los datos
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
  
      // Limpiar los mensajes de error
      setFormError('');
      setError({
        firstName: '',
        lastName: '',
      });
    };
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {error.firstName && <p>{error.firstName}</p>}
        </label>
      </div>
      <div>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {error.lastName && <p>{error.lastName}</p>}
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Contraseña:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <button type="submit">Registrar</button>
    </StyledForm>
  );
};

export default RegistrationForm;