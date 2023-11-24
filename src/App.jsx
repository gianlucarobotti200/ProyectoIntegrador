import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import { Helmet } from 'react-helmet'

function App() {

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
      <Helmet>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v18.0" nonce="jqYRnaav"></script>
                <script src="https://kit.fontawesome.com/4635025c29.js" crossorigin="anonymous"></script>
      </Helmet>
    </>
  )
}

export default App
