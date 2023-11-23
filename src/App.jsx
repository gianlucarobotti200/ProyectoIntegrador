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
          </Helmet>
    </>
  )
}

export default App
