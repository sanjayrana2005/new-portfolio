import { ThemeProvider } from './components/ui/theme-provider'
import { Children } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
            <Route  path='/' element={<Home/>} />
            <Route  path='/project/:id' element={<ProjectView/>} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  )
}

export default App
