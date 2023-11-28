import { useState } from 'react'
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppWrapper>
  );
}

export default App;