import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import styled from 'styled-components';
import { Helmet } from 'react-helmet'

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
    
      <Helmet>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v18.0" nonce="jqYRnaav"></script>
                <script src="https://kit.fontawesome.com/4635025c29.js" crossorigin="anonymous"></script>
      </Helmet>
    </AppWrapper>
  )
}

export default App;