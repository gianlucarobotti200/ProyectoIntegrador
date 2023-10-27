import React from 'react'
import {Link} from "react-router-dom"; 
import styled from "styled-components"

const StyledHeader = styled.header`
    
    background-image: linear-gradient(120deg, rgb(248 248 248), rgb(195 217 240) 60%);

    nav {
        display: flex;
        width: 100%;
        height: 30%;
        z-index: 1;
        background-color: white;
        justify-content: space-around;
    }

    .lema {
        display: flex;
        font-size: 2em;
        align-items:center;
        justify-content:center;
        padding: 0px;
    
    }

    .logo {
        width: 40%;
        height: 100%;
        align-items: center;
        text-align: center;
        margin: 0px;
        padding: 0px 20px 0px 0px;
    }

    a.nav-a {
        color: black;
    }

    .nav-ul {
        display: flex;
        width: 40%;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;   
    }

    li {
        display:inline-flex;
        padding: 2rem;
        list-style: none;
        font-size: 25px;
        text-decoration: none;
    }

    button {
        font-size: 25px;
        border-radius: 5px;
        width: 180px;
        height: 45px;
        text-align: center;
        align-items: center;
        justify-content: center;
        color: yellow;
        transition: border-color 0.25s;
        margin: 5rem 20px 5rem 0px; 
        box-shadow: lightgreen 0px 0px 4px, hrey 0px 8px 31px;
        border: 1px solid transparent grey;
    }

    button:hover {
        border: 2px solid blue;  
    }

    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    .btn-cta {
        color: black;
    }

    .theme {
        width: 5%;
    }

    @media (max-width: 600px) {
        Header {
            height: 70px;
        }
        nav {
            
            flex-direction: column;
        }

        .logo {
            width: 50%;
            border-radius: 5px;
            align-self: center;
            text-align: center;
            justify-content: center;
            padding: 0px 10px 0px 0px;
            order: 1;
        
        }

        .lema {
            order: 2;
            align-self: center;
            width: 80%;
            font-size: 0.8em;
        }

    }
`

function Header() {

    return (
        <StyledHeader>
            <nav>
                <div className='lema'>
                    <Link className='nav-a' to="/inicio">
                        <img className='logo' src='./src/components/img/image.png' alt='Logo SectArg tour' />Más que un tour...
                    </Link>
                </div>
                <button className='btn-cta'>
                    <Link to="">Crear cuenta</Link>
                </button>
                <button>
                    <Link to="">Iniciar sesión</Link>
                </button>
            </nav>
        </StyledHeader>
    );
}

export default Header;