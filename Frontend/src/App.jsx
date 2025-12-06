import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
// import Footer from './pages/Footer';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import "./App.css"
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:id' element={<ProjectView />} />
      </Routes>
      {/* <Footer /> */}
      <Footer/>
      <ToastContainer position="top-center"
        autoClose={5000}
        transition={Bounce}
      />
    </Router>
    </ThemeProvider>
  )
}

export default App
