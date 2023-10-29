import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-image: linear-gradient(120deg, #ADC5DB, rgb(195 217 240) 90%);
  display: flex;
  justify-content: space-between;

  .logo-eslogan {
    display: flex;
  }

  .logo-eslogan img {
    width: 6rem;
    height: 6rem;
    padding: 0.5rem 1rem;
  }

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }

  span {
    padding-top: 3rem;
  }

  .profile-icon:hover .menu {
    display: block;
  }

  .menu {
    display: none;
    position: absolute;
    top: 75%;
    right: 50%;
    width: 9rem;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1;
    border-radius: 20px;
  }

  .menu button {
    display: block;
    margin: 5px 0;
    background-color: white;
    border-style: none;
  }

  .menu button a{
    color: #24306E;
    font-size: 1.2rem;
  }

  .profile-icon {
    width: 4rem;
    padding: 1rem 3rem 1rem 0rem ;
    position: relative;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link className="logo-eslogan" to="/inicio">
        <img className="logo" src="./src/components/img/image.png" alt="Logo SectArg tour" />{' '}
        <span>Más que un tour</span>
      </Link>

      <div className="profile-icon">
        <img className="profile-icon" src="./src/components/img/profile-logo.svg" alt="" />
        <div className="menu">
          <button>
            <Link to="/">Iniciar sesión</Link>
          </button>
          <button>
            <Link to="/">Crear cuenta</Link>
          </button>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;
