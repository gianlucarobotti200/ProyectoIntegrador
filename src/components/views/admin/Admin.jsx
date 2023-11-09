import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';



const StyledAdministracion = styled.div`
    div.header-table{
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
    }
`

const Admin = () => {
    
    return (
        <Outlet/>
    );
};

export default Admin;
