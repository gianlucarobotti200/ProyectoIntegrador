import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';






const StyledHeader = styled.header`
    
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-image: linear-gradient(120deg, rgb(248 248 248), rgb(195 217 240) 60%);
        background-color: #8DB0CE;
    }

    .logo-lema {
        display: flex;
        align-items: center;    
        padding-left: 20px;
    }

    .lema{
        margin: 15px;
        font-size: 25px;
        color: #ffffff
    }

    .div-avatar{
        padding: 20px;
    }

    .logo {
        width: 75px;
    }

    button{
        padding: 0px;
        margin: 0px;
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
            width: 85px;

        }

        .logo-lema {
            order: 2;
            align-self: center;
            width: 80%;
            font-size: 0.8em;
        }

    }
`

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [initials, setInitials] = React.useState('');
    let decodedData = null
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [rol, setRol] = useState('');

    const decodeToken = (token) => {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Token inválido');
        }

        const payloadBase64 = tokenParts[1];
        const decodedPayload = atob(payloadBase64);

        const parsedPayload = JSON.parse(decodedPayload);
        setRol(parsedPayload.role)
        return parsedPayload;
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setInitials(<PersonIcon />);
        } else {
            try {
                decodedData = decodeToken(localStorage.getItem('token'));
                if (decodedData.nombre) {
                    const nombre = decodedData.nombre;
                    const apellido = decodedData.apellido;
                    const firstInitial = nombre ? nombre[0].charAt(0) : '';
                    const lastInitial = apellido ? apellido[0].charAt(0) : '';
                    const initials = `${firstInitial}${lastInitial}`.toUpperCase();
                    setInitials(initials);
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error.message);
            }
        }
    }, [history]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
    };


    return (
        <StyledHeader>
            <nav>
                <div className='logo-lema'>
                    <Link className='nav-a' to="/inicio">
                        <img className='logo' src="http://localhost:5173/src/components/img/logo-vector-blanco.png" alt='Logo SectArg tour' />
                    </Link>
                    <p className='lema'>Más que un tour</p>
                </div>
                <React.Fragment>
                    <div className='div-avatar'>

                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 40, height: 40, backgroundColor: '#ffffff', color: '#7DB5DC' }}>
                                        {initials}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {isLoggedIn ? (
                                [
                                    <MenuItem key="favorite" component={Link} to="/favoritos">
                                        <Favorite /> Mis favoritos
                                    </MenuItem>,
                                    <MenuItem key="reservas" component={Link} to="/reservas">
                                        <SupervisorAccountIcon /> Reservas
                                    </MenuItem>,
                                    rol == 1 && (
                                        <MenuItem key="admin" component={Link} to="/admintours">
                                            <SupervisorAccountIcon /> Administrador
                                        </MenuItem>
                                    ),
                                    <MenuItem key="logout" onClick={handleLogout}>
                                        <LogoutRoundedIcon /> Cerrar sesión
                                    </MenuItem>

                                ]
                            ) : (
                                [
                                    <MenuItem key="login" component={Link} to="/login">
                                        <LoginRoundedIcon /> Iniciar sesión
                                    </MenuItem>,
                                    <MenuItem key="registro" component={Link} to="/registro" >
                                        <AppRegistrationRoundedIcon /> Registrarse
                                    </MenuItem>]
                            )}


                        </Menu>
                    </div>
                </React.Fragment>

            </nav>
        </StyledHeader>
    );
}

export default Header;